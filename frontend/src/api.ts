import { authService } from "./services/authService";

const API_URL = "https://localhost:7173";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token && !endpoint.includes("login") && !endpoint.includes("register")) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if(response.status === 401) {
        authService.logout();
        return;
    }
    throw new Error(await response.text());
  }

  return response.json();
}