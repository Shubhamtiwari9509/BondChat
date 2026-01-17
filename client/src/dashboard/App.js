import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ChatPage from "./Msg";
import VideoCall from "./VideoCall";

function DashboardApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/video" element={<VideoCall />} />
      </Routes>
    </Router>
  );
}

export default DashboardApp;