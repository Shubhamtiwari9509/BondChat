 import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.dashboard}>
      <div style={styles.card}>
        <h1 style={styles.title}>📱 Messaging App</h1>
        <p style={styles.subtitle}>Choose what you want to do:</p>

        <div style={styles.options}>
          <button
            style={{ ...styles.optionBtn, ...styles.msgBtn }}
            onClick={() => navigate("/chat")}
          >
            💬 Messaging
          </button>

          <button
            style={{ ...styles.optionBtn, ...styles.videoBtn }}
            onClick={() => navigate("/video")}
          >
            🎥 Video Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
 
const styles = {
  dashboard: {
    display: "flex",
    alignItems: "flex-start",   
    justifyContent: "center",
    minHeight: "100vh",
    background: "white",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
    paddingTop: "120px",          
  },
  card: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px 20px",
    textAlign: "center",
    color: "black",
    width: "90%",                
    maxWidth: "400px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "clamp(1.5rem, 5vw, 1.8rem)", 
    marginBottom: "0.5rem",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "clamp(0.9rem, 4vw, 1rem)",   
    marginBottom: "2rem",
    opacity: 0.8,
  },
  options: {
    display: "flex",
    flexDirection: "column", 
    gap: "15px",
  },
  optionBtn: {
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    fontSize: "clamp(0.9rem, 4vw, 1rem)",    
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    color: "#fff",
    fontWeight: "500",
    width: "100%",              
  },
  msgBtn: {
    background: "linear-gradient(135deg, #ff6b6b, #ff4757)",
  },
  videoBtn: {
    background: "linear-gradient(135deg, #1dd1a1, #10ac84)",
  },
};
