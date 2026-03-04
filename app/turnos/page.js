"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "../../lib/api";
import { getToken, getUser } from "../../lib/auth";

const STATUSES = ["PENDIENTE", "ATENDIENDO", "ATENDIDO"];

export default function TurnosPage() {
  const router = useRouter();
  const [turnos, setTurnos] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nombreCliente: "", servicio: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [creando, setCreando] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (!getToken()) { router.push("/login"); return; }
    setUsuario(getUser());
  }, []);

  const cargarTurnos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch(`/turnos?page=${page}&limit=5`);
      setTurnos(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { cargarTurnos(); }, [cargarTurnos]);

  async function handleCrear(e) {
    e.preventDefault();
    setFormError(""); setFormSuccess("");
    if (!form.nombreCliente || !form.servicio) { setFormError("Completa todos los campos."); return; }
    setCreando(true);
    try {
      await apiFetch("/turnos", { method: "POST", body: JSON.stringify(form) });
      setForm({ nombreCliente: "", servicio: "" });
      setFormSuccess("Turno creado.");
      cargarTurnos();
      setTimeout(() => setFormSuccess(""), 3000);
    } catch (err) { setFormError(err.message); }
    finally { setCreando(false); }
  }

  async function handleStatus(id, status) {
    try {
      await apiFetch(`/turnos/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
      cargarTurnos();
    } catch (err) { setError(err.message); }
  }

  async function handleEliminar(id) {
    if (!confirm("¿Eliminar este turno?")) return;
    try {
      await apiFetch(`/turnos/${id}`, { method: "DELETE" });
      cargarTurnos();
    } catch (err) { setError(err.message); }
  }

  const isAdmin = usuario?.role === "admin";

  return (
    <div style={{ maxWidth: 800, margin: "32px auto", padding: "0 20px" }}>
      <h1 style={{ marginBottom: 24 }}>Gestión de Turnos</h1>

      {/* Formulario */}
      <div style={{ background: "#f5f5f5", padding: 20, borderRadius: 8, marginBottom: 28 }}>
        <h2 style={{ fontSize: 16, marginBottom: 14 }}>Nuevo Turno</h2>
        <form onSubmit={handleCrear} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            placeholder="Nombre del cliente"
            value={form.nombreCliente}
            onChange={e => setForm(f => ({ ...f, nombreCliente: e.target.value }))}
            style={{ flex: 1, minWidth: 160, padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
          />
          <input
            placeholder="Servicio"
            value={form.servicio}
            onChange={e => setForm(f => ({ ...f, servicio: e.target.value }))}
            style={{ flex: 1, minWidth: 160, padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
          />
          <button type="submit" disabled={creando}
            style={{ padding: "8px 20px", borderRadius: 6, border: "none", background: "#0070f3", color: "white", fontWeight: 600, cursor: "pointer" }}>
            {creando ? "..." : "Crear"}
          </button>
        </form>
        {formError && <p style={{ color: "red", fontSize: 13, marginTop: 8 }}>{formError}</p>}
        {formSuccess && <p style={{ color: "green", fontSize: 13, marginTop: 8 }}>{formSuccess}</p>}
      </div>

      {/* Lista */}
      {error && <p style={{ color: "red", marginBottom: 12 }}>{error}</p>}
      {loading ? (
        <p style={{ color: "#666" }}>Cargando...</p>
      ) : turnos.length === 0 ? (
        <p style={{ color: "#999" }}>No hay turnos en esta página.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {turnos.map(turno => (
            <div key={turno.id} style={{
              display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
              padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", background: "white",
            }}>
              <span style={{ color: "#999", fontSize: 12, minWidth: 28 }}>#{turno.id}</span>
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ fontWeight: 600 }}>{turno.nombreCliente}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{turno.servicio}</div>
              </div>
              <span style={{ fontSize: 12, color: "#999" }}>{turno.horaLlegada}</span>
              <select value={turno.status} onChange={e => handleStatus(turno.id, e.target.value)}
                style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc", fontSize: 13 }}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {isAdmin && (
                <button onClick={() => handleEliminar(turno.id)}
                  style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#fee2e2", color: "#dc2626", cursor: "pointer", fontSize: 13 }}>
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 24 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
          style={{ padding: "8px 18px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer", background: "white" }}>
          ← Anterior
        </button>
        <span style={{ display: "flex", alignItems: "center", fontSize: 14, color: "#666" }}>Página {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={turnos.length < 5}
          style={{ padding: "8px 18px", borderRadius: 6, border: "1px solid #ccc", cursor: "pointer", background: "white" }}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}
