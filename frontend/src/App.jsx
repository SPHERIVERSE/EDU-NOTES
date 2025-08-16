// src/App.jsx
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Levels from "./pages/Levels.jsx";
import Semesters from "./pages/Semesters.jsx";
import Subjects from "./pages/Subjects.jsx";
import Notes from "./pages/Notes.jsx";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ padding: 12, display: "flex", gap: 12, borderBottom: "1px solid #ddd" }}>
      <Link to="/">EduNotes</Link>
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>Hi, {user.name}</span>
            <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>{" | "}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <NavBar />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Levels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/level/:levelId/semesters" element={<Semesters />} />
          <Route path="/semester/:semesterId/subjects" element={<Subjects />} />
          <Route path="/subject/:subjectId/notes" element={<Notes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

