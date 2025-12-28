import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import InterviewerDashboard from "./pages/InterviewerDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import { useEffect } from "react";
import api from "./api/api";
export default function App() {
  useEffect(() => {
  api.get("/")
    .then(res => console.log("Backend says:", res.data))
    .catch(err => console.error("Backend error:", err));
}, []);
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interviewer/dashboard"
          element={
            <ProtectedRoute>
              <InterviewerDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}
