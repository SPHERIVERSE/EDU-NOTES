import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Levels() {
  const [levels, setLevels] = useState([]);
  useEffect(() => { api.levels().then(setLevels); }, []);
  return (
    <div>
      <h2>Select Level</h2>
      <ul>
        {levels.map(l => (
          <li key={l.id}>
            <Link to={`/level/${l.id}/semesters`}>{l.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

