import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { crx } from "@crxjs/vite-plugin";
// import manifest from "./manifest.json";
import { resolve } from "path";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    // css: true
  },
  build: {
    outDir: "dist", // La carpeta de salida para el build
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"), // El archivo principal para el popup
        serviceWorker: resolve(__dirname, "src/scripts/service-worker.ts"), // Service worker
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  publicDir: "public", // La carpeta de archivos públicos
});
