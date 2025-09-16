import Message from "../models/MessagesModel.js";

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