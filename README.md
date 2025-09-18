# 📨 SyncTalk

**SyncTalk** is a real-time chat application built with the **MERN stack + Socket.IO**, supporting **direct messaging** and **group channels**, file sharing, and user profile customization.  

---

## 🚀 Features

### 🔐 Authentication & Security
- User signup/login with **JWT authentication** stored in **httpOnly cookies**.
- Passwords hashed securely with **bcrypt**.
- Protected API routes with an **Auth middleware**.
- CORS configured for safe client-server communication.

### 👤 User Profiles
- Profile setup with **avatar upload** using Multer.
- Avatars served from `/uploads/profiles`.
- Profile images can be updated or removed.

### 💬 Messaging
- **Direct Messages (DMs):**
  - One-to-one conversations.
  - Contact list automatically sorted by **most recent message**.
- **Group Channels:**
  - Users can create groups with multiple members.
  - Real-time **channel messaging** powered by Socket.IO.
  - Channel history persists in MongoDB.
  - Group messages show **sender name, avatar, and timestamp**.

### 📎 File Sharing
- Send **files or images** in both DMs and group chats.
- Files stored on server under `/uploads/files`.
- Download option for other file types.

### ⚡ Real-Time Communication
- **Socket.IO** for instant message delivery.
- Online users tracked with **user-to-socket mapping**.
- Separate handling for **DMs** and **Channel messages**.

### 🖥️ Frontend (React + Vite + TypeScript)
- Built with **React (TypeScript)** and **Vite**.
- **Recoil** used for global state management.
- **SocketContext** for easy Socket.IO integration.
- UI built with **TailwindCSS + shadcn/ui (Radix)**.
- Emoji picker and toast notifications for better UX.
- Auto-scroll to the latest message.

### 🗄️ Backend (Node.js + Express + MongoDB)
- REST API for auth, contacts, messages, and groups.
- **MongoDB + Mongoose** for data persistence.
- Models for Users, Messages, and Groups.
- Middleware for auth validation.
- Separate controllers for modular code.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite + TypeScript)
- TailwindCSS, shadcn/ui, Radix UI
- Recoil for state management
- Socket.IO client

**Backend:**
- Node.js + Express
- Socket.IO
- MongoDB + Mongoose
- Multer for file uploads
- JWT + bcrypt for auth

---

