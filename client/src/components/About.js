 import React from "react";

export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>About Us</h2>
        <p style={styles.text}>
          Welcome to <strong>VideoCall</strong>, your trusted platform for secure and seamless
          communication. In today’s fast‑paced digital world, staying connected with loved ones,
          colleagues, and communities has become more important than ever. Our mission is to make
          video calling simple, reliable, and safe for everyone — whether you’re catching up with
          friends, hosting a virtual meeting, or collaborating on a project.
        </p>

        <p style={styles.text}>
          Unlike ordinary chat apps, VideoCall is designed with <strong>privacy and security</strong>
          at its core. Every room is protected with a unique password, ensuring that only the people
          you invite can join your conversation. We believe that your personal moments deserve
          complete confidentiality, and that’s why we use modern encryption standards to safeguard
          your calls.
        </p>

        <p style={styles.text}>
          Our app is built to be <strong>mobile‑friendly</strong> and lightweight, so you can connect
          instantly without worrying about heavy downloads or complicated setups. The interface is
          inspired by popular messaging apps, offering a familiar and intuitive experience. With
          responsive design, VideoCall adapts beautifully to any screen size — from smartphones to
          desktops — making it easy to stay connected wherever you are.
        </p>

        <p style={styles.text}>
          We are constantly working to improve the platform by adding new features such as group
          calls, screen sharing, and interactive chat bubbles. Our vision is to create a digital
          space where communication feels natural, engaging, and secure. Whether you’re a student
          attending online classes, a professional managing remote meetings, or a family member
          reaching out across distances, VideoCall is here to make those connections meaningful.
        </p>

        <p style={styles.text}>
          Thank you for choosing VideoCall. Together, let’s build a world where technology brings us
          closer, strengthens relationships, and empowers collaboration.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "smoke-white",
    //"linear-gradient(135deg, #1e3c72, #2a5298)",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "clamp(16px, 4vw, 32px)", 
    maxWidth: "900px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  title: {
    fontSize: "clamp(22px, 5vw, 32px)",  
    fontWeight: "700",
    marginBottom: "20px",
    color: "#2a5298",
  },
  text: {
    fontSize: "clamp(14px, 3.5vw, 18px)",  
    marginBottom: "16px",
    color: "#444",
    lineHeight: "1.7",
  },
};