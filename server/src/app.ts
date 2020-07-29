import express, { static as expose } from "express"
import cors from "cors"
import fileUpload from "express-fileupload"
import bodyParser from "body-parser"
import fileMiddleware from "./fileUpload"

export default class ExpressApp {
    private app = express()

    constructor(){
        this.setUpCors()
        this.setUpBodyParser()
        this.setUpUploadMiddleware()
        this.buildRoutes()
        this.setUpStaticFiles()
    }

    private setUpCors(){
        this.app.use(cors())
    }

    private setUpStaticFiles(){
        this.app.use(expose('uploads'))
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
        this.app.post('/upload-avatar', fileMiddleware);
    }
}