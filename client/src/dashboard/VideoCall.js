 import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const socket = io(BACKEND_URL);

const ICE = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302"] }
  ]
};

export default function VideoCall() {
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "Guest");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);

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

    let stream;
    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;

        pcRef.current = new RTCPeerConnection(ICE);
        const pc = pcRef.current;

        pc.addTransceiver("video", { direction: "sendrecv" });
        pc.addTransceiver("audio", { direction: "sendrecv" });

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.ontrack = (event) => {
          const [remoteStream] = event.streams;
          if (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("signal", { room, payload: { candidate: event.candidate } });
          }
        };

        pc.onnegotiationneeded = async () => {
          try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit("signal", { room, payload: { offer } });
            setStatus("Sent offer");
          } catch (e) {
            console.warn("Negotiation error:", e);
          }
        };

        socket.emit("join-room", { roomId: room, userName, password });
        setStatus("Joining room…");
      } catch (err) {
        console.error("getUserMedia error:", err);
        setError("Camera/Mic permission required");
      }
    }
    start();

    socket.on("join-error", (msg) => {
      setError(msg.message || msg);
      setStatus("Error");
    });

    socket.on("joined", ({ peerCount }) => {
      setStatus(peerCount === 1 ? "Waiting for peer…" : "Peer connected");
    });

    socket.on("peer-joined", async () => {
      try {
        const pc = pcRef.current;
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("signal", { room, payload: { offer } });
        setStatus("Sent offer (peer-joined)");
      } catch (e) {
        console.warn("Offer send error:", e);
      }
    });

    socket.on("signal", async ({ from, payload }) => {
      const pc = pcRef.current;
      try {
        if (payload.offer) {
          await pc.setRemoteDescription(payload.offer);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("signal", { room, payload: { answer }, targetId: from });
          setStatus("Received offer, sent answer");
        } else if (payload.answer) {
          await pc.setRemoteDescription(payload.answer);
          setStatus("Connected");
        } else if (payload.candidate) {
          await pc.addIceCandidate(payload.candidate);
        }
      } catch (e) {
        console.warn("Signal handling error:", e);
      }
    });

    socket.on("peer-left", () => {
      setStatus("Peer left");
      remoteVideoRef.current.srcObject = null;
    });

    return () => {
      socket.emit("leave-room", { roomId: room });
      socket.off("join-error");
      socket.off("joined");
      socket.off("peer-joined");
      socket.off("signal");
      socket.off("peer-left");
      if (pcRef.current) pcRef.current.close();
    };
  }, [joined]);

  return (
    <div style={styles.container}>
      {!joined ? (
        <div style={styles.joinCard}>
          <h2 style={styles.title}>📹 Join Video Call</h2>
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
        <>
          {/* Receiver video fullscreen */}
          <video ref={remoteVideoRef} autoPlay playsInline style={styles.remoteVideo} />
          {/* Sender video overlay */}
          <video ref={localVideoRef} autoPlay playsInline muted style={styles.localVideo} />
          {/* Status bar */}
          <div style={styles.statusBar}>{status}</div>
          {/* Leave button */}
          <button onClick={() => setJoined(false)} style={styles.leaveButton}>❌</button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "system-ui",
    width: "100vw",
    height: "100vh",
    background: "#fff",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  joinCard: {
    background: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    boxShadow: "0 6px 16px rgba(0,0,0,0.3)"
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: "clamp(18px, 5vw, 22px)"
  },
  input: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 15,
    outline: "none"
  },
  button: {
    padding: "12px",
    borderRadius: 8,
    border: "none",
    background: "#2a5298",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s"
  },
  error: {
    color: "crimson",
    textAlign: "center",
    fontSize: "clamp(12px, 3.5vw, 14px)"
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    background: "#000"
  },
  localVideo: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: "30vw",
    maxWidth: "140px",
    aspectRatio: "3/4",
    borderRadius: 12,
    border: "2px solid #2a5298",
    objectFit: "cover",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
  },
    statusBar: {
    position: "absolute",
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: "clamp(12px, 3vw, 14px)",
    textAlign: "center",
    minWidth: "120px"
  },
  leaveButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: 56,
    height: 56,
    fontSize: 20,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};