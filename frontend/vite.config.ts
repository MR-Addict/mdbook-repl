import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Simple DJB2 hash function
function simpleHash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // ensure unsigned
}

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_URL || "./",
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] },
  css: {
    modules: {
      generateScopedName: (name, _, css) => {
        if (name === "dark") return "dark";
        const i = css.indexOf(`.${name}`);
        const lineNumber = css.slice(0, i).split(/[\r\n]/).length;
        const hash = simpleHash(css).toString(36).slice(0, 5);
        return `_${name}_${hash}_${lineNumber}`;
      }
    }
  }
});
