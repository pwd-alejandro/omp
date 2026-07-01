import { defineConfig } from "vitest/config";

// Unit tests for the ingestion pipeline. Vitest runs through Vite, so `?raw`
// fixture imports and import.meta.env resolve the same way they do in the build.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
