import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export default function DashHome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.container}>
       
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Hi {user ? user.userName : "Guest"} 👋
        </h1>
        <p style={styles.subtitle}>Choose how you want to connect:</p>
      </div>

      
      <div style={styles.options}>
        <Link to="/chat" style={{ ...styles.card, ...styles.messageCard }}>
          <span style={styles.icon}>💬</span>
          <h2 style={styles.cardTitle}>Messaging</h2>
          <p style={styles.cardText}>Send instant messages with ease.</p>
        </Link>

        <Link to="/video" style={{ ...styles.card, ...styles.videoCard }}>
          <span style={styles.icon}>🎥</span>
          <h2 style={styles.cardTitle}>Video Call</h2>
          <p style={styles.cardText}>Start a secure video call instantly.</p>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
  hero: {
    background: "rgba(0,0,0,0.5)",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "40px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#eee",
  },
  options: {
    marginTop: "15px",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: "800px",
  },
  card: {
    flex: "1 1 250px",
    background: "white",
    color: "#333",
    borderRadius: "12px",
    padding: "20px",
    textDecoration: "none",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  messageCard: {
    borderTop: "6px solid #2a5298",
  },
  videoCard: {
    borderTop: "6px solid #00c853",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  cardText: {
    fontSize: "15px",
    color: "#555",
  },
};