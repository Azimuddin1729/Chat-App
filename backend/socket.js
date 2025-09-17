import { Server } from "socket.io";
import Message from "./models/MessagesModel.js";
import Group from "./models/GroupModel.js";

function setupSocket(server){
   const io= new Server(server,{
    cors:
    {
        origin:process.env.ORIGIN,
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
   })

   const userSocketMap=new Map();
   async function sendGroupMessage(message){
       const{channelId,sender ,content,messageType,fileUrl}=message;
       const createdMessage=await Message.create({
        sender,
        recipient:null,
        content,
        messageType,
        timestamp:new Date(),
        fileUrl
       })

       const messageData=await Message.findById(createdMessage._id).populate("sender","id firstName lastName image color").exec()

       await Group.findByIdAndUpdate(channelId,{
        $push:{messages:createdMessage._id}
       })

       const channel= await Group.findById(channelId).populate("members");

       const finalData={...messageData._doc ,channelId:channel._id}

       if(channel&&channel.members){
        channel.members.forEach((member)=>{
            const memberSocketId=userSocketMap.get(member._id.toString())
           if(memberSocketId){
            io.to(memberSocketId).emit("receive-channel-message",finalData)
           }
        })

       }
        const adminSocketId=userSocketMap.get(channel.admin._id.toString())
           if(adminSocketId){
            io.to(adminSocketId).emit("receive-channel-message",finalData)
           }
   }

   io.on("connection",(socket)=>{
        const userId=socket.handshake.query.userId;
        if(userId){
            userSocketMap.set(userId,socket.id);
            console.log(`User connected: ${userId} with socketID ${socket.id}`)
        }
        else{
            console.log("User ID not given")
        }


     socket.on("sendMessage",async (message)=>{
        const senderSocketId=userSocketMap.get(message.sender)
        const receiverSocketId=userSocketMap.get(message.recipient)
        
        const createMessage=await Message.create(message)

        const messageData=await Message.findById(createMessage._id).populate("sender","_id email firstName lastName image color").populate("recipient","_id email firstName lastName image color")

        console.log(messageData);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("receiveMessage",messageData)
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("receiveMessage",messageData)
        }

     })

     socket.on("send-channel-message",sendGroupMessage);
     socket.on("disconnect",(reason)=>{
        console.log(`Client disconnected : ${socket.id},reason: ${reason}`)
        for(const[userId,socketId] of userSocketMap.entries()){
            if(socket.id===socketId){
                userSocketMap.delete(userId);
                break;
            }
        }
     })

   })
}


export default setupSocket