import io from 'socket.io-client' ;
import ChatRoom from '../Chatting/ChatRoom';
import { useState } from 'react';
const socket = io.connect("http://localhost:4000") ;
const Homepage = () => {
    const [username,setUsername] = useState('') ;
    const [room,setRoom] = useState(25) ;
    const [showChats,setShowChats] = useState(false) ;

    const joinRoom = () => {
        if(username !== "")
        {
            socket.emit("join_room",room) ;
            setShowChats(true) ;
        }
    }
    return (
        <div className = "MainContainer">
        <h3 className = "homepageHeading">Welcome to Chatty your all time favourite messenger</h3>  
        <div className = "featureCollection">
            <div className = "featureCollectionItem">
                <p className = "featureItemParagraph">
                    User Friendly Interface
                </p>
            </div>
            <div className = "featureCollectionItem">
                <p className = "featureItemParagraph">
                    Multiple User Connectivity
                </p>
            </div>
            <div className = "featureCollectionItem">
                <p className = "featureItemParagraph">
                     Quick Chatting
                </p>
            </div>
        </div>  
        <p className = "advertisementParagraph">
        Are you tired of complicated chat apps that take forever to load and drain your battery? Say hello to Chatty - the simple, fast, and fun way to stay connected!
        </p>
        <p className = "advertisementParagraph">
        🚀  Fast & Efficient: Chatty is designed with speed and efficiency in mind. Send messages instantly, without any lag!
        </p>  

         {!showChats ? (
          <div className="joinChatContainer">
            <h3 className = "joinChatHeading">Join A Chat</h3>
            <input
              type="text"
              placeholder="Enter your username"
              className="chatInputForm"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <button onClick={joinRoom} className = "joiningButton">Join A Room</button>
          </div>
        ) : (  
          <ChatRoom socket={socket} username={username} room={room} />
        )}
        </div>
    )
}

export default Homepage ;