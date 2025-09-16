import { userInfoAtom } from "@/store/authAtoms";
import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/store/chatAtoms";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
// import { useChatActions } from "@/store/useChatHooks";
import moment from "moment"
import { apiClient } from "@/lib/api-client";
import { GET_MESSAGES_ROUTE, SERVER } from "@/utils/constants";
import {MdFolderZip} from "react-icons/md"
import {IoMdArrowRoundDown}  from "react-icons/io"

const MessageContainer = () => {
   const selectedChatType=useRecoilValue(selectedChatTypeAtom);
   const selectedChatData=useRecoilValue(selectedChatDataAtom);
   const setChatMessages=useSetRecoilState(selectedChatMessagesAtom);
   const userInfo= useRecoilValue(userInfoAtom);

   const bottomRef=useRef<HTMLDivElement|null>(null);
   const selectedChatMessages=useRecoilValue(selectedChatMessagesAtom);



   useEffect(()=>{

    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:"smooth"});
    }
      
   },[selectedChatMessages])//when we have any new message just scroll down to end and display last few messages only

   useEffect(()=>{
         async function getMessages(){
            try{
               const res=await apiClient.post(GET_MESSAGES_ROUTE,{id:selectedChatData._id},{withCredentials:true})

               if(res.data.messages){
                 setChatMessages(res.data.messages);
               }
            }
            catch(e){
              console.log(e);
            }
         }
         if(selectedChatData._id){
           if(selectedChatType==="contact"){
                getMessages();
           }
         }
   },[selectedChatData,selectedChatType,setChatMessages])

  function chatMessagesDisplay(){
      let lastDate:string|null =null;
      return selectedChatMessages.map((message,index)=>{
          const messageDate=moment(message.timestamp).format("YYYY-MM-DD");
          const showDate=(messageDate!==lastDate);
          lastDate=messageDate;
          return <div key={index}>
            {showDate&&
            <div className="text-center text-gray-600 my-1">
              {moment(message.timestamp).format("LL")}
            </div>
            }
            {
              selectedChatType==="contact"&&
              directMessageDisplay(message)
            }

          </div>
      })
  }

  function isImage(filePath?:string):boolean{
    if(!filePath){
      return false;
    }
     const imgRegex=/\.(jpg|jpeg|png|gif|bmp|tif|svg|ico|heif|webp)$/i;
     return imgRegex.test(filePath);
  }

  async function downloadFile(filePath:any):Promise<any>{
        const res= await apiClient.get(`${SERVER}/${filePath}`,{responseType:"blob"})

        const fileBlob=window.URL.createObjectURL(new Blob([res.data]))
        const link=document.createElement("a");
        link.href=fileBlob;
        link.setAttribute("download",filePath?.split("/").pop());
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(fileBlob)
  }  

  function directMessageDisplay(message:any){

    return <div className={`${message.sender===selectedChatData._id?
      "text-left":"text-right"
    }`}>
            {
              message.messageType==="text"&&(
                <div className={`${message.sender!==selectedChatData._id? 
                "bg-[#0b65c6]/20 text-[#a4c5ce] border-[#43889b]":
                "bg-[#474a5e] text-white border-[#9df6f6]"
                  } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>
                    {message.content}   
                </div>
              )
            }

            {
              message.messageType==="file" &&
              (
                <div className={`${message.sender!==selectedChatData._id? 
                "bg-[#0b65c6]/20 text-[#a4c5ce] border-[#43889b]":
                "bg-[#474a5e] text-white border-[#9df6f6]"
                  } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}>

                  {isImage(message.fileUrl)? 

                  <div className="cursor-pointer ">
                    <img src ={`${SERVER}/${message.fileUrl}`} height={300} width={500}/>
                  </div>

                  :

                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-white/7 text-3xl bg-black/20 p-3 rounded-md">

                    <MdFolderZip/>

                    </span>
                    <span>
                      {message.fileUrl.split('/').pop()}
                    </span>
                    <span className="bg-black/20 p-4 text-2xl rounded-full hover:bg-black/60 cursor-pointer transition-all duration-300 " 
                    onClick={()=>{
                      downloadFile(message.fileUrl)
                    }}
                    >

                      <IoMdArrowRoundDown/>
                    </span>
                  </div>
                  }  
                </div>
              )
            }








          <div className="text-xs text-gray-700">
            {moment(message.timestamp).format("LT")}
          </div>

       </div>
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full overflow-hidden scrollbar-hidden " >
      {/* MessageContainer */}
      {chatMessagesDisplay()}

       <div ref={bottomRef}></div>

    </div>
  )
}

export default MessageContainer