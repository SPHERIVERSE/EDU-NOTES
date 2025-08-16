import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function Register() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.register(form);
      login(res.token, res.user);
      nav("/");
    } catch (e) {
      setErr(e.error || "Registration failed");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
      <h2>Register</h2>
      {err && <div style={{ color: "red" }}>{err}</div>}
      <input placeholder="Name" value={form.name}
        onChange={e=>setForm({...form, name:e.target.value})} /><br />
      <input placeholder="Email" value={form.email}
        onChange={e=>setForm({...form, email:e.target.value})} /><br />
      <input placeholder="Password" type="password" value={form.password}
        onChange={e=>setForm({...form, password:e.target.value})} /><br />
      <button>Create Account</button>
    </form>
  );
}

