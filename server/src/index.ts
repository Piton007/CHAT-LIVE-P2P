import Socket from "socket.io"
import {createServer} from "http"
import App from "./app"



interface PartnerResponse {
    id:string,
    value:Partner
}

interface Partner {
    name: string
}

const users:Map<string,Partner> = new Map<string,Partner>()
function toJson(users: Map<string,Partner>){
    let json:PartnerResponse[] = []
    users.forEach((value,key)=>{
        json.push({id:key,value})
    })
    return json
}

const io = new Socket()
io.on("connection",socket => {
    socket.on("joined",partner=>{
        socket.emit("shaked",toJson(users))
        users.set(socket.id,partner)
        socket.broadcast.emit("joined",<PartnerResponse>{id:socket.id,value:partner})
    })
    socket.on("chat-message",message=>{
        socket.broadcast.emit("chat-message",message)
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
