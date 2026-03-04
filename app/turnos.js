"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export default function TurnosPage() {
  const [turnos, setTurnos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("/turnos")
      .then((data) => setTurnos(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Turnos</h1>
      <ul>
        {turnos.map((t) => (
          <li key={t.id}>
            {t.nombreCliente} - {t.servicio} ({t.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
