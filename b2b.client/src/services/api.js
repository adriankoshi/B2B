// services/api.js
const API_URL = "https://localhost:7001/api";

export const apiFetch = async (endpoint, method = "GET", body) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "API Error");
    }

    return await res.json();
};
