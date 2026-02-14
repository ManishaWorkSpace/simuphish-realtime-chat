# 🚀 SimuPhish Realtime Chat

A production-grade realtime chat application built with **Next.js**, **Socket.io**, and **Redux Toolkit**, enabling seamless text and media communication with live synchronization, optimistic UI updates, and a highly interactive user experience.

Designed with scalability, low-latency communication, and modern cloud deployment practices, this project reflects real-world full-stack architecture used in realtime applications.

---

## 🌐 Live Application

👉 **Frontend (Vercel):**  
[https://your-vercel-app.vercel.app](https://simuphish-realtime-chat.vercel.app/)

👉 **Realtime Socket Server (Railway):**  
https://simuphish-chat-production.up.railway.app  

---

## 🧠 Architecture Overview

This application follows a **distributed realtime architecture**, separating the frontend from the WebSocket server to support persistent connections and production scalability.

```
Client (Browser)
      ↓
Next.js Frontend (Vercel)
      ↓
Socket.io Server (Railway)
      ↓
Cloudinary (Media Storage)
```

---

### ✅ Why this architecture?

- Serverless platforms like Vercel are not optimized for long-lived WebSocket connections  
- Railway provides persistent infrastructure ideal for realtime servers  
- Independent deployments improve scalability  
- Reduces risk of socket disconnects  
- Mirrors architecture used in modern production chat systems  

---

## ✨ Core Features

### 🔥 Realtime Messaging
- Real-time text and media messaging via WebSockets  
- Instant bi-directional communication  
- Automatic message synchronization across clients  
- Optimistic UI for near-zero perceived latency  

---


### 📦 Cloud-Based Media Sharing
- Seamless drag-and-drop media uploads centralized through Cloudinary  
- Instant preview before sending  
- Asynchronous uploads with realtime message replacement  
- Optimized cloud delivery for images and videos  

---

### 🔁 Message Delivery & Seen Status
- Real-time delivered and seen event tracking  


---

### 💾 Persistent Draft Messages
- Persist unsent input text across page refreshes  
- Prevent accidental message loss  

---

### 🎯 Advanced Interaction Features
- Drag-and-forward previously sent messages (including images and videos)  
- Smooth UI transitions powered by Framer Motion  
- Fluid and responsive chat experience  
- Consistent state management with realtime synchronization  

---

## 🧰 Tech Stack

### **Frontend**
- Next.js (App Router)  
- TypeScript  
- Redux Toolkit  
- Framer Motion  

---

### **Backend**
- Node.js  
- Express  
- Socket.io  

---

### **Infrastructure**
- **Vercel** — Frontend hosting with global CDN  
- **Railway** — Persistent WebSocket server  
- **Cloudinary** — Media storage and delivery  

---

## 📁 Project Structure

```
simuphish-realtime-chat/
│
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/        # Reusable UI components
│   ├── features/          # Redux slices
│   ├── services/          # Socket & Cloudinary integrations
│   ├── store/             # Redux store configuration
│   └── utils/             # Helper utilities
│
├── server.js              # Express + Socket.io server
├── public/
├── package.json
└── README.md
```

---

## ⚡ Local Development Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ManishaWorkSpace/simuphish-realtime-chat.git
cd simuphish-realtime-chat
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

### 4️⃣ Start the Socket Server

```bash
node server.js
```

---

### 5️⃣ Start the Frontend

```bash
npm run dev
```

---

## 🚀 Deployment Strategy

The application is deployed using a **split infrastructure model**:

### ✅ Frontend → Vercel
- Global CDN  
- Fast edge delivery  
- Automatic CI/CD  

### ✅ WebSocket Server → Railway
- Persistent connections  
- Stable socket sessions  
- Ideal for realtime workloads  

This architecture ensures high performance while maintaining deployment flexibility.

---

## 🧩 Key Engineering Highlights

- Distributed realtime architecture  
- Event-driven communication  
- Optimistic UI updates  
- Drag-based message forwarding  
- Cloud-based media pipeline  
- Persistent client-side drafts  
- Production-ready deployment strategy  

---

## 📈 Future Enhancements

- Database integration (PostgreSQL / MongoDB)  
- Authentication (JWT / OAuth)  
- Group chat support  
- Push notifications  
- Horizontal socket scaling with Redis  
- End-to-end encryption  

---

## 👩‍💻 Author

**Manisha Yadav**  
Frontend / Realtime Engineer  

GitHub:  
👉 https://github.com/ManishaWorkSpace  

---

⭐ If you found this project interesting, consider giving it a star!
