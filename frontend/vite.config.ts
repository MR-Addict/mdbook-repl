import path from "path";
import million from "million/compiler";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function getBaseUrl() {
  if (!process.env.GITHUB_REPOSITORY) return "/";
  const [githubOwner, repository] = process.env.GITHUB_REPOSITORY.split("/");
  return `https://${githubOwner}.github.io/${repository}/embed`;
}

export default defineConfig({
  base: getBaseUrl(),
  plugins: [million.vite({ auto: true }), react()],
  resolve: { alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }] }
});
