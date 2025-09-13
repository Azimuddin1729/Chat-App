import { useEffect, useRef, useState } from "react";
import {GrAttachment} from "react-icons/gr"
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker,{Theme} from "emoji-picker-react"
const MessageBar = () => {

    const [msg, setMsg] = useState("");
    const emojiRef=useRef<HTMLDivElement>(null);
    
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    async function sendMessageHandle(){
      
    }
    async function sendEmojiHandle(emoji:any){
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

  return (
    <div className="h-16  bg-[#1b1d25] flex items-center justify-center ">
      {/* MessageBar */}
      <div className="flex-1 flex bg-[#123456] items-center gap-5 pr-5 rounded-md">
         <input placeholder="Type Your Message" type="text" className="flex-1 p-6 bg-transparent  rounded-md focus:border-none focus:outline-none
          " value={msg} onChange={(e)=>setMsg(e.target.value)}>
         </input>

         <button 

         className="cursor-pointer text-neutral-500 focus:text-white focus:border-none duration-300 transition-all">

            <GrAttachment className="text-xl"/>

         </button>
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


