import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function getBaseUrl() {
  if (!process.env.GITHUB_REPOSITORY) return "/";
  const [githubOwner, repository] = process.env.GITHUB_REPOSITORY.split("/");
  return `https://${githubOwner}.github.io/${repository}`;
}

export default defineConfig({
  base: getBaseUrl(),
  plugins: [react()],
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] }
});
