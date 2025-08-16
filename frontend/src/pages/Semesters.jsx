import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";

export default function Semesters() {
  const { levelId } = useParams();
  const [sems, setSems] = useState([]);
  useEffect(() => { api.semesters(levelId).then(setSems); }, [levelId]);
  return (
    <div>
      <h2>Semesters</h2>
      <ul>
        {sems.map(s => (
          <li key={s.id}>
            <Link to={`/semester/${s.id}/subjects`}>{s.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

