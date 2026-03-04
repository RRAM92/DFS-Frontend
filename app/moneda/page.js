"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "../../lib/auth";
import { apiFetch } from "../../lib/api";

const MONEDAS = ["USD", "MXN", "EUR", "GBP", "JPY", "CAD", "ARS", "BRL"];

export default function MonedaPage() {
  const router = useRouter();
  const [form, setForm] = useState({ from: "USD", to: "MXN", amount: "" });
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) router.push("/login");
  }, []);

  async function handleConvertir(e) {
    e.preventDefault();
    setError(""); setResultado(null);
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Ingresa una cantidad válida."); return;
    }
    if (form.from === form.to) { setError("Selecciona monedas diferentes."); return; }
    setLoading(true);
    try {
      const data = await apiFetch(`/currency/convert?from=${form.from}&to=${form.to}&amount=${form.amount}`);
      setResultado(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ maxWidth: 460, margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ marginBottom: 24 }}>Conversor de Moneda</h1>
      <form onSubmit={handleConvertir} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          type="number" placeholder="Cantidad" min="0.01" step="any"
          value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center" }}>
          <select value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
            style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}>
            {MONEDAS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <button type="button" onClick={() => setForm(f => ({ ...f, from: f.to, to: f.from }))}
            style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "white", cursor: "pointer" }}>
            ⇄
          </button>
          <select value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
            style={{ padding: "10px 12px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}>
            {MONEDAS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        {error && <p style={{ color: "red", fontSize: 13, margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading}
          style={{ padding: 10, borderRadius: 6, border: "none", background: "#0070f3", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          {loading ? "Consultando..." : "Convertir"}
        </button>
      </form>

      {resultado && (
        <div style={{ marginTop: 24, padding: 20, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, textAlign: "center" }}>
          <p style={{ color: "#666", fontSize: 13 }}>{resultado.amount} {resultado.from} =</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: "#16a34a", margin: "4px 0" }}>
            {resultado.result != null
              ? Number(resultado.result).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 4 })
              : "—"}
          </p>
          <p style={{ color: "#666" }}>{resultado.to}</p>
        </div>
      )}
    </div>
  );
}
