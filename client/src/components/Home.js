 import React from "react";
import { Link } from "react-router-dom";  

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.hero}>
          <h1 style={styles.title}>📹 VideoCall</h1>
          <p style={styles.subtitle}>
            Connect instantly with friends & family <br />
            Secure rooms with password protection 🔒
          </p>

          <div style={styles.actions}>
            
            <Link to="/chat" style={styles.primaryBtn}>
              Messaging
            </Link>

             
            <Link to="/video" style={styles.secondaryBtn}>
              Video Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    color: "white",
    overflow: "hidden",
  },
  overlay: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  hero: {
    textAlign: "center",
    maxWidth: "500px",
    animation: "fadeIn 1s ease-in-out",
  },
  title: {
    fontSize: "clamp(28px, 6vw, 42px)",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#00e676",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "clamp(15px, 4vw, 18px)",
    marginBottom: "28px",
    lineHeight: "1.6",
    color: "#f0f0f0",
  },
  actions: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #00c853, #009624)",
    color: "white",
    border: "none",
    padding: "14px 24px",
    borderRadius: "50px",
    fontSize: "clamp(15px, 4vw, 18px)",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",  
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  secondaryBtn: {
    background: "white",
    color: "#2a5298",
    border: "none",
    padding: "14px 24px",
    borderRadius: "50px",
    fontSize: "clamp(15px, 4vw, 18px)",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",  
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
};