import { Response, Request } from "express";
import { UploadedFile } from "express-fileupload";

export default async function (req:Request,res:Response){
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar =  req.files.avatar as UploadedFile;
            let fileName = getFileName(req.body.name,avatar.name)
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + fileName);

            //send response
            res.send({
                fileName:fileName,
                message: 'File is uploaded'
                
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

function getFileName(username:string,fileName:string):string{
    let aux = fileName.split(".")
    aux[0]=username
    return aux.join(".") 
}