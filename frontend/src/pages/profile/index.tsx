import { userInfoAtom } from "@/store/authAtoms";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IoArrowForward} from "react-icons/io5"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {FaPlus,FaTrash} from "react-icons/fa"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { colors, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { PROFILE_IMAGE_DELETE, PROFILE_IMAGE_ROUTE, SERVER, UPDATE_PROFILE_ROUTE } from "@/utils/constants";

const Profile = () => {
  const [userInfo,setUserInfo]=useRecoilState(userInfoAtom);
  const [firstName, setFirstName] = useState<string|undefined>("");
  const [lastName, setLastName] = useState<string|undefined>("");
  //this image is with the server port included  while in userinfo that is without that
  const [image, setImage] = useState<string | undefined>(undefined);
  const [hovered, setHovered] = useState(false);
  const [selectedColor,setSelectedColor]=useState<number|undefined>(0);
  const navigate=useNavigate();
  const fileInputRef= useRef<HTMLInputElement>(null);
  
  //if user directs it to profile then if the contents of userinfo from backend is already true then show it in input box as well
  useEffect(()=>{
     if(userInfo?.profileSetup){
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setSelectedColor(userInfo.color);
     }
     if(userInfo?.image){
       setImage(`${SERVER}/${userInfo.image}`)
     }
  },[userInfo]);

 function validateProfile(){
    if(!firstName){
        toast.error("First Name is Required");
        return false;
      }
      if (!lastName){
           toast.error("Last Name is reuired")

           return false;
      }
      return true;
 }
  async function saveChanges(){
      if(validateProfile()){
         try{
           const res=await apiClient.put(UPDATE_PROFILE_ROUTE,{firstName,lastName,color:selectedColor},{withCredentials:true})

           if(res.status===200&&res.data.user){
              setUserInfo({...res.data.user})
              toast.success("Profile Update Finished")
              navigate("/chat");
           }
         }
   
         catch(e){
            console.log(e);
         }
      }
  }

  function gotoChat(){
    if(userInfo?.profileSetup){
      navigate("/chat");
    }
    else{
      toast.error("Complete the Profile");
    }
  }

  function inputFileClickHandle(){
    fileInputRef.current?.click();
  }

  async function addmodifyImage(e: React.ChangeEvent<HTMLInputElement>){  //or any
     const file=e?.target.files?.[0];
    //  console.log({file});
    //  console.log(file);
     if(file){

        try{
          const formData=new FormData();
          formData.append("profile-img",file);
          const res=await apiClient.put(PROFILE_IMAGE_ROUTE,formData,{withCredentials:true});

          if(res.status===200&&res.data.image){
            // console.log(res.data.image);
            setUserInfo((prev) => prev ? { ...prev, image: res.data.image } : null);
            toast.success("Profile Image Successfully Updated");
          }

          console.log(res.data.image,res.status);
        }

        catch(e){
          console.log(e);
        }

     }

     else{
      //will this enter anytime ??
      toast.error("Select a image from local")
     }

  }
  // function imageChangeHandle(){
   
  // }

  async function deleteImage(){
     try{
        const res=await apiClient.delete(PROFILE_IMAGE_DELETE,{withCredentials:true});

        if(res.status===200&&userInfo){
          const {image,...rest}=userInfo;
          setUserInfo(rest);
          setImage(undefined);
          toast.success("Profile Image Successfully removed")
        }
     }
     catch(e){
       console.log(e);
     }
  }

  if(!userInfo){
    //  toast("please complete the authentication");
    //  navigate("/auth"); 
     return null;
  }

  //profile update we may check if details is exactly the same as before 

  return ( 
    <div className="bg-blue-200 h-[100vh] flex items-center justify-center flex-col gap-10">

      <div className="flex flex-col gap-10 v-[80vw] md:w-max">
         <div>
            <IoArrowForward className="text-4xl lg:text-6xl text-white/90 cursor-pointer"
            onClick={gotoChat}/>
         </div>

         <div className="grid grid-cols-2">
             <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
             onMouseEnter={()=>setHovered(true)}
             onMouseLeave={()=>setHovered(false)}> 
                
                <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                   {
                   image? (<AvatarImage className="object-cover w-full h-full bg-black" src={image} alt="profile"/>)
                   :
                    (<div className={`uppercase h-32 w-40 md:w-48 md:h-48 text-5xl border-[1px] border-red-600
                   flex items-center justify-center rounded-full 
                   bg-amber-300 text-red-900 
                   ${getColor(selectedColor)}
                   `}
                   >
                    {
                    firstName ? firstName.split("").shift():
                    userInfo?.email.split("").shift()
                    }
                   </div>
                    )
                  }

                </Avatar>

                {hovered&&
                  (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer rounded-full " onClick={image? deleteImage:inputFileClickHandle} >

                     {image? <FaTrash className="text-white cursor-pointer text-3xl"/>:
                    
                    (<FaPlus className="text-white cursor-pointer text-3xl"/>
                    )}

                    </div>
                  )
      
                }
                  
                <input type="file" ref={fileInputRef} className="hidden" onChange={addmodifyImage} name="profile-img" accept=".png, .jpeg ,.jpg, .svg ,.webp "/>
             </div>


             <div className="flex min-w-32 md:min-w-64 flex-col gap-5 justify-center items-center text-white">

               <div className="w-full">
                 <Input 
                 className=" p-6 bg-[#2c2e3b] border-none  rounded-lg"
                 placeholder="Email" type="email" disabled value={userInfo.email}/>
               </div>
               <div className="w-full">
                 <Input 
                 className=" p-6 bg-[#2c2e3b] border-none  rounded-lg"
                 onChange={(e)=>{
                  setFirstName(e.target.value)
                 }}
                 placeholder="FirstName" 
                 value={firstName}type="text"/>
                 
               </div>
               <div className="w-full">
                 <Input 
                 className=" p-6 bg-[#2c2e3b] border-none  rounded-lg"
                 placeholder="LastName" 
                 value={lastName}
                 onChange={(e)=>{
                  setLastName(e.target.value)
                 }}
                 type="text" />
               </div>

               <div className="w-full flex gap-5">
                    {colors.map((color,index)=>(
                      <div className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300

                        ${
                        selectedColor===index? " outline-white outline-1":""
                        }
                      `
                      }
                       key={index}

                       onClick={()=>setSelectedColor(index)}
                      >
                      
                      </div>
                    ))}
               </div>

             </div>

         </div>
          
        <div className="w-full">

          <Button className="h-16 w-full bg-purple-500 hover:bg-purple-900 transition-all duration-300"
          onClick={saveChanges}>
             Save Changes
          </Button>
          
        </div>
      </div>
      
    </div>
  )

}

export default Profile


  // if(!userInfo){
  //     return <div>Please Login First</div>
  // }
  // return (
  //   <div>Profile
  //     <div>
  //       Email:{userInfo.id}
  //     </div>
  //   </div>
  // )