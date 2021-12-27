const http = require('http')
const express = require('express')
const multer = require('multer')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const UserRoute = require('./routes/users')
const AuthRoute = require('./routes/auth')
const FriendRoute = require('./routes/friends')
const MessageRoute = require('./routes/messages')
const ConversationRoute = require('./routes/conversations')
const errorHandler = require('./middlewares/errorhandler')
const app = express();
const server = http.createServer(app)
const io = socketio(server)


dotenv.config()
app.use(express.static('./public'));
app.use(express.json())

//routes
app.use("/api/v1/auth", AuthRoute)
app.use("/api/v1/users", UserRoute)
app.use("/api/v1/friends", FriendRoute)
app.use("/api/v1/conversations", ConversationRoute)
app.use("/api/v1/messages", MessageRoute)
  
let users = [];
const getUserId = (friend_Id) => {
    return users.find((user) => user.userId === friend_Id);
  };
//socket io  
io.on('connection', (socket)=>{
    // console.log(`user connected with socket ID: ${socket.id}`)
    
    socket.on('addUser', (userId)=>{
        const socket_id = socket.id
        // console.log(userId)
        if(users.some((user)=> user.userId === userId)){  
        }else{
            users.push({ userId, socketId: socket_id })
        }
        // console.log(users)
    }) 
    
    
    socket.on("is_typing", (data)=>{
        const friendId = data.receiverId
        const currentFriend = getUserId(friendId);
        const msg = "typing"
        io.to(currentFriend.socketId).emit('user_typing', {message: msg})
    })  

 
    socket.on("chat_message", (data)=>{
         const friendId = data.receiverId
         const currentFriend = getUserId(friendId);
        io.to(currentFriend.socketId).emit('getMessage', {
            message : data.message
        })
        
        
        
           
    })
    // disconnect from server
    socket.on("disconnect", ()=>{
        console.log(`user with socket id: ${socket.id}  has disconnected`)
        //clear the user from the users array where this socket id exist
        users = users.filter((user) => user.socketId !== socket.id);
        // console.log(users)
    })
})

//error handling middleware
app.use(errorHandler)

// strt the server only when the database is connected..
const startServer = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected")
    server.listen(4000, ()=>{
        console.log("server started on port 4000")
    })
   
    
}

startServer()
 