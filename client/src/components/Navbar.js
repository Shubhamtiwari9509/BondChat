 import React, { useState } from "react";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>📹 VideoCall</div>

      
      <button onClick={() => setOpen(!open)} style={styles.hamburger}>
        {open ? "✖" : "☰"}
      </button>

      
      <div style={{ ...styles.links, ...(open ? styles.linksOpen : {}) }}>
        <Link to="/" style={styles.link}>Home</Link>

         
        <a href={`${BACKEND_URL}/login`} style={styles.link}>Login</a>
        <a href={`${BACKEND_URL}/signup`} style={styles.link}>Signup</a>

        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/features" style={styles.link}>Features</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontWeight: "700",
    fontSize: "20px",
  },
  hamburger: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "none",  
  },
  links: {
    display: "flex",
    gap: "16px",
  },
  linksOpen: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "60px",
    left: 0,
    right: 0,
    background: "#2a5298",
    padding: "12px",
    borderRadius: "0 0 8px 8px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "0.3s",
  },
};