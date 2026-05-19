import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// CSR config — used by `npm run dev` and `npm run build`
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
