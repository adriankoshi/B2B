// services/authService.js
export const loginAsAdmin = async () => {
    const res = await fetch("https://localhost:7001/api/account/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "Admin",
            password: "123456"
        })
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    localStorage.setItem("token", data.token); // Make sure backend returns token!
    return data;
};
