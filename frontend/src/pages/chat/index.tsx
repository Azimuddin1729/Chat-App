import { userInfoAtom } from "@/store/authAtoms"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil"
import { toast } from "sonner";

const Chat = () => {
  const userInfo= useRecoilValue(userInfoAtom);
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(!userInfo?.profileSetup){
      toast("Profile is not yet made");
      navigate("/profile");
    }
  },[navigate,userInfo]);
   
  return (
    <div>Chat</div>
  )
}

export default Chat