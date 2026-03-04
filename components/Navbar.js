"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link href="/">Inicio</Link> |{" "}
      <Link href="/login">Acceder</Link> |{" "}
      <Link href="/register">Registrarse</Link> |{" "}
      <Link href="/turnos">Ver Turnos</Link>
    </nav>
  );
}