# 05 — Roadmap (Day-by-Day Build Plan)

A realistic multi-day plan. Each "day" is a focused work session, not necessarily a calendar
day — do them in order; each ends with something you can see working. Check items off as you go.

Legend: 🟢 = ship/verify milestone.

---

## Day 0 — Foundations & "hello, deployed"

Goal: an empty-but-real Astro site live on the internet at a temporary URL.

- [ ] Confirm the Substack publication exists (or create it); record the exact **feed URL**.
- [ ] Initialize Astro + TypeScript in this repo (`pnpm create astro`).
- [ ] Add Tailwind (or set up CSS custom properties), ESLint, Prettier.
- [ ] Commit a placeholder homepage.
- [ ] Create a Cloudflare Pages project connected to this GitHub repo; enable auto-deploy on push.
- [ ] 🟢 **Verify:** pushing to `main` deploys to a `*.pages.dev` URL.

## Day 1 — Content ingestion (the core)

Goal: real Substack posts flowing into the site as data.

- [ ] Build the ingestion module: fetch → parse → normalize → typed `Post[]` (per [`03`](./03-content-sync.md)).
- [ ] Implement paywall/truncation detection (`isPaywalled`).
- [ ] Add HTML sanitization for `bodyHtml`.
- [ ] Derive stable slugs from the Substack link.
- [ ] Add the last-good-feed fallback so builds never ship empty.
- [ ] Wire posts into an Astro content collection.
- [ ] Write a couple of tests against a saved sample feed (free + paid item).
- [ ] 🟢 **Verify:** a debug page lists all posts pulled from the live feed with correct fields.

## Day 2 — Design system & core layout

Goal: the brand exists in code.

- [ ] Ingest logo/image assets into `src/assets/brand/`.
- [ ] Extract palette + typography from the logo; confirm with Alejandro.
- [ ] Build the token config (colors, type scale, spacing, motion, breakpoints); wire dark mode.
- [ ] Build header/nav (with Subscribe button) and footer.
- [ ] Build the `.prose` style scope for article HTML.
- [ ] 🟢 **Verify:** a styled shell with real nav/footer renders on desktop + mobile.

## Day 3 — Homepage & article index

Goal: readers can browse the writing.

- [ ] Build the article card component (cover, title, excerpt, date, tag, reading time).
- [ ] Build `/` — hero + featured/latest feed + subscribe CTA.
- [ ] Build `/articles` — responsive grid of recent posts.
- [ ] Handle empty/edge states (no image, long titles, missing tags).
- [ ] 🟢 **Verify:** home and index render real Substack posts, look on-brand, responsive.

## Day 4 — Article pages & Substack handoff

Goal: readers can read (or be handed off correctly).

- [ ] Build `/article/[slug]`: title, byline, date, hero, prose body, end-of-article subscribe CTA.
- [ ] Branch on `isPaywalled`: full text vs. teaser + "Subscribe to read on Substack" CTA.
- [ ] Single-source the Substack/subscribe link (one config value).
- [ ] Build `/about`, `/subscribe`, and an on-brand `/404`.
- [ ] 🟢 **Verify:** click a card → read the full free article on our site; a (simulated) paid post shows the teaser + handoff.

## Day 5 — Sync automation

Goal: publishing on Substack updates the site with no manual step.

- [ ] Add the GitHub Actions cron workflow (fetch feed + trigger Cloudflare deploy), ~20 min interval.
- [ ] Wire the last-good-feed cache into CI.
- [ ] Add a failed-build/failed-fetch notification.
- [ ] Document the "publish now" manual trigger.
- [ ] 🟢 **Verify:** publish a test post on Substack → it appears on the site within one interval.

## Day 6 — SEO, performance, polish

Goal: launch-quality.

- [ ] Per-page `<title>`/meta, Open Graph + Twitter cards, canonical URLs.
- [ ] Generate `sitemap.xml` and our own `rss.xml`.
- [ ] Add analytics (privacy-friendly, e.g. Cloudflare Web Analytics or Plausible).
- [ ] Enable Astro View Transitions; add tasteful reveal/scroll motion (respect reduced-motion).
- [ ] Image handling: lazy-load, dimensions, optional build-time caching of covers.
- [ ] Run Lighthouse; hit the ≥95 targets on home + article.
- [ ] Accessibility pass (contrast, focus, alt text, keyboard).
- [ ] 🟢 **Verify:** Lighthouse targets met; sharing a link shows a proper preview card.

## Day 7 — Domain & launch

Goal: live on the real domain.

- [ ] Register `onemillionpieces.com` (see [`06`](./06-setup-and-deployment.md)).
- [ ] Point the apex/`www` at Cloudflare Pages; verify SSL.
- [ ] (Optional, on-brand handoff) Buy Substack custom domain ($50) → `read.onemillionpieces.com`; update handoff links.
- [ ] Final cross-browser/device pass; verify sync in production.
- [ ] 🟢 **LAUNCH.**

---

## Post-launch backlog (not v1)

- Full archive beyond the ~20 RSS posts (Substack export/sitemap ingestion).
- Tag/category and author pages; on-site search.
- Premium/paid content gating (flip specific routes to server-rendered; verify subscriber).
- Full on-site reading for long pieces (remove Substack handoff where desired).
- Newsletter-style email capture directly on-site (still posting via Substack).
- Richer interactive/animated features as Islands.

See [`07-open-questions-and-risks.md`](./07-open-questions-and-risks.md) for decisions that gate some of these.
