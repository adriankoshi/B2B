// services/api.js
const API_URL = "https://localhost:7001/api";

export const apiFetch = async (endpoint, method = "GET", body, isFormData = false) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Authorization": `Bearer ${token}`,
    };

    // Only set JSON Content-Type if NOT sending FormData
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${API_URL}/${endpoint}`, {
        method,
        headers,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "API Error");
    }

    return await res.json();
};
