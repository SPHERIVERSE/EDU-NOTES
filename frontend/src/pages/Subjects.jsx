import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function Subjects() {
  const { semesterId } = useParams();
  const { user } = useAuth();
  const [subs, setSubs] = useState([]);
  const [name, setName] = useState("");

  async function load() {
    setSubs(await api.subjects(semesterId));
  }
  useEffect(() => { load(); }, [semesterId]);

  async function add() {
    if (!name.trim()) return;
    await api.addSubject({ name, semester_id: Number(semesterId) });
    setName("");
    await load();
  }

  return (
    <div>
      <h2>Subjects</h2>
      {user && (
        <div style={{ marginBottom: 12 }}>
          <input placeholder="New subject (e.g., Mathematics)" value={name} onChange={e=>setName(e.target.value)} />
          <button onClick={add}>Add Subject</button>
        </div>
      )}
      <ul>
        {subs.map(s => (
          <li key={s.id}>
            <Link to={`/subject/${s.id}/notes`}>{s.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

