 import React from "react";

export default function Features() {
  const features = [
    { icon: "🔒", title: "Secure Rooms", text: "Password-protected calls for complete privacy." },
    { icon: "📱", title: "Mobile Friendly", text: "Responsive design that works on any device." },
    { icon: "🎥", title: "Video Overlay", text: "WhatsApp-style video interface for easy calls." },
    { icon: "💬", title: "Instant Messaging", text: "Chat while you’re on a video call." },
    { icon: "🌐", title: "Global Access", text: "Connect with anyone, anywhere in the world." }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✨ Features</h2>
      <div style={styles.grid}>
        {features.map((f, i) => (
          <div key={i} style={styles.card}>
            <span style={styles.icon}>{f.icon}</span>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardText}>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    textAlign: "center",
    background: "white",
    //"linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: "clamp(22px, 5vw, 32px)",
    fontWeight: "700",
    marginBottom: "30px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", // smaller min for mobiles
    gap: "20px",
    width: "100%",
    maxWidth: "1000px"
  },
  card: {
    background:  "rgba(255,255,255,0.12)",
    borderRadius: "18px",
    padding: "clamp(14px, 4vw, 24px)",
    textAlign: "center",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer"
  },
  icon: {
    fontSize: "clamp(26px, 7vw, 40px)",
    marginBottom: "12px"
  },
  cardTitle: {
    fontSize: "clamp(15px, 4vw, 20px)",
    fontWeight: "600",
    marginBottom: "8px"
  },
  cardText: {
    fontSize: "clamp(13px, 3.5vw, 16px)",
    color: "black",
    //"#f0f0f0",
    lineHeight: "1.6"
  }
};