import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const rooms = {}; // { roomId: { password, users:Set() } }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-video-room", ({ roomId, password }) => {
    if (!roomId || !password) return;

    if (!rooms[roomId]) {
      rooms[roomId] = { password, users: new Set() };
    }

    if (rooms[roomId].password !== password) {
      socket.emit("video-error", { message: "❌ Wrong password" });
      return;
    }

    rooms[roomId].users.add(socket.id);
    socket.join(roomId);

    // Notify existing users
    socket.to(roomId).emit("user-joined", socket.id);

    // Send list of existing users to new user
    const existingUsers = [...rooms[roomId].users].filter((id) => id !== socket.id);
    socket.emit("existing-users", existingUsers);

    // Handle signaling
    socket.on("signal", ({ to, data }) => {
      io.to(to).emit("signal", { from: socket.id, data });
    });

    socket.on("disconnect", () => {
      if (rooms[roomId]) {
        rooms[roomId].users.delete(socket.id);
        if (rooms[roomId].users.size === 0) delete rooms[roomId];
      }
      socket.to(roomId).emit("user-left", socket.id);
    });
  });
});

server.listen(8080, () => console.log("🚀 Server running on http://localhost:8080"));