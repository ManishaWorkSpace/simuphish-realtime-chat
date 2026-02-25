🚀 SimuPhish — Realtime Chat Platform

A production-ready realtime chat platform built with Next.js, Socket.io, and Redux Toolkit, delivering low-latency communication, optimistic UI updates, and seamless media sharing through a distributed architecture.

Designed with scalability and real-world infrastructure patterns in mind, this project reflects modern full-stack engineering practices used in realtime systems.

🌐 Live Application

Frontend (Vercel)
👉 https://simuphish-realtime-chat.vercel.app/

Realtime WebSocket Server (Railway)
👉 https://simuphish-chat-production.up.railway.app

🧠 Architecture Overview

This project uses a distributed realtime architecture, separating the frontend from the persistent WebSocket server.

Client (Browser)
      ↓
Next.js Frontend (Vercel)
      ↓
Socket.io Server (Railway)
      ↓
Cloudinary (Media Storage)
Why Separate Frontend & WebSocket Server?

Serverless platforms like Vercel are not optimized for long-lived WebSocket connections

Railway provides persistent infrastructure ideal for realtime workloads

Independent deployments improve scalability

Reduced socket disconnect risks

Mirrors architecture used in production chat systems

✨ Core Features
🔥 Realtime Messaging

Bi-directional WebSocket communication

Instant message synchronization across clients

Optimistic UI for near-zero perceived latency

Automatic online user tracking

📦 Cloud-Based Media Sharing

Drag-and-drop media uploads via Cloudinary

Instant preview before sending

Asynchronous upload with realtime message replacement

Optimized cloud delivery for images and videos

🔁 Delivery & Seen Tracking

Realtime delivery status updates

Seen indicators across active sessions

💾 Persistent Draft Messages

Draft messages persist across refresh

Prevents accidental message loss

🎯 Advanced Interaction

Drag-to-forward messages (text & media)

Smooth UI transitions powered by Framer Motion

Fully responsive interface

Centralized state management with Redux Toolkit

🧰 Tech Stack
Frontend

Next.js (App Router)

TypeScript

Redux Toolkit

Framer Motion

Tailwind CSS

Backend

Node.js

Express

Socket.io

Infrastructure

Vercel — Frontend hosting with global CDN

Railway — Persistent WebSocket server

Cloudinary — Media storage and optimization

⚡ Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/ManishaWorkSpace/simuphish-realtime-chat.git
cd simuphish-realtime-chat
2️⃣ Install Dependencies
npm install
3️⃣ Configure Environment Variables

Create .env.local:

NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
4️⃣ Start Backend Server
node server.js
5️⃣ Start Frontend
npm run dev
🚀 Production Deployment Strategy

This application uses a split infrastructure model:

Frontend → Vercel

Global CDN

Edge-optimized static delivery

Automatic CI/CD

WebSocket Server → Railway

Persistent connections

Stable session handling

Optimized for realtime workloads

Environment Variables (Production)

On Vercel:

NEXT_PUBLIC_SOCKET_URL=https://simuphish-chat-production.up.railway.app

On Railway:

PORT=process.env.PORT

The backend dynamically binds to the Railway-assigned port to prevent 502 errors.

🧩 Engineering Highlights

Distributed realtime architecture

Event-driven socket communication

Optimistic UI updates

In-memory online user tracking

Cloud-based media pipeline

Persistent draft handling

Production-grade deployment separation

📈 Future Enhancements

Database integration (PostgreSQL / MongoDB)

Authentication (JWT / OAuth)

Group chat support

Push notifications

Horizontal scaling using Redis adapter

End-to-end encryption

👩‍💻 Author

Manisha Yadav
Frontend & Realtime Engineer

GitHub
👉 https://github.com/ManishaWorkSpace

⭐ If you found this project interesting, consider giving it a star!