import {useState,useEffect} from 'react' ;

const ChatRoom = (socket,username,room) => {
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
         setMessage('') ;
         await socket.emit("send_message", messageData);
         setMessage((list) => [...list, messageData]);
         setChats("");
   }
   return (
      <div className = "MainContainer">
           <p className = "chatRoomHeading">Welcome to your chat-room</p> 
           <div className = "inputSet">
               <input className = "messageInput" placeholder='Enter your message' value = {message} onChange = {(e) => setMessage(e.target.value)} />
               <button className = "chatButton" onClick = {handleSendChat}>Send</button>  
           </div>
       </div>  
   )
}

export default ChatRoom ;