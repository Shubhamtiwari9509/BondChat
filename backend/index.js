 import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

 
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
 
app.use("/", authRoutes);

 
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" MongoDB connected successfully");
  } catch (e) {
    console.error(" MongoDB connection error:", e);
  }
}
main();

 
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

 
const rooms = new Map();

io.on("connection", (socket) => {
   
  socket.on("join-room", ({ roomId, userName, password }) => {
    if (!roomId || !password) {
      socket.emit("join-error", { message: "Room name or password missing" });
      return;
    }

    if (!rooms.has(roomId)) {
      rooms.set(roomId, { password, users: new Set() });
    }

    const info = rooms.get(roomId);

    if (info.password !== password) {
      socket.emit("join-error", { message: "Wrong password" });
      return;
    }

    info.users.add(socket.id);
    socket.join(roomId);

    console.log(`${userName} joined room: ${roomId}`);
    socket.emit("joined", { peerCount: info.users.size });
    socket.to(roomId).emit("peer-joined", { socketId: socket.id, userName, roomId });
  });
 
  socket.on("new-msg", ({ roomId, message, senderId, userName, status }) => {
    if (!roomId || !message) return;
    io.to(roomId).emit("new-msg", {
      message,
      senderId,
      userName,
      status: status || "sent"
    });
  });

 
  socket.on("signal", ({ room, payload, targetId }) => {
    if (!room) return;
    if (targetId) {
      io.to(targetId).emit("signal", { from: socket.id, payload });
    } else {
      socket.to(room).emit("signal", { from: socket.id, payload });
    }
  });
 
  socket.on("leave-room", ({ roomId }) => {
    if (!roomId) return;
    if (rooms.has(roomId)) {
      const info = rooms.get(roomId);
      info.users.delete(socket.id);
      socket.leave(roomId);
      socket.to(roomId).emit("peer-left", { socketId: socket.id });
      if (info.users.size === 0) rooms.delete(roomId);
    }
  });
 
  socket.on("disconnect", () => {
    for (const [roomId, info] of rooms) {
      if (info.users.delete(socket.id)) {
        socket.to(roomId).emit("peer-left", { socketId: socket.id });
        if (info.users.size === 0) rooms.delete(roomId);
      }
    }
  });
});
 
server.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});