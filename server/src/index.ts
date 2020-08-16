import Socket from "socket.io"
import {createServer} from "http"
import App from "./app"



interface Message {
    avatar:string,
    data:string,
    date:string
}

interface PartnerResponse {
    id:string,
    value:Partner
}

interface Partner {
    name: string,
    avatar:string
}


const users:Map<string,Partner> = new Map<string,Partner>()
function toJson(users: Map<string,Partner>){
    let json:PartnerResponse[] = []
    users.forEach((value,key)=>{
        json.push({id:key,value})
    })
    return json
}

let masterId = ""

const io = new Socket()
io.on("connection",socket => {

    socket.on("joined-in-class",(room)=>{
        socket.join(room)
        socket.emit("master-id",masterId)
    })

    socket.on("start-class",(id)=>{
        
        masterId = id

    })

    socket.on("joined",(partner:Partner)=>{
        socket.emit("shaked",toJson(users))
        users.set(socket.id,partner)
        socket.broadcast.emit("joined",<PartnerResponse>{id:socket.id,value:partner})
    })
    socket.on("notification",notification=>{
        socket.broadcast.emit("notification",notification)
    })
    socket.on("chat-message",message=>{

        const user = users.get(socket.id)
        socket.broadcast.emit("chat-message",<Message>{avatar:user?.avatar || "",...message})
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-disconnected", socket.id)
        users.delete(socket.id)
    })
})
const app = new App()
const server = createServer(app.getServer())
io.listen(server)
server.listen(3000)
