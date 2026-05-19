import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Guard for SSG builds: main.tsx gets transitively bundled by vite-react-ssg
// when it builds the server-side renderer, and the SSG bundle runs in Node
// where `document` doesn't exist. The guard makes this file safe to import
// in any context — no-op on the server, normal mount in the browser.
if (typeof document !== "undefined") {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    createRoot(rootEl).render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
  }
}
