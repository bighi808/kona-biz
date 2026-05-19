/**
 * SSG-only entry point — used exclusively by vite-react-ssg at build time.
 * Standard CSR builds use src/main.tsx.
 */
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

export const createRoot = ViteReactSSG({ routes });
