import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import { Private } from "./pages/private";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import injectContext from "./store/appContext";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
                        {/* Puedes añadir más rutas aquí, como la página de inicio */}
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
