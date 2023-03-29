import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

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
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __API_ENDPOINT__: JSON.stringify(process.env.API_ENDPOINT),
  },
  plugins: [react()],
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "./src/entry-server.tsx"),
      name: "client",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        dir: "dist/server",
      },
    },
  },
});
