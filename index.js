const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const host = '0.0.0.0';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://ec2-16-171-40-217.eu-north-1.compute.amazonaws.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


app.get('/test', (req, res) => {
  console.log("TEST API CALLED");
  res.send('Hello, world!');
});

server.listen(3000,host, () => { 
  console.log("SERVER RUNNING ON PORT 3000....test.... updated ..new.");
});
