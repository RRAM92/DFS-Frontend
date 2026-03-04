"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña.");
      return;
    }
    setLoading(true);
    try {
      await login(username, password);
      router.push("/turnos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 380, margin: "80px auto", padding: "0 20px" }}>
      <h1 style={{ marginBottom: 24 }}>Iniciar Sesión</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
        {error && <p style={{ color: "red", fontSize: 13, margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading}
          style={{ padding: 10, borderRadius: 6, border: "none", background: "#0070f3", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        ¿No tienes cuenta? <Link href="/register" style={{ color: "#0070f3" }}>Regístrate</Link>
      </p>
    </div>
  );
}