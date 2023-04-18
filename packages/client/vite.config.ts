import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - нет типов "@types/vite-imagetools"
import { imagetools } from "vite-imagetools";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src", "assets"),
      components: path.resolve(__dirname, "src", "components"),
      pages: path.resolve(__dirname, "src", "pages"),
      services: path.resolve(__dirname, "src", "services"),
      styles: path.resolve(__dirname, "src", "styles"),
      theme: path.resolve(__dirname, "src", "theme"),
      utils: path.resolve(__dirname, "src", "utils"),
      hoc: path.resolve(__dirname, "src", "hoc"),
    },
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __API_ENDPOINT__: JSON.stringify(process.env.API_ENDPOINT),
    __API_BASEURL__: JSON.stringify(process.env.API_BASEURL),
  },
  plugins: [react(), imagetools()],
  build: {
    rollupOptions: {
      input: {
        app: "./index.html",
        serviceWorker: "./src/serviceWorker.ts",
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === "serviceWorker"
            ? "sw.js"
            : assetInfo.name === "entry-server"
            ? "entry-server.cjs"
            : "assets/js/[name]-[hash].js";
        },
      },
    },
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true,
  },
});
