import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            // Redirigir al login si no hay token
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the private page!</h1>
            <p>Only authenticated users can see this page.</p>
        </div>
    );
};
