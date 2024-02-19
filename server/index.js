const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const { Server } = require("socket.io")
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{ //server is express server
    cors : {
        origin : "https://chat-app-one-way.netlify.app/",
        methods: ["GET","POST"],
    },
})

io.on("connection", (socket) =>{ //check if frontend server is connected with Socket.io
    console.log(`USER CONNECTED : ${socket.id}`);

    socket.on("join_room",(data) =>{
        socket.join(data)
        console.log(`User with Id : ${socket.id} Joined a Room : ${data}`)
    })

    socket.on("send_message", (data) =>{
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect", () =>{
        console.log("USER DISCONNECTED", socket.id);
    })
})


server.listen(3001, () => {
    console.log("Server Running")
})

// CORS is a mechanism that ensures secure cross-origin communication by controlling access to server resources from different domains.