import { userInfoAtom } from "@/store/authAtoms"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil"
import { toast } from "sonner";
import ContactsContainer from "./components/contacts";
import EmptyChatContainer from "./components/empty-chat";
import ChatContainer from "./components/chats";


const Chat = () => {
  const userInfo= useRecoilValue(userInfoAtom);
  const navigate=useNavigate();
  
  useEffect(()=>{
    // if(!userInfo?.profileSetup){
    //   toast("Profile is not yet made");
    //   navigate("/profile");
    // }
    if (userInfo && userInfo.profileSetup === false) {
      // user exists and hasn't set up profile
      toast("Profile is not yet made");
      navigate("/profile");
    }
    // else if (userInfo===null){
    //   toast("First Sign Up");
    //   navigate("/auth");
    // }

  },[navigate,userInfo]);
   
  return (
    <div className="flex h-[100vh]  overflow-hidden ">
      <ContactsContainer/>
      {/* <EmptyChatContainer/> */}
      <ChatContainer/>
    </div>
  )
}

export default Chat