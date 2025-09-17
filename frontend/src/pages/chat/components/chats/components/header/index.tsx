import {RiCloseFill} from "react-icons/ri"
import { useChatActions } from "@/store/useChatHooks.js";
import { Avatar  ,AvatarImage} from "@/components/ui/avatar";
import { SERVER } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { selectedChatDataAtom, selectedChatTypeAtom } from "@/store/chatAtoms";
import { useRecoilState, useRecoilValue } from "recoil";

const Header = () => {

  const {closeChat}=useChatActions();

  const selectedChatType= useRecoilValue(selectedChatTypeAtom);
  const selectedChatData= useRecoilValue(selectedChatDataAtom)


  return (
    <div className="h-[10vh] border-b-3 border-[#353855] flex items-center justify-center px-20 "
    >
      <div className="flex gap-5 items-center w-full ">

         <div className="gap-5 justify-center flex items-center">
            <div className="w-12 h-12 relative">
              {
                selectedChatType==="contact"?
                    <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                        {
                                        selectedChatData.image ? (<AvatarImage className="object-cover w-full h-full bg-black" src={`${SERVER}/${selectedChatData.image}`} 
                                            
                                        alt="profile"/>)
                                        :
                                            (<div className={`uppercase h-12 w-12 text-lg flex items-center justify-center rounded-full ${getColor(selectedChatData?.color)}`
                                        }
                                        >
                                            {
                                            selectedChatData?.firstName ? selectedChatData.firstName.split("").shift():
                                            selectedChatData?.email.split("").shift()
                                            }
                                        </div>
                                            )
                                        }

                    </Avatar> : 
                    <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full ">
                                #
                    </div>
              }
               
            </div>
        </div>

        <div>
          {selectedChatType==="channel"&&selectedChatData.name} 
          {selectedChatType==='contact'&& (selectedChatData.firstName?
            `${selectedChatData.firstName} ${selectedChatData.lastName}`
          : `${selectedChatData.email}`)}
        </div>

      </div>

         
         <div className="flex gap-3 items-center justify-center">

            <button className="text-neutral-500 focus:outline-none focus:border-white focus:border-2
            focus:text-white duration-300 transition-all cursor-pointer border-none" onClick={closeChat}>
                <RiCloseFill className="text-3xl"/>
            </button>

         </div>

  </div>
  )
}

export default Header