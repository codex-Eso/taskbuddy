import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js").then(
      (reg) => console.log("Caching enabled. SW registered:", reg),
      (err) => console.error("SW registration failed:", err)
    );
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)