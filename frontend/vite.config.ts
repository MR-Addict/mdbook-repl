import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || "./",
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] }
});
