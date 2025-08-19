
export const authService = {
    login: async (username: string, password: string) => {
        const response = await fetch("https://localhost:7173/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error("Login failed");
        return await response.json();
    },
    register: async (username: string, password: string) => {
        const response = await fetch("https://localhost:7173/Auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error("Registration failed");
        return await response.json();
    },
    logout: () => {
         localStorage.removeItem("token");
         window.location.href = "/auth";
    }
}