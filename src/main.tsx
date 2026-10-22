import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import App from "./app/App.tsx";
import { ProtectedApp } from "./app/components/ProtectedApp.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ProtectedApp>
    <App />
    <Analytics />
  </ProtectedApp>,
);