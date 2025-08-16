import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Levels from "./pages/Levels.jsx";
import Semesters from "./pages/Semesters.jsx";
import Subjects from "./pages/Subjects.jsx";
import Notes from "./pages/Notes.jsx";

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Levels />} />
            <Route path="/level/:levelId/semesters" element={<Semesters />} />
            <Route path="/semester/:semesterId/subjects" element={<Subjects />} />
            <Route path="/subject/:subjectId/notes" element={<Notes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}
