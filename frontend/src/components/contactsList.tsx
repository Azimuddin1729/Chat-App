import { selectedChatDataAtom } from "@/store/chatAtoms";
import { useChatActions } from "@/store/useChatHooks"
import { useRecoilValue } from "recoil";
import { Avatar, AvatarImage } from "./ui/avatar";
import { SERVER } from "@/utils/constants";
import { getColor } from "@/lib/utils";


const ContactList = ({contacts,isChannel=false}:{contacts:any,isChannel?:boolean}) => {

  const selectedChatData=useRecoilValue(selectedChatDataAtom);
//   const selectedChatType=useRecoilState(selectedChatTypeAtom);

  const {setChatData,setChatType,setChatMessages}=useChatActions();
  

  function handleClick(contact:any){
     if(isChannel){
        setChatType("channel")
     }
     else{
        setChatType("contact")
     }
     
     if(selectedChatData&&(selectedChatData._id!==contact._id)){
          setChatMessages([]);
     }
     setChatData(contact);
  }

  return (
    <div className="mt-5 ">
        {contacts.map((contact:any)=>(
            <div key={contact._id} className=
            {`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData&&(selectedChatData._id===contact._id)?"bg-[#271e66] hover:bg-[#2745b3]":"hover:bg-[#1f1f1f]"}`} 
            onClick={()=>handleClick(contact)}
            >
                <div className="flex gap-5 items-center justify-start text-neutral-300">
                    {

                        !isChannel&&
                        (
                            <Avatar className="h-10 w-10  rounded-full overflow-hidden">
                                        {
                                        contact.image ? (<AvatarImage className="object-cover w-full h-full bg-black" src={`${SERVER}/${contact.image}`} 
                                            
                                        alt="profile"/>)
                                        :
                                            (<div className={` ${
                                                
                                             selectedChatData&&selectedChatData.   _id===contact._id ? "bg-[#ffffff22] border border-white/50":
                                             getColor(contact.color)
                                            }                                        uppercase h-10 w-10 text-lg flex items-center justify-center rounded-full`
                                        }
                                        >
                                            {
                                            contact.firstName ? contact.firstName.split("").shift():
                                            contact.email.split("").shift()
                                            }
                                        </div>
                                            )
                                        }

                </Avatar>
                        )
                    }

                    {
                        isChannel&&
                        (
                            <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full ">
                                #
                            </div>
                        )

                    }

                    {
                        isChannel?
                        (
                            <span>{contact.name}</span>
                        ):
                        (
                            <span>{`${contact.firstName} ${contact.lastName}`}</span>
                        )
                    }
                  
                </div>
            </div>
        ))}
    </div>
  )
}

export default ContactList