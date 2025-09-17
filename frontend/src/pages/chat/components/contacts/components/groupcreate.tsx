import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa"

import { useEffect, useState } from "react"

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
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE, SERVER } from "@/utils/constants"

// import { useChatActions} from "@/store/useChatHooks.js"
import { Button } from "@/components/ui/button"
import MultipleSelector from "@/components/ui/multipleselect"
import { useChatActions } from "@/store/useChatHooks"

const GroupCreate = () => {

//    const { setChatType, setChatData } = useChatActions();
   const [openNewChannel, setOpenNewChannel] = useState(false);
   const [allContacts, setAllContacts] = useState([])
   const [selectedContacts, setSelectedContacts] = useState<any>([])
   const [channelName, setChannelName] = useState("")
   const{addChannel}= useChatActions();



   useEffect(()=>{
      async function getcontacts(){
         try{
           const res= await apiClient.get(GET_ALL_CONTACTS_ROUTE,{withCredentials:true})
           setAllContacts(res.data.contacts)
         }
         catch(e){
            console.log(e);
         }
      }  
      getcontacts();  
      console.log("Selected:",selectedContacts);
   },[]);
    
 
  async function makeChannel(){
       try{
            // console.log(selectedContacts)
            if(channelName.length>0&&selectedContacts.length>0){
                const res = await apiClient.post(CREATE_CHANNEL_ROUTE,{
                    name:channelName,
                    members:selectedContacts.map((contact:any)=>{
                    return contact.value
                    })
                },{withCredentials:true})


                if(res.status===201){
                    setChannelName("");
                    setSelectedContacts([]);
                    setOpenNewChannel(false);
                    addChannel(res.data.group)

                }


            }
       }

    
       catch(e){
        console.log(e);
       }
  }


  return (
    <>
        <Tooltip>
            <TooltipTrigger>
                <FaPlus
                className="text-neutral-400 font-light text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
                onClick={()=>{setOpenNewChannel(true)}} 
                />
            </TooltipTrigger>

            <TooltipContent>
                <p>Create New Group</p>
            </TooltipContent>

        </Tooltip>

        <Dialog open={openNewChannel} onOpenChange={(isOpen) => {
            setOpenNewChannel(isOpen);
            // 
        }}>
            {/* <DialogTrigger>
                Open
            </DialogTrigger> */}
            {/* //our trigger is the tool tip */}

            <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>
                        Select the Details of the Group
                    </DialogTitle>

                <DialogDescription/>
                {/* </DialogDescription> */}
                </DialogHeader>
                <div>
                    <Input type="text" placeholder="Group Name" onChange={(e)=>{
                        setChannelName(e.target.value)
                    }} value={channelName}>    
                    </Input>
                </div>
                <div>
                    <MultipleSelector className="rounded-lg p-4 bg-[#1b1d2d] border-none " defaultOptions={allContacts} placeholder="Search Contacts" value={selectedContacts} emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-500">No results found </p>
                    }
                    onChange={setSelectedContacts}
                    commandProps={{
    className: `
      bg-transparent
      [&_[cmdk-list]]:bg-zinc-900 [&_[cmdk-list]]:text-zinc-100
      [&_[cmdk-item]]:bg-zinc-800 [&_[cmdk-item]]:text-zinc-100
      [&_[cmdk-item]:hover]:bg-zinc-700
      [&_[cmdk-item][data-selected='true']]:bg-zinc-700
      [&_[cmdk-item][data-selected='true']]:text-blue
      [&_[cmdk-group-heading]]:text-blue
    `,
  }}/>
                </div>
                <div>
                    <Button className="w-full bg-blue-950 hover:bg-blue-700 transition-all duration-300 cursor-pointer"
                    onClick={makeChannel}>
                        Create Group
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}
export default GroupCreate