 import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL=process.env.REACT_APP_BACKEND_URL;

export default function Signup() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BACKEND_URL}/signup`,
        formData,
        { withCredentials: true }
      );
      setMessage(res.data.message || "Register successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", "Shubham");

      navigate("/dashhome");
    } catch (e) {
      setMessage(e.response?.data?.message || "Register failed");
    }
  };

  const handelInput = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handelSubmit} style={styles.form}>
          <input
            value={formData.userName}
            name="userName"
            onChange={handelInput}
            placeholder="👤 Username"
            style={styles.input}
          />
          <input
            value={formData.email}
            onChange={handelInput}
            name="email"
            placeholder="📧 Email"
            style={styles.input}
          />
          <input
            value={formData.password}
            onChange={handelInput}
            name="password"
            placeholder="🔑 Password"
            type="password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            🚀 Signup
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // 👆 box upar shift
    background: "white",
    //"linear-gradient(135deg, #1e3c72, #2a5298)",
    padding: "20px",
    paddingTop: "clamp(40px, 10vh, 80px)", // 👆 responsive top spacing
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "clamp(20px, 5vw, 40px)",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "3px 7px 13px 23px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    fontSize: "clamp(22px, 6vw, 28px)",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#2a5298",
  },
  form: {
    display: "grid",
    gap: "16px",
  },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "clamp(14px, 4vw, 16px)",
    outline: "none",
    transition: "border 0.3s",
  },
  button: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #2a5298, #1e3c72)",
    color: "white",
    fontWeight: "700",
    fontSize: "clamp(15px, 4vw, 18px)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  message: {
    marginTop: "16px",
    fontSize: "clamp(13px, 3.5vw, 15px)",
    color: "#444",
  },
};
