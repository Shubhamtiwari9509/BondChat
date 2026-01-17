import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashHome from "./DashHome";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  
    navigate("/login");                
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>📹 VideoCall</div>

       
      <button onClick={() => setOpen(!open)} style={styles.hamburger}>
        {open ? "✖" : "☰"}
      </button>

       
      <div style={{ ...styles.links, ...(open ? styles.linksOpen : {}) }}>
        <Link to="/dashhome" style={styles.link}>Home</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/dashabout" style={styles.link}>About</Link>
        <Link to="/dashfeatures" style={styles.link}>Features</Link>

         
        <button onClick={handleLogout} style={styles.linkBtn}>
          Logout
        </button>
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
  linkBtn: {
    background: "none",
    border: "none",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "0.3s",
  },
};