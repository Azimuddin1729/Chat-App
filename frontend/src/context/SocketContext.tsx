import { createContext,useRef,useContext,useEffect, type ReactNode,} from "react";
import { userInfoAtom } from "@/store/authAtoms";
import { selectedChatDataAtom,selectedChatMessagesAtom,selectedChatTypeAtom } from "@/store/chatAtoms";
// import { useNavigate } from "react-router-dom";
import {useRecoilValue } from "recoil";
import {io, Socket} from "socket.io-client"
import {SERVER} from "@/utils/constants"

import { useChatActions } from "@/store/useChatHooks";

const SocketContext= createContext<React.RefObject<Socket | null> | null>(null);

export function useSocket(){
    return useContext(SocketContext);
}



export function SocketProvider({children}:{children:ReactNode}){
     const socketRef=useRef<Socket|null>(null);
     const userInfo=useRecoilValue(userInfoAtom);
     const selectedChatData=useRecoilValue(selectedChatDataAtom);
     const selectedChatType=useRecoilValue(selectedChatTypeAtom);
     const{addMessage}=useChatActions();
        
    

     useEffect(()=>{

        if(userInfo?.id){
            socketRef.current=io(SERVER,{
                withCredentials:true,
                query:{userId:userInfo.id}
            })

        //    console.log("inside the if condiion socket contains this:" ,socketRef.current);

            socketRef.current?.on("connect",()=>{
                console.log("Connection Successful with the Server")
            })
        }

        
        return ()=>{
            socketRef.current?.disconnect()
        }
        
     },
     [userInfo?.id]);//


     //make a socket per new user only 
     

     //for other activities using the formed socket:
     useEffect(()=>{

        const socket = socketRef.current;
        if (!socket) return;

         console.log("socket contains this:" ,socket);
         console.log(selectedChatData,selectedChatType)

        // if(!socketRef.current){
        //     return;
        // }

        function messagecomingHandle(message:any){
                //we check if user who is trying to send messages and the receiver has actually been seeing his/her chat currently !!
                console.log(selectedChatData,selectedChatType)

                if(selectedChatType!==undefined&&(selectedChatData._id===message.sender._id||selectedChatData._id===message.recipient._id)){
                    console.log("msg recieved" ,message);
                    addMessage(message);
                }
        }

        socket.on("receiveMessage",messagecomingHandle);

        return () => {
            socket.off("receiveMessage", messagecomingHandle);
        };

     },[selectedChatData,selectedChatType,addMessage])
     
     return (
        <SocketContext.Provider value={socketRef}> 
         {/* this socketref.current value i want to share in the child 
        what we are sending also matches the 
        fucntion created at first 
        export function useSocket(){
              return useContext(SocketContext);
           and type of SocketContext is Socket !!!!! which is what socketref.current also gives/ */}

            {children}
        </SocketContext.Provider>
     )

}