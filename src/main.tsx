import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Canvas } from "@react-three/fiber";
import "./style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas
      shadows
      camera={{ position: [1.7, 0.9, 3], fov: 50 }}
      gl={{ antialias: true }}
    >
      <App />
    </Canvas>
  </StrictMode>
);
