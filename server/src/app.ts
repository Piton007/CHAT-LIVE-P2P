import express, { static as expose } from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"
import fileMiddleware from "./fileUpload"
import path from "path"

export default class ExpressApp {
    private readonly frontEndPath:string
    private app = express()

    constructor(frontEndPath:string = ""){
        this.frontEndPath = frontEndPath
        this.setUpCors()
        this.setUpBodyParser()
        this.setUpUploadMiddleware()
        this.setUpStaticFiles()
        this.buildRoutes()
        
       
    }

    private setUpCors(){
        this.app.use(cors())
    }

    private setUpStaticFiles(){
        this.app.use(expose('uploads'))
        this.app.use(expose(this.frontEndPath))
    }

    private setUpUploadMiddleware(){
        this.app.use(fileUpload({
            createParentPath: true
        }));
    }

    private setUpBodyParser(){
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    public getServer(){
       return this.app 
    }



    private buildRoutes(){
        let self = this
        self.app.post('/upload-avatar', fileMiddleware);
        if (!!self.frontEndPath){
            self.app.get("*",function (req,res) {
                res.sendfile(path.join(self.frontEndPath,"index.html"))
            })
        }
           
    }
}