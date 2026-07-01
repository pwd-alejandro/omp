// Flat ESLint config. Minimal for now: Astro's recommended rules + ignores.
// Expand as the codebase grows (see docs/02-tech-stack.md).
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/", ".astro/", "node_modules/", ".claude/skills/**"],
  },
  ...eslintPluginAstro.configs.recommended,
];
