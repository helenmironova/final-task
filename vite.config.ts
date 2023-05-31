import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "src/assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  plugins: [react()],
});
