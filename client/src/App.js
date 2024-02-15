import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/Chatting/ChatRoom';
import Homepage from './components/Homepage/Homepage';
import {BrowserRouter,Routes,Route} from 'react-router-dom' ;
function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Routes> 
       <Route path = "/ChatRoom" element =  {<ChatRoom/>}/>
       <Route path = "/" element = {<Homepage/>} /> 
       <Route path = "/sample-chat-app" element = {<Homepage/>} />
      </Routes> 
    </BrowserRouter>  
    </div>
  );
}

export default App;
