import React, { useState } from "react";

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpointUrl = `${process.env.BACKEND_URL}/api/signup`;

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
                window.location.href = "/login"; // Redirigir al login
            } else {
                setError(result.message || "Error occurred");
            }
        } catch (error) {
            setError("Failed to register user");
        }
    };

    return (
        <div className="signup-container">
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
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};
