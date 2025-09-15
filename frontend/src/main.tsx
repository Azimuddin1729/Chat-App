// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { RecoilRoot } from 'recoil'
import { SocketProvider } from './context/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>

    <RecoilRoot>
       <SocketProvider>
          <App />
          <Toaster closeButton/>
       </SocketProvider>   
    </RecoilRoot>
  // </StrictMode>
)
