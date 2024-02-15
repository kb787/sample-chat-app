import {useState,useEffect} from 'react' ;
import ScrollToBottom from 'react-scroll-to-bottom' ;

const ChatRoom = ({socket,username,room}) => {
   const [message,setMessage] = useState('') ; 
   const [chats,setChats] = useState([]) ;

   const messageData = {
        room: room,
        author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
   }
   const handleSendChat = async (e) => {
         e.preventDefault() ; 
         if(message !== ""){
         setMessage('') ;
         await socket.emit("send_message", messageData);
         setChats((list) => [...list, messageData]);
         setMessage("");
         }
         else {
            alert('Cannot send blank message') ;
         }
   }
   useEffect(() => {
     socket.on("recieve_message",(data) => {
        setChats((item) => [...item,data])
     })
   },[socket]) ;
   return (
      <div className = "MainContainer">
           <p className = "chatRoomHeading">Welcome to your chat-room</p> 
           <div className = "chatContainer">
           <ScrollToBottom>
             {
                chats?.map((chatItem) => {
                return (
                <div className = "userChats">   
                  <div className = "chatBodyUserId"
                  id = {username === chatItem.author ? "you":"other"}  
                  />
                  <p className = "chatAuthor">Username : {chatItem.author}</p>
                  <p className = "chatBodyMessage">
                  {chatItem.message}
                  </p> 
                  <div className = "chatExtraContent">
                     <p className = "chatTime">{chatItem.time}</p>
                  </div>
                  </div>   
                )
                })
             }
            </ScrollToBottom> 
           </div>
           <div className = "inputSet">
               <input className = "messageInput" placeholder='Enter your message' value = {message} onChange = {(e) => setMessage(e.target.value)} />
               <button className = "chatButton" onClick = {handleSendChat}>Send</button>  
           </div>
       </div>  
   )
}

export default ChatRoom ;