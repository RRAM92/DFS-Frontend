"use client";
import { useState } from "react";
import { register } from "../lib/auth";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await register(username, password);
      alert("REGISTRADO");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h1>Registro</h1>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button type="submit">Registrar</button>
    </form>
  );
}
