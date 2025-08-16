// src/api.js
const API = import.meta.env.VITE_API_URL;

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function post(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function get(path) {
  const res = await fetch(`${API}${path}`, { headers: { ...authHeaders() } });
  if (!res.ok) throw await res.json();
  return res.json();
}

// Auth
export const api = {
  register: (data) => post("/auth/register", data),
  login: (data) => post("/auth/login", data),
  me: () => get("/auth/me"),
  levels: () => get("/api/levels"),
  semesters: (levelId) => get(`/api/semesters?level_id=${levelId}`),
  subjects: (semId) => get(`/api/subjects?semester_id=${semId}`),
  addSubject: (payload) => post("/api/subjects", payload),
  notes: (subjectId, q = "", module = "") =>
    get(`/api/notes?subject_id=${subjectId}&q=${encodeURIComponent(q)}&module=${encodeURIComponent(module)}`),
  addNote: (payload) => post("/api/notes", payload),
};

