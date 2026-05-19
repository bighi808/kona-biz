/**
 * Vite config used exclusively by the SSG build (vite-react-ssg).
 * The main vite.config.ts is for standard CSR builds.
 *
 * Usage:
 *   npm run build:ssg          → vite-react-ssg build -c vite.ssg.config.ts
 *   npm run build:production   → sitemap + SSG build (all 365 routes)
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // GitHub Pages base — change to "/" when deploying to kona.biz custom domain
  base: process.env.VITE_BASE_PATH || "/kona-biz/",

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },

  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "index.ssg.html"),
    },
  },
});
