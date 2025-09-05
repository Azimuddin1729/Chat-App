import {useEffect, useState, type ReactNode } from 'react'
// import { Button } from '@/components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import {useRecoilState, useRecoilValue } from 'recoil'
import { userInfoAtom } from './store/authAtoms'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'
// import {Button} from "./components/ui/button"

function PrivateRoute({children}:{children:ReactNode}){
  const userInfo= useRecoilValue(userInfoAtom);
  if(!!userInfo){
    return children
  }
  else{
    return <Navigate to="/auth"/>
  }
}

// function ProfileRoute({children}:{children:ReactNode}){
//   const userInfo= useRecoilValue(userInfoAtom);
//   if(userInfo?.profileSetup===false){
//     return children;
//   }
//   else{
//     return <Navigate to="/chat"/>
//   }
// }

function AuthRoute({children}:{children:ReactNode}){
  const userInfo= useRecoilValue(userInfoAtom);
  if(!!userInfo){
    return <Navigate to="/chat"/>
  }
  else{
    return children
  }
}
// we are navigating here to chat but in case chat is having the prfile page setup false then redirect to profile page (which is done inside )

function App() {

  const [userInfo,setUserInfo]=useRecoilState(userInfoAtom);

  const [loading, setLoading] = useState(true);

  
  useEffect(()=>{
   async function getUserInfo(){
      try{
        const res=await  apiClient.get(GET_USER_INFO,{
              withCredentials:true
        })
        if(res.status===200&&res.data.user.id){
          setUserInfo(res.data.user);
        }
        else{
           setUserInfo(null);
        }
        console.log(res);
      }
      catch(e){
       setUserInfo(null);
       console.log(e);
      }
      finally{
        setLoading(false);
      }
    }

    if(!userInfo){
      getUserInfo();
    }
    else{
      setLoading(false);
    }
     
  },[setUserInfo,setLoading])


  if(loading){
    return <div>loading...</div>
  }

  

  return (
    // <Button>
    //    Hi
    // </Button>
    
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthRoute><Auth/></AuthRoute>}/>
          <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
          <Route path='/chat' element={
            <PrivateRoute><Chat/></PrivateRoute>}/>
          <Route path ="*" element = {<Navigate to='/auth'/>}/>
          {/* default path set */}

        </Routes>
      </BrowserRouter>
  )
}

export default App
