import path from "path";
import million from "million/compiler";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.BASE_URL || "./",
  plugins: [million.vite({ auto: true }), react()],
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] }
});
