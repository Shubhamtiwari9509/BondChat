 import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
         
        <div style={styles.section}>
          <h2 style={styles.logo}>📹 VideoCall</h2>
          <p style={styles.text}>
            Secure & seamless communication for everyone. Connect instantly with friends, family, and colleagues.
          </p>
        </div>

         
        <div style={styles.section}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/about" style={styles.link}>About</a></li>
            <li><a href="/features" style={styles.link}>Features</a></li>
            <li><a href="/signup" style={styles.link}>Signup</a></li>
            <li><a href="/login" style={styles.link}>Login</a></li>
          </ul>
        </div>

         
        <div style={styles.section}>
          <h3 style={styles.heading}>Contact</h3>
          <p style={styles.text}>📧 shubhamtiwari9508@gmail.com</p>
          <p style={styles.text}>📞 +91 9508612294</p>
          <p style={styles.text}>🌐 www.videocall.com</p>
        </div>
      </div>

      
      <div style={styles.bottomBar}>
        <p style={styles.copy}>© {new Date().getFullYear()} VideoCall. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "white",
    padding: "40px 20px 20px",
    marginTop: "auto",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  section: {
    flex: "1 1 250px",
    minWidth: "200px",
  },
  logo: {
    fontSize: "clamp(20px, 5vw, 28px)",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#00e676",
  },
  heading: {
    fontSize: "clamp(16px, 4vw, 20px)",
    fontWeight: "600",
    marginBottom: "10px",
    borderBottom: "2px solid rgba(255,255,255,0.3)",
    display: "inline-block",
    paddingBottom: "4px",
  },
  text: {
    fontSize: "clamp(13px, 3.5vw, 15px)",
    marginBottom: "6px",
    color: "#ddd",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "clamp(13px, 3.5vw, 15px)",
    display: "block",
    marginBottom: "6px",
    transition: "color 0.3s",
  },
  bottomBar: {
    borderTop: "1px solid rgba(255,255,255,0.3)",
    marginTop: "20px",
    paddingTop: "10px",
    textAlign: "center",
  },
  copy: {
    fontSize: "clamp(12px, 3vw, 14px)",
    color: "#ccc",
  },
};