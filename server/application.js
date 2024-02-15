const express = require('express') ;
const app = express() ;
const chatApp = express() ;
const http = require('http') ;
const mainServer = http.createServer(app) ;
const chatServer = http.createServer(chatApp) ;
const cors = require('cors') ;
const {Server} = require('socket.io') ;
const path = require('path') ;
const corsOptions = {
    "origin":"https://kb787.github.io/sample-chat-app/" 
}
const io = new Server(chatServer,{
    cors: {
      origin: "https://kb787.github.io/sample-chat-app/",
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  }) ;

io.on("connection",(socket) => {
    console.log(socket.id) ;

    socket.on("join_room",(data) => {
       socket.join(data) ;
       console.log(`User with id : ${socket.id} joined room ${data}`)  
    }
    )

    socket.on("send_message",(data) => {
        socket.to(data.room).emit("recieve_message",data) ;
    }
    )

    socket.on("disconnect", () => {
         console.log("User disconnected",socket.id) ;
    })
})

app.use(express.json()) ;
app.use(cors(corsOptions)) ;
chatApp.use(express.json()) ;
app.use(express.static(path.join(__dirname,'D:/internship-task-chatty/client/build'))) ;
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"D:/internship-task-chatty/client/build/index.html")) ;
})



mainServer.listen("3500", () => {
      console.log("App launched Successfully") ;
})
chatServer.listen("4000",() => {
    console.log("Chat server is running") ;
})