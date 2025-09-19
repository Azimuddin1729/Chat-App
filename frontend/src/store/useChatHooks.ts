import { useSetRecoilState, useResetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { selectedChatTypeAtom, selectedChatDataAtom, selectedChatMessagesAtom, channelsAtom } from "./chatAtoms";

export function useChatActions() {

  const setChatType = useSetRecoilState(selectedChatTypeAtom);
  const setChatData = useSetRecoilState(selectedChatDataAtom);
  const setChatMessages = useSetRecoilState(selectedChatMessagesAtom);

  // reset functions that put atoms back to their default values.

  const resetChatType = useResetRecoilState(selectedChatTypeAtom);
  const resetChatData = useResetRecoilState(selectedChatDataAtom);
  const resetChatMessages = useResetRecoilState(selectedChatMessagesAtom);


  const chatType = useRecoilValue(selectedChatTypeAtom);

  //resetting function
  const closeChat = () => {
    resetChatType();
    resetChatData();
    resetChatMessages();
  };

  const addMessage=(message:any)=>{
    setChatMessages((prev)=>[...prev,{
         ...message,
         recipient:chatType==="channel"? message.recipient:message.recipient?._id,
         sender: chatType === "channel" ? message.sender : message.sender?._id

         //for channel we want to show profile pic name etc thats why all things needed but for direct only id is sufficient 
       
    }])
  }

  const [channels, setChannels] = useRecoilState(channelsAtom);

  const addChannel = (channel:any) => {
    setChannels([channel, ...channels]);
  };
  

  return {
    setChatType,      
    setChatData,      
    setChatMessages,   
    closeChat,    
    addMessage,
    addChannel, 
    channels,
    setChannels,

  };
}
