 import React, { useEffect, useState } from "react";
import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token",token);
    if (!token) {
      setLoading(false);
      return;
    }
 
    axios.get(`${BACKEND_URL}/profile`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  if (!user) return <p style={{ textAlign: "center" }}>No user data found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Avatar */}
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.userName}`}
          alt="avatar"
          style={styles.avatar}
        />

        {/* User Info */}
        <h2 style={styles.name}>{user.userName}</h2>
        <p style={styles.email}>📧 {user.email}</p>

        {/* Extra Info */}
        <p style={styles.info}>🗓️ Joined: {user.createdAt?.slice(0, 10)}</p>
        <p style={styles.info}>👤 Role: {user.role || "Member"}</p>
        <p style={styles.bio}>
          ✨ Bio: {user.bio || "No bio added yet. Share something about yourself!"}
        </p>

        {/* Actions */}
        <button style={styles.button}>⚙️ Edit Profile</button>
        <button style={styles.button}>🚪 Logout</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "white",
    //"linear-gradient(135deg, #1e3c72, #2a5298)",
    padding: "20px",
    paddingTop: "clamp(40px, 10vh, 80px)",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "clamp(20px, 5vw, 40px)",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  name: {
    fontSize: "clamp(22px, 6vw, 28px)",
    fontWeight: "700",
    color: "#2a5298",
    marginBottom: "8px",
  },
  email: {
    fontSize: "clamp(14px, 4vw, 16px)",
    color: "#444",
    marginBottom: "12px",
  },
  info: {
    fontSize: "clamp(13px, 3.5vw, 15px)",
    color: "#555",
    marginBottom: "8px",
  },
  bio: {
    fontSize: "clamp(13px, 3.5vw, 15px)",
    color: "#333",
    margin: "12px 0",
    fontStyle: "italic",
  },
  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #2a5298, #1e3c72)",
    color: "white",
    fontWeight: "600",
    fontSize: "clamp(14px, 4vw, 16px)",
    cursor: "pointer",
    margin: "8px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};
