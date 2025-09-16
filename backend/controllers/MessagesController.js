import Message from "../models/MessagesModel.js";
import {mkdirSync, renameSync} from "fs"

export async function getMessages(req,res,next){
   try{
      const userone=req.userId;
      const usertwo=req.body.id;

      if(!userone ||!usertwo){
        return res.status(400).send("Users both are required")
      }
      const messages= await Message.find({
           $or:[
             {sender:userone,recipient:usertwo},
             {sender:usertwo,recipient:userone}
           ]
      }).sort({timestamp:1})
      
      return res.status(200).json({
        messages
      })
   }
     catch(e){
     console.log(e);
     return res.status(500).send("Server Error");
   }
}

export async function uploadFiles(req,res,next){
   try{
     if(!req.file){
        return res.status(400).send("File is needed");
     }

     const date=Date.now();

     let fileDir=`uploads/files/${date}`

     let fileName=`${fileDir}/${req.file.originalname}`
     

     mkdirSync(fileDir,{recursive:true});

     renameSync(req.file.path,fileName)

      return res.status(200).json({
        filePath:fileName
      })
   }
     catch(e){
     console.log(e);
     return res.status(500).send("Server Error");
   }
}