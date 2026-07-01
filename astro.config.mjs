// @ts-check
import { defineConfig } from "astro/config";

// One Million Pieces — Astro config
// Static output (SSG). Hosted on Cloudflare Pages, rebuilt on a schedule to pull
// the latest Substack RSS. See docs/01-architecture.md and docs/03-content-sync.md.
export default defineConfig({
  site: "https://onemillionpieces.com",
  // trailingSlash + build options kept at sensible defaults for now.
});
