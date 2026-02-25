// Express + Socket.IO backend
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store online users in memory
let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Register user
  socket.on("register", (user) => {
    console.log("Register event from:", user.username);

    onlineUsers.set(user.username, {
      ...user,
      socketId: socket.id,
    });
 console.log("Current online users:", Array.from(onlineUsers.keys()));
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
  });

  // Send message
  socket.on("sendMessage", ({ to, message }) => {
     console.log("Sending message from:", message.from);
  const receiver = onlineUsers.get(to);

  // Send to receiver
  if (receiver) {
    console.log("Emitting to receiver:", receiver.socketId);
    io.to(receiver.socketId).emit("receiveMessage", message);
  }

  // Send back to sender
  console.log("Emitting back to sender:", socket.id);
  io.to(socket.id).emit("receiveMessage", message);
});

  socket.on("disconnect", () => {
    for (let [username, user] of onlineUsers.entries()) {
      if (user.socketId === socket.id) {
        onlineUsers.delete(username);
      }
    }
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});