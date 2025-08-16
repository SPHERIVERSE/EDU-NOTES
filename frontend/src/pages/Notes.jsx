import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Notes() {
  const { subjectId } = useParams();
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [module, setModule] = useState("");
  const [form, setForm] = useState({ title: "", module_name: "", content: "" });

  async function load() {
    setNotes(await api.notes(subjectId, q, module));
  }

  useEffect(() => { load(); }, [subjectId]); // initial

  return (
    <div>
      <h2>Notes</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Search text..." value={q} onChange={e=>setQ(e.target.value)} />
        <input placeholder="Module filter..." value={module} onChange={e=>setModule(e.target.value)} />
        <button onClick={load}>Search</button>
      </div>

      {user && (
        <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 16 }}>
          <h3>Add Note</h3>
          <input placeholder="Title" value={form.title}
            onChange={e=>setForm({...form, title:e.target.value})} /><br />
          <input placeholder="Module (optional)" value={form.module_name}
            onChange={e=>setForm({...form, module_name:e.target.value})} /><br />
          <textarea placeholder="Content (markdown/plain)"
            value={form.content} onChange={e=>setForm({...form, content:e.target.value})} rows={6} cols={60} /><br />
          <button onClick={async () => {
            await api.addNote({ ...form, subject_id: Number(subjectId) });
            setForm({ title:"", module_name:"", content:"" });
            await load();
          }}>Save Note</button>
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map(n => (
          <li key={n.id} style={{ border: "1px solid #eee", padding: 12, marginBottom: 10 }}>
            <div style={{ fontWeight: "bold" }}>{n.title}</div>
            {n.module_name && <div style={{ fontSize: 12, opacity: 0.7 }}>Module: {n.module_name}</div>}
            <pre style={{ whiteSpace: "pre-wrap" }}>{n.content}</pre>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{new Date(n.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

