"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../../lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!username || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      await register(username, password, role);
      setSuccess("¡Cuenta creada! Redirigiendo...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 380, margin: "80px auto", padding: "0 20px" }}>
      <h1 style={{ marginBottom: 24 }}>Crear Cuenta</h1>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        {error && <p style={{ color: "red", fontSize: 13, margin: 0 }}>{error}</p>}
        {success && <p style={{ color: "green", fontSize: 13, margin: 0 }}>{success}</p>}
        <button type="submit" disabled={loading}
          style={{ padding: 10, borderRadius: 6, border: "none", background: "#0070f3", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        ¿Ya tienes cuenta? <Link href="/login" style={{ color: "#0070f3" }}>Inicia sesión</Link>
      </p>
    </div>
  );
}
