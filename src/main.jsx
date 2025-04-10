import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/admin.css";
import "./assets/global.css";
import "./assets/swiper.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
