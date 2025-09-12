import { Avatar,AvatarImage } from "@/components/ui/avatar"
import { userInfoAtom } from "@/store/authAtoms"
import { LOGOUT_ROUTE, SERVER } from "@/utils/constants";
import { useRecoilState, useRecoilValue } from "recoil"

import { Tooltip,TooltipTrigger,TooltipContent } from "@/components/ui/tooltip";
import { FiEdit, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { IoLogOut, IoPowerSharp } from "react-icons/io5";
import { apiClient } from "@/lib/api-client";

const ProfileInfo = () => {
  const [userInfo,setUserInfo]= useRecoilState(userInfoAtom);
  const navigate=useNavigate();

  async function logoutHandle(){
      try{
         const res=await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true});

         if(res.status===200){
          setUserInfo(null);
          navigate("/auth");
         }
      }
      catch(e){
        console.log(e);
      }
  }
  return (
    <div className="absolute bottom-4 h-14 flex items-center justify-center px-4 w-full bg-[rgb(0,113,117)]"
    >
       <div className="flex gap-9 items-center justify-center">
            
          <div className="relative h-12 w-12 ">
            <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                   {
                   userInfo?.image ? (<AvatarImage className="object-cover w-full h-full bg-black" src={`${SERVER}/${userInfo.image}`} 
                    
                  alt="profile"/>)
                   :
                    (<div className={`uppercase h-12 w-40 text-lg border-[1px] border-red-600
                   flex items-center justify-center rounded-full 
                   bg-amber-300 text-red-900 
                   ${userInfo?.color}`
                  }
                   >
                    {
                    userInfo?.firstName ? userInfo.firstName.split("").shift():
                    userInfo?.email.split("").shift()
                    }
                   </div>
                    )
                  }

                </Avatar>
          </div>

          <div>
            {userInfo?.firstName&& userInfo?.lastName ?
            
              `${userInfo.firstName} 
              ${userInfo.lastName}`:
              ""      
            }
          </div>

       </div>

       <div className="flex">
            <Tooltip>
                <TooltipTrigger>
                  <FiEdit2  
                  onClick={()=>navigate("/profile")}
                  className="font-medium text-blue-600 pl-3 text-3xl cursor-pointer"/>
                </TooltipTrigger>
              <TooltipContent className="bg-[#124567] border-none text-white">
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>



             <Tooltip>
                <TooltipTrigger>
                  <IoPowerSharp  
                  onClick={logoutHandle}
                  className="font-medium text-red-950 pl-3 text-3xl cursor-pointer"/>
                </TooltipTrigger>
              <TooltipContent className="bg-[#124567] border-none text-white">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
       </div>


    </div>
  )
}

export default ProfileInfo


//will make msg bar a bit shorter in height 