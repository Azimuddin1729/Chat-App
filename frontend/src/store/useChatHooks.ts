import { useSetRecoilState, useResetRecoilState } from "recoil";
import { selectedChatTypeAtom, selectedChatDataAtom, selectedChatMessagesAtom } from "./chatAtoms";

export function useChatActions() {

  const setChatType = useSetRecoilState(selectedChatTypeAtom);
  const setChatData = useSetRecoilState(selectedChatDataAtom);
  const setChatMessages = useSetRecoilState(selectedChatMessagesAtom);

  // reset functions that put atoms back to their default values.

  const resetChatType = useResetRecoilState(selectedChatTypeAtom);
  const resetChatData = useResetRecoilState(selectedChatDataAtom);
  const resetChatMessages = useResetRecoilState(selectedChatMessagesAtom);
 

  //resetting function
  const closeChat = () => {
    resetChatType();
    resetChatData();
    resetChatMessages();
  };


  return {
    setChatType,      
    setChatData,      
    setChatMessages,   
    closeChat,        
  };
}
