import Background from "@/assets/login3.png"
// import ChatIcon from "@/assets/chat-icon.svg"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate= useNavigate();

  function validateSignup(){
        if(!email.length){
          toast.error("Email is needed");
          return false;
        }
        else if(password.length<6){
          toast.error("password too small , make sure it is atleast of length 6");
          return false;
        }

        else if(confirmPassword!==password){
            toast.error("Password and confirm password doesn't match")
            return false;
        }

        return true;  
  }
  function validateLogin(){
        if(!email.length){
          toast.error("Email is needed");
          return false;
        }
        if(!password.length){
          toast.error("Please enter your password ")
          return false;
        }
        return true;  
  }
  async function signupHandle(){
     if(validateSignup()){
        // alert("all goood")
        const res=await apiClient.post(SIGNUP_ROUTE,{email,password},{
          withCredentials:true
        });
        console.log(res.data.user);
        if(res.status===201){
          navigate("/profile");
        }
     }
     
     else{
      //will we not do this ??
     }
  }

  async function loginHandle(){
      if(validateLogin()){
          const res=await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
          console.log(res);
          if(res.data.user.id){
            if(res.data.user.profileSetup){
              navigate("/chat");
            }
            else{
              navigate("/profile")
            }
          }
      }
      
  }

  

  
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">


       <div className="h-[80vh] w-[80vw] bg-green-300 border-3 border-white shadow-2xl
        md:w-[70vw] lg:w-[60vw] xl:w-[50vw] rounded-3xl md:grid md:grid-cols-2">
            {/* i think as its flux-col already so w-full doenst make sense as whether we give or not it willl be actually w-full only  */}
              <div className="flex flex-col justify-center items-center w-full">
                {/* here we need to give w-full */}

                  <div className="flex items-center justify-center w-full">

                      <h2 className="font-medium text-4xl md:text-5xl">Welcome</h2>
                      <img  alt="emoji"/>

                  </div>
                 
                      <p className="font-medium text-center"> Fill in the details to get started
                      </p>

                  <div className="flex items-center justify-center w-full mt-4">
                      <Tabs className="w-3/4" defaultValue="login">
                      {/* single quantity */}
                        <TabsList className="bg-neutral-200 w-full">
                          <TabsTrigger value="login"
                          className="
                          
                          w-full
                          border-b-amber-100
                          p-3
                          border-b-2

                          data-[state=active]:bg-white

                          data-[state=active]:text-black

                          data-[state=active]:border-b-purple-500

                          data-[state=active]:font-semibold 
                          
                          transition-all duration-300  "
                          >
                            Login
                          </TabsTrigger>
                          
                          <TabsTrigger value="signup"
                          className="
                          
                          w-full
                          border-b-amber-100
                          p-3
                          border-b-2

                          data-[state=active]:bg-white

                          data-[state=active]:text-black

                          data-[state=active]:border-b-purple-500

                          data-[state=active]:font-semibold 
                          
                          transition-all duration-300  " >
                            Signup
                          </TabsTrigger>

                          
                          
                        </TabsList>

                        

                        <TabsContent value="login"
                          className="flex flex-col gap-5 mt-10"
                        >

                          <Input placeholder="Email" className="rounded-full p-7"
                          value={email}
                          type="email"
                          onChange={(e)=>{
                            setEmail(e.target.value)
                          }}>
                          </Input>

                          <Input placeholder="Password" className="rounded-full p-7"
                          value={password}
                          type="password"
                          onChange={(e)=>{
                            setPassword(e.target.value)
                          }}>
                          </Input>

                          

                          <Button className="p-4 rounded-full " onClick={loginHandle}
                          >
                          Login
                          </Button>
  

                          
                        </TabsContent>

                        <TabsContent value="signup"
                        className="flex flex-col gap-5 mt-10"
                        >

                          <Input placeholder="Email" className="rounded-full p-7"
                          value={email}
                          type="email"
                          onChange={(e)=>{
                            setEmail(e.target.value)
                          }}>
                          </Input>

                          <Input placeholder="Password" className="rounded-full p-7"
                          value={password}
                          type="password"
                          onChange={(e)=>{
                            setPassword(e.target.value)
                          }}>
                          </Input>

                          <Input placeholder="Confirm Password" className="rounded-full p-7"
                          value={confirmPassword}
                          type="password"
                          onChange={(e)=>{
                            setConfirmPassword(e.target.value)
                          }}>
                          </Input>

                          <Button className="p-4 rounded-full " onClick={signupHandle}
                          >
                          Signup
                          </Button>


                        </TabsContent>
                        
                      </Tabs>

                  </div>

              </div>

              <div className=" hidden md:flex justify-center items-center ">
                <img className="md:h-[400px]"
                src={Background} alt= "background_login"/>
              </div>
              <div className=" flex justify-center items-center md:hidden">
                <img className="h-[100px]"
                src={Background} alt= "background_login"/>
              </div>
        </div>


    </div>
  )
}

export default Auth