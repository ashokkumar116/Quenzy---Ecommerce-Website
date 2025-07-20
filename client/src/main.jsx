import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Contexts/CartContext";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <PrimeReactProvider>
            <AuthProvider>
                <CartProvider>
                <Navbar/>
                <App />
                </CartProvider>
            </AuthProvider>
        </PrimeReactProvider>
    </BrowserRouter>
);
