import { Server } from "socket.io";

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

     socket.on("disconnect",(socket)=>{
        console.log(`Client disconnected : ${socket.id}`)
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