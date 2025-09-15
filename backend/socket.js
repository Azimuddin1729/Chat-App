import { Server } from "socket.io";
import Message from "./models/MessagesModel.js";

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