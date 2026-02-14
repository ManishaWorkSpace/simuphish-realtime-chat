# 🚀 SimuPhish Realtime Chat

A production-grade realtime chat application built with **Next.js**, **Socket.io**, and **Redux Toolkit**, enabling seamless text and media communication with live synchronization, optimistic UI updates, and a highly interactive user experience.

Designed with scalability and realtime performance in mind, this project demonstrates modern full-stack architecture and production deployment practices.

---

## 🌐 Live Application

👉 https://simuphish-chat-production.up.railway.app

*(Hosted entirely on Railway with integrated WebSocket support.)*

---

## 🧠 Architecture Overview

This application follows a unified deployment architecture where both the frontend and WebSocket server run on the same Railway service.


### Why this architecture?

✅ Eliminates cross-domain socket issues  
✅ Simplifies deployment  
✅ Ensures low-latency communication  
✅ Reduces infrastructure complexity  
✅ Ideal for small-to-mid scale realtime applications  

---

## ✨ Core Features

### 🔥 Realtime Messaging
- Instant bi-directional communication powered by WebSockets  
- Automatic message synchronization across connected clients  
- Optimistic UI for zero perceived latency  

---

### 💬 Typing Indicators
- Live typing feedback for active conversations  
- Broadcast-based socket events for minimal overhead  

---

### 📦 Media Sharing via Cloudinary
- Drag-and-drop uploads for images and videos  
- Centralized cloud storage  
- Instant preview before sending  
- Asynchronous upload with realtime message replacement  

---

### 🔁 Message Delivery & Seen Status
- Delivered and seen event tracking  
- Status updates propagated in realtime  

---

### 👥 Online Presence
- Tracks connected users using socket mapping  
- Live online/offline updates  

---

### 💾 Persistent Draft Messages
- Unsent messages are preserved across page refreshes  
- Prevents accidental message loss  

---

### 🎯 Advanced Interaction Features
- Drag-and-forward previously sent messages (including media)
- Smooth UI transitions powered by Framer Motion
- Highly responsive chat layout

---

## 🧰 Tech Stack

### **Frontend**
- Next.js (App Router)
- TypeScript
- Redux Toolkit (state management)
- Framer Motion (animations)

### **Backend**
- Node.js
- Express
- Socket.io

### **Infrastructure**
- Railway (Full-stack hosting)
- Cloudinary (media storage)

---

## ⚡ Local Development Setup

### Clone repository

```bash
git clone https://github.com/ManishaWorkSpace/simuphish-realtime-chat.git
