import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
// import {Button} from "./components/ui/button"


function App() {
  

  return (
    // <Button>
    //    Hi
    // </Button>
    <BrowserRouter>
       <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path ="*" element = {<Navigate to='/auth'/>}/>
        {/* default path set */}

       </Routes>
    </BrowserRouter>
  )
}

export default App
