"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getToken, logout } from "../lib/auth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const autenticado = typeof window !== "undefined" ? !!getToken() : false;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const linkStyle = (href) => ({
    color: pathname === href ? "#0070f3" : "#333",
    fontWeight: pathname === href ? 600 : 400,
    textDecoration: "none",
    fontSize: 14,
  });

  return (
    <nav style={{ padding: "12px 24px", background: "#f8f8f8", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: 20 }}>
      <Link href="/" style={{ fontWeight: 700, fontSize: 15, color: "#0070f3", textDecoration: "none" }}>
        Proyecto Final
      </Link>
      <div style={{ display: "flex", gap: 16, flex: 1 }}>
        {autenticado && (
          <>
            <Link href="/turnos" style={linkStyle("/turnos")}>Turnos</Link>
            <Link href="/moneda" style={linkStyle("/moneda")}>Moneda</Link>
          </>
        )}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {autenticado ? (
          <button onClick={handleLogout}
            style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #ccc", background: "white", cursor: "pointer", fontSize: 13 }}>
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link href="/login" style={{ ...linkStyle("/login"), padding: "6px 14px", borderRadius: 6, border: "1px solid #0070f3", color: "#0070f3" }}>
              Ingresar
            </Link>
            <Link href="/register" style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: "#0070f3", color: "white", fontSize: 13, textDecoration: "none" }}>
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}