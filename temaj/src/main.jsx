
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider2 } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import './utils/i18n.js';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider2>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider2>
  </QueryClientProvider>
);
