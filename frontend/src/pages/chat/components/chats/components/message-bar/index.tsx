import { useEffect, useRef, useState } from "react";
import {GrAttachment} from "react-icons/gr"
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker,{Theme, type EmojiClickData} from "emoji-picker-react"
import { useRecoilValue } from "recoil";
import { selectedChatDataAtom, selectedChatTypeAtom } from "@/store/chatAtoms";
import { useSocket } from "@/context/SocketContext";
import { userInfoAtom } from "@/store/authAtoms";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";


const MessageBar = () => {
    
    const [msg, setMsg] = useState("");
    const emojiRef=useRef<HTMLDivElement>(null);
    const selectedChatType=useRecoilValue(selectedChatTypeAtom);
    const selectedChatData=useRecoilValue(selectedChatDataAtom);
    const userInfo=useRecoilValue(userInfoAtom);
    const socket=useSocket();
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

    const fileInputRef=useRef<HTMLInputElement>(null)

    async function sendMessageHandle(){
       if(selectedChatType==="contact"&&msg.trim()&&selectedChatData._id){
           socket?.current?.emit("sendMessage",{
              sender:userInfo?.id,
              content:msg,
              recipient:selectedChatData._id,//since i am not selecting id too so default _id from backend
              messageType:"text",
              fileUrl:undefined,
           })
       }

       else if(selectedChatType==="channel"){
        socket?.current?.emit("send-channel-message",{
          sender:userInfo?.id,
              content:msg,
              messageType:"text",
              fileUrl:undefined,
              channelId:selectedChatData._id
        })
       }

       setMsg("");//clearing it after once entered
      
    }

    async function sendEmojiHandle(emoji:EmojiClickData){
      setMsg((cur)=>cur+emoji.emoji);
    }

    useEffect(()=>{

      function clickOutsideHandle(e:MouseEvent){
        const target = e.target as Node;
        //guard

          if(emojiRef.current&& !emojiRef.current.contains(target)){
            setEmojiPickerOpen(false);
          }
      }
      document.addEventListener("mousedown",clickOutsideHandle);


      // clean up function 
      return ()=>{
        document.removeEventListener("mousedown",clickOutsideHandle);
      }
    },[])

   function attachmentClickHandle(){
     if(fileInputRef.current){
      fileInputRef.current.click()
     }
   }

   async function attachmentChangeHandle(ev:React.ChangeEvent<HTMLInputElement>){
    try{
       const file=ev.target.files?.[0]
      //  console.log(file);

      if(file){
        const formData=new FormData()
        formData.append("file",file);
        const res=await apiClient.post(UPLOAD_FILE_ROUTE,formData,{withCredentials:true})

          if(res.status===200&&res.data){
              if(selectedChatType==="contact"){
                socket?.current?.emit("sendMessage",
                  {
                  sender:userInfo?.id,
                  content:undefined,
                  recipient:selectedChatData._id,//since i am not selecting id too so default _id from backend
                  messageType:"file",
                  fileUrl:res.data.filePath,
                  }
                )
              }

              else if (selectedChatType==="channel"){
                socket?.current?.emit("send-channel-message",{
                    sender:userInfo?.id,
                        content:undefined,
                        messageType:"file",
                        fileUrl:res.data.filePath,
                        channelId:selectedChatData._id
                })
              }
          }
      } 
      //  const res=await apiClient.post()
    }
    catch(e){
      console.log(e);
    }
   }

  return (
    <div className="h-16  bg-[#1b1d25] flex items-center justify-center ">
      {/* MessageBar */}
      <div className="flex-1 flex bg-[#123456] items-center gap-5 pr-5 rounded-md">
         <input placeholder="Type Your Message" type="text" className="flex-1 p-6 bg-transparent  rounded-md focus:border-none focus:outline-none
          " value={msg} onChange={(e)=>setMsg(e.target.value)}>
         </input>

         <button onClick={attachmentClickHandle}

         className="cursor-pointer text-neutral-500 focus:text-white focus:border-none duration-300 transition-all">

            <GrAttachment className="text-xl"/>

         </button>
         
         <input type="file" className="hidden" ref={fileInputRef} onChange={attachmentChangeHandle}>
         </input>

         <div className="relative">
            <button className="cursor-pointer text-neutral-500 focus:text-white focus:border-none duration-300 transition-all" 
            onClick={()=>setEmojiPickerOpen(true)}>

                <RiEmojiStickerLine
                className="text-xl"/>

            </button>

            {/* //hidden stuff */}
            <div className="absolute bottom-0 -right-20 " ref={emojiRef}>
              <EmojiPicker  theme={Theme.DARK} open={emojiPickerOpen} onEmojiClick={sendEmojiHandle}/>
             </div>

         </div>
         
      </div>

        <button className="bg-[#074f80] rounded-md cursor-pointer text-neutral-500 focus:text-white focus:border-none duration-300 transition-all 
        flex justify-center items-center p-6 hover:bg-[#024281] 
        " onClick={sendMessageHandle}>
          < IoSend className="text-2xl "/>
          {/*  flex is best for centering insrtead of doing pl , pr ,px,py,pt,pb */}
        </button>
    </div>
  )
}

export default MessageBar


