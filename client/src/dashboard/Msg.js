 import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const socket = io(BACKEND_URL);

export default function Msg() {
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Guest");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get(`${BACKEND_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      if (res.data?.userName) {
        setUserName(res.data.userName);
        localStorage.setItem("userName", res.data.userName);
      }
    })
    .catch(err => console.error("Profile fetch error:", err));
  }, []);

  useEffect(() => {
    if (!joined) return;

    socket.emit("join-room", { roomId: room, userName, password });

    socket.on("join-error", (data) => {
      setError(data.message);
      setJoined(false);
    });

    socket.on("joined", () => {
      setError("");
    });

    socket.on("new-msg", (data) => {
      const isSelf = data.senderId === socket.id;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: data.message,
          sender: isSelf ? "You" : data.userName || data.senderId,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: data.status || "sent",
          isSelf,
        },
      ]);
    });

    return () => {
      socket.off("join-error");
      socket.off("joined");
      socket.off("new-msg");
    };
  }, [joined, room, userName, password]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("new-msg", {
      message,
      senderId: socket.id,
      userName,
      roomId: room,
      status: "sent",
    });

    setMessage("");
  };

  return (
    <div style={styles.container}>
      {!joined ? (
        <div style={styles.joinCard}>
          <h2 style={styles.title}>💬 Join Chat Room</h2>
          <div style={{ display: "grid", gap: 12 }}>
            <input value={room} onChange={e => setRoom(e.target.value)} placeholder="Room name" style={styles.input} />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={styles.input} />
            <button
              onClick={() => {
                if (!room || !password) return setError("Room and password required");
                setError("");
                setJoined(true);
              }}
              style={styles.button}
            >
              🚀 Join Room as {userName}
            </button>
            {error && <div style={styles.error}>{error}</div>}
          </div>
        </div>
      ) : (
        <div style={styles.chatBox}>
          <div style={styles.header}>Chat Room: {room}</div>
          <div style={styles.messages}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                display: "flex",
                justifyContent: msg.isSelf ? "flex-end" : "flex-start",
                marginBottom: 8
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "8px 12px",
                  borderRadius: 16,
                  background: msg.isSelf ? "#bbdefb" : "#fff",
                  border: msg.isSelf ? "none" : "1px solid #90caf9",
                  fontSize: "clamp(12px, 3.5vw, 14px)",
                  lineHeight: 1.3,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ fontWeight: "600", fontSize: "clamp(11px, 3vw, 13px)", marginBottom: 2, color: "#2a5298" }}>
                    {msg.sender}
                  </div>
                  <div>{msg.text}</div>
                  <div style={{ fontSize: "clamp(10px, 2.5vw, 12px)", textAlign: "right", marginTop: 4, color: "#555" }}>
                    {msg.time} {msg.isSelf && (msg.status === "sent" ? "✓" : "✓✓")}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMsg} style={styles.inputArea}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={styles.msgInput}
            />
            <button type="submit" style={styles.button}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "system-ui",
    width: "100%",
    height: "100vh",
    background: "#e3f2fd",
    display: "flex",
    alignItems: "center",   
    justifyContent: "center"  
  },
  joinCard: {
    background: "white",
    borderRadius: 12,
    padding: "clamp(16px, 5vw, 24px)",
    width: "95%",
    maxWidth: 400,
    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
    // marginTop:"10px"
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: "clamp(18px, 5vw, 22px)"
  },
  chatBox: {
    background: "white",
    borderRadius: 12,
    width: "95%",
    maxWidth: 500,
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
    overflow: "hidden",
    marginBottom:"30px"
  },
  header: {
    background: "#2a5298",
    color: "white",
    padding: "10px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "clamp(14px, 4vw, 16px)"
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    background: "#f9f9f9"
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ccc",
    background: "#f0f0f0",
    padding: "8px"
  },
  msgInput: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    fontSize: "clamp(13px, 4vw, 15px)",
    borderRadius: 6
  },
  input: {
    padding: "12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: "clamp(14px, 4vw, 16px)",
    outline: "none"
  },
  button: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    background: "#2a5298",
    color: "white",
    fontSize: "clamp(13px, 4vw, 15px)",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s"
  },
  error: {
    color: "crimson",
    textAlign: "center",
    fontSize: "clamp(12px, 3.5vw, 14px)"
  }
};