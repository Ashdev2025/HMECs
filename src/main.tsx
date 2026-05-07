import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";

import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#111827",
              color: "#fff",
              borderRadius: "12px",
              padding: "14px 16px",
              fontSize: "14px",
            },
          }}
        />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);