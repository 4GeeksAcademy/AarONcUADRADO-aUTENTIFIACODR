import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login"); // Redirigir al login
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
            <Link to="/private">Private</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};
