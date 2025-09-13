//for chatting with new user
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
//   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { apiClient } from "@/lib/api-client"
import { SEARCH_CONTACTS_ROUTE, SERVER } from "@/utils/constants"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

import { getColor } from "@/lib/utils"

type Contact = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  color?: number;
};

const NewDm = () => {
    
   const [openNewContacts, setOpenNewContacts] = useState(false);

   const [searchedContacts , setSearchedContacts] = useState<Contact[]>([])

   const [hasSearched, setHasSearched] = useState(false);


   async function searchContacts(searchTerm:string){
      try{
        if(searchTerm.length>0){
             setHasSearched(true);
            const res=await apiClient.post(SEARCH_CONTACTS_ROUTE,{searchTerm},{withCredentials:true})
            if(res.status===200&&res.data.contacts){
                setSearchedContacts(res.data.contacts);
            }
        }
        else{
            setSearchedContacts([]);
            setHasSearched(false); 
        }
        
      }
      catch(e){

      }
   }

  return (
    <>
        <Tooltip>
            <TooltipTrigger>
                <FaPlus
                className="text-neutral-400 font-light text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                onClick={()=>{setOpenNewContacts(true)}} 
                />
            </TooltipTrigger>

            <TooltipContent>
                <p>New Direct Chat</p>
            </TooltipContent>

        </Tooltip>

        <Dialog open={openNewContacts} onOpenChange={(isOpen) => {
            setOpenNewContacts(isOpen);
                if (!isOpen) {
                // reset state when closing
                setSearchedContacts([]);
                setHasSearched(false);
                }
        }}>
            {/* <DialogTrigger>
                Open
            </DialogTrigger> */}
            {/* //our trigger is the tool tip */}

            <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>
                        Please Select a Contact:
                    </DialogTitle>

                <DialogDescription/>
                {/* </DialogDescription> */}
                </DialogHeader>
                <Input type="text" placeholder="Search Contacts" onChange={(e)=>{
                    searchContacts(e.target.value)
                }}>
                </Input>
                <ScrollArea className="h-[250px]">
                    <div className="flex flex-col gap-5">

                    {
                        searchedContacts.map((contact)=>(
                          <div key={contact._id} className="flex gap-3 items-center
                          cursor-pointer">  

                             <div className="relative h-12 w-12 ">
                                    <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                        {
                                        contact?.image ? (<AvatarImage className="object-cover w-full h-full bg-black" src={`${SERVER}/${contact.image}`} 
                                            
                                        alt="profile"/>)
                                        :
                                            (<div className={`uppercase h-12 w-12 text-lg flex items-center justify-center rounded-full ${getColor(contact?.color)}`
                                        }
                                        >
                                            {
                                            contact?.firstName ? contact.firstName.split("").shift():
                                            contact?.email.split("").shift()
                                            }
                                        </div>
                                            )
                                        }

                                     </Avatar>
                               </div>

                               <div className="flex flex-col">
                                  <div>
                                    {contact.firstName&&contact.lastName? `${contact.firstName} ${contact.lastName}`:`${contact.email}`}
                                  </div>
                                  <div className="text-xs">
                                    {contact.email? `${contact.email}`:""}
                                  </div>
                               </div>

                          </div>
                        ))
                    }

                    {

                        hasSearched&&searchedContacts.length===0&&(
                            <div className="flex items-center justify-center h-full text-neutral-400">
                             No contacts found
                            </div> 
                        )
                    }


                    {
                        !hasSearched&&searchedContacts.length===0&&(
                             <div className="flex items-center justify-center h-full text-neutral-400">
                              Loading...
                            </div> 
                        )
                    }
                    </div>
                </ScrollArea>
                {/* {
                    searchedContacts.length<=0&&
                    (<div className="flex items-center justify-center">
                        Loading...
                    </div>
                    )
                }   */}
            </DialogContent>
        </Dialog>
    </>
  )
}
export default NewDm