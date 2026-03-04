"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../lib/auth";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/turnos");
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", color: "#999", fontSize: 14 }}>
      Redirigiendo...
    </div>
  );
}