"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return <p>Cargando...</p>;

  return children;
}
