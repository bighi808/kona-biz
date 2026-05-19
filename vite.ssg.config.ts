/**
 * Vite config used exclusively by the SSG build (vite-react-ssg).
 * The main vite.config.ts is for standard CSR builds (`npm run dev`, `npm run build`).
 *
 * Usage:
 *   npm run build:ssg          → vite-react-ssg build -c vite.ssg.config.ts
 *   npm run build:production   → sitemap + SSG build (all 365 routes pre-rendered)
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // GitHub Pages base — change to "/" when deploying to a custom domain
  base: process.env.VITE_BASE_PATH || "/kona-biz/",

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },

  // vite-react-ssg reads `ssgOptions.entry` to find the file that exports
  // `createRoot = ViteReactSSG(...)`. Without this, it defaults to detecting
  // from index.html's <script> tag — which here points to main.tsx (the CSR
  // entry that doesn't export createRoot), causing
  // "TypeError: createRoot is not a function" at SSG build time.
  // @ts-expect-error -- ssgOptions is read at runtime; not in vite's UserConfig type
  ssgOptions: {
    entry: "src/main.ssg.tsx",
  },
});
