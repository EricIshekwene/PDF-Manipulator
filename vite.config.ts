import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/PDF-Manipulator/", // ✅ This is critical for GitHub Pages
  plugins: [react(), tsconfigPaths()],
});
