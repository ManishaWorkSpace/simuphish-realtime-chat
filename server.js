import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/*
🔥 userId -> socketId
Much better than storing socket ids directly
*/
let onlineUsers = new Map();

const replies = [
 "Interesting 🙂 tell me more!",
  "Got it 👍 what happened next?",
  "Hmm... I'm listening 👀",
  "That sounds important.",
  "Okay 🙂 I'm following you.",
  "I see! Go on...",
  "Alright 👍 continue.",
  "Oh really? 😮",
  "What made you think that?",
  "How did that turn out?",
  "And then what happened?",
  "Wait — tell me more about that!",
  "Now you’ve got my attention 👀",
];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Register user
  socket.on("register-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  // ✅ Send message
  socket.on("send-message", (message) => {
    io.emit("receive-message", message);

    // 🔥 Fake bot reply
    setTimeout(() => {
      const botReply = {
        id: crypto.randomUUID(), // ⭐ NO MORE DUPLICATE KEY ERRORS
        text: replies[Math.floor(Math.random() * replies.length)],
        senderId: "bot",
        chatId: message.chatId,
        timestamp: Date.now(),
      };

      io.emit("receive-message", botReply);
    }, 1000);
  });

  // ✅ Typing
  socket.on("typing", (chatId) => {
    socket.broadcast.emit("user-typing", chatId);
  });

  socket.on("send-message", (message) => {

  io.emit("receive-message", {
    ...message,
    status: "delivered",
  });

  io.emit("message-delivered", { id: message.id });

  setTimeout(() => {
    io.emit("message-seen", { id: message.id });
  }, 1200);
});


  // ✅ Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (let [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
});

server.listen(PORT, () => {
  console.log("🚀 Socket server running on port", PORT);
});
