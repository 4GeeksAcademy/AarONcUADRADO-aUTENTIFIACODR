import React, { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpointUrl = `${process.env.BACKEND_URL}/api/login`;

        try {
            const response = await fetch(endpointUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const result = await response.json();

            if (response.ok) {
                sessionStorage.setItem("token", result.token); // Guardar token en sessionStorage
                window.location.href = "/private"; // Redirigir a la página privada
            } else {
                setError(result.message || "Login failed");
            }
        } catch (error) {
            setError("Failed to login");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};
