# 🚀 SimuPhish Realtime Chat

A production-ready realtime chat application built with **Next.js**, **Socket.io**, and **Redux Toolkit** that delivers instant messaging, typing indicators, media sharing, and live online presence.

---

## 🔥 Live Architecture

Frontend deployed on **Vercel**  
WebSocket server deployed on **Railway**

```
User → Vercel (Next.js UI) → Railway (Socket Server)
```

This separation ensures scalability, reliability, and low-latency communication.

---

## ✨ Features

✅ Realtime messaging  
✅ Typing indicators  
✅ Message delivery & seen status  
✅ Media upload via Cloudinary  
✅ Online/offline presence  
✅ Persistent chat selection  
✅ Optimistic UI updates  
✅ Auto-reconnection sockets  

---

## 🧠 Tech Stack

**Frontend**
- Next.js
- TypeScript
- Redux Toolkit
- Framer Motion

**Backend**
- Node.js
- Express
- Socket.io

**Infrastructure**
- Vercel
- Railway
- Cloudinary

---

## ⚡ Getting Started

### Clone the repo

```bash
git clone https://github.com/ManishaWorkSpace/simuphish-realtime-chat.git
```

---

### Install dependencies

```bash
npm install
```

---

### Run frontend

```bash
npm run dev
```

---

### Run socket server

```bash
cd server
node server.js
```

---

## 🌍 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

---

## 🎯 Future Improvements

- Redis adapter for horizontal scaling  
- Message persistence with database  
- Read receipts per user  
- Push notifications  
- Kubernetes-ready deployment  

---

## 👩‍💻 Author

**Manisha Yadav**

Frontend Developer passionate about building scalable realtime applications.
