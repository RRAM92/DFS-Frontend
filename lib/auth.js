import { apiFetch } from "./api";

export async function login(username, password) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  localStorage.setItem("token", data.token);
  return data;
}

export async function register(username, password) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
