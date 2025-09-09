import Header from "./components/header"
import MessageBar from "./components/message-bar"
import MessageContainer from "./components/message-container"

const ChatContainer = () => {
  return (
    <div className="top-0 h-[100vh] w-[100vw] bg-[#202335] flex flex-col md:static md:flex-1 "> 
    {/* fixed */}
      
      
      <Header/>
      <MessageContainer/>
      <MessageBar/>
      
    
    
    
    </div>
    
  )
}

export default ChatContainer