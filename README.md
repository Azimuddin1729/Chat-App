# 📨 SyncTalk

**SyncTalk** is a real-time chat application built with the **MERN stack + Socket.IO**, supporting **direct messaging** and **group channels**, file sharing, and user profile customization.

---

## 🚀 Live Demo

- **App:** https://sync-talk-app.onrender.com/
- **Demo Account**
  - **Email:** `demo@gmail.com`
  - **Password:** `567341`

> Tip: Log in with the demo account to explore DMs, channels, uploads, and profile features without creating a new user.

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based auth stored in **httpOnly cookies**
- Passwords hashed with **bcrypt**
- Protected API routes via **Auth middleware**
- CORS configured for safe client–server communication

### 👤 User Profiles
- Profile setup with **avatar upload** (Multer)
- Avatars served from `/uploads/profiles`
- Replace/remove profile image anytime

### 💬 Messaging
- **Direct Messages (DMs)**
  - One-to-one conversations
  - Contact list auto-sorted by **most recent message**
- **Group Channels**
  - Create groups with multiple members
  - Real-time channel messaging (Socket.IO)
  - Persistent channel history in MongoDB
  - Sender name, avatar, and timestamp shown

### 📎 File Sharing
- Send images & files in both DMs and channels
- Files stored in `/uploads/files`
- Download button for non-image attachments

### ⚡ Real-Time
- **Socket.IO** for instant delivery
- Online presence via user↔socket mapping
- Separate flows for DM vs Channel messages

### 🖥️ Frontend (React + Vite + TypeScript)
- **React + TypeScript** with **Vite**
- **Recoil** for global state
- **SocketContext** to wire sockets cleanly
- **TailwindCSS + shadcn/ui (Radix)** components
- Emoji picker + toast notifications
- Auto-scroll to the newest message

### 🗄️ Backend (Node.js + Express + MongoDB)
- REST endpoints for auth, contacts, messages, and groups
- **MongoDB + Mongoose** models (Users, Messages, Groups)
- Controller-based, modular structure
- Multer for uploads (profile images, files)

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite, TypeScript), Recoil
- TailwindCSS, shadcn/ui, Radix UI
- Socket.IO client

**Backend**
- Node.js, Express
- Socket.IO
- MongoDB, Mongoose
- Multer, JWT, bcrypt

---

