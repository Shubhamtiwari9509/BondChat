 import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DashHome from "./dashboard/DashHome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Dashboard from "./dashboard/Dashboard";
import ChatPage from "./dashboard/Msg";
import VideoPage from "./dashboard/VideoCall";
import DashNavbar from "./dashboard/DashNavbar";
import Profile from "./dashboard/Profile";
import DashAbout from "./dashboard/DashAbout";
import DashFeatures from "./dashboard/DashFeatures";


// Protected Route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

 
function Layout({ children }) {
  const location = useLocation();

   
 const isDashboardRoute = ["/dashhome", "/chat", "/video", "/profile","/dashabout","/dashfeatures"].includes(location.pathname);


  return (
    <>
      {isDashboardRoute ? <DashNavbar /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />

          {/* Protected routes */}
          <Route
            path="/dashhome"
            element={
              <ProtectedRoute>
                <DashHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashhome"
            element={
              <ProtectedRoute>
                <DashHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video"
            element={
              <ProtectedRoute>
                <VideoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashfeatures"
            element={
              <ProtectedRoute>
                <DashFeatures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashabout"
            element={
              <ProtectedRoute>
                <DashAbout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

