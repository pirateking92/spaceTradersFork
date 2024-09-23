import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";

config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});
