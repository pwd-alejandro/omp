# 05 — Roadmap (Day-by-Day Build Plan)

A realistic multi-day plan. Each "day" is a focused work session, not necessarily a calendar
day — do them in order; each ends with something you can see working. Check items off as you go.

Legend: 🟢 = ship/verify milestone.

---

## Day 0 — Foundations & "hello, deployed"

Goal: an empty-but-real Astro site live on the internet at a temporary URL.

- [x] Confirm the Substack publication exists; record the exact **feed URL** (verified live 2026-07-01).
- [x] Initialize Astro + TypeScript in this repo (manual scaffold; Astro 7).
- [x] Set up CSS custom properties (design-system tokens copied into `src/styles/ds/`), ESLint, Prettier.
- [x] Placeholder homepage rendering the brand (type, paper/ink, vermillion) — `src/pages/index.astro`.
- [ ] Create a Cloudflare Pages project connected to this GitHub repo; enable auto-deploy on push. **← Alejandro (account action)**
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

## Day 2 — Wire in the design system & core layout

Goal: the existing "Ledger" design system lives in the Astro app.

- [ ] Read `.claude/skills/one-million-pieces-design/readme.md`; invoke the `one-million-pieces-design` skill.
- [ ] Copy the design system's `styles.css` + `tokens/` + `assets/logos/` into the app; link `styles.css`.
- [ ] Self-host the fonts (swap Google Fonts `@import` for `@font-face`) — see [`04`](./04-design-system.md).
- [ ] Add Lucide for UI icons; wire the mosaic mark as logo/favicon.
- [ ] Port header/nav (masthead + 2px ink rule, Subscribe button) and footer from `ui_kits/homepage`.
- [ ] Build the `.omp-body`/`.prose` scope for Substack article HTML.
- [ ] 🟢 **Verify:** a styled shell (correct type, paper/ink, vermillion accent) renders on desktop + mobile.

## Day 3 — Homepage & article index

Goal: readers can browse the writing.

- [ ] Port the design system's `ArticleCard` (cover, title, excerpt, date, `Tag`, reading time).
- [ ] Build `/` from `ui_kits/homepage/index.html` — masthead, story grid, "By the numbers" strip, subscribe CTA.
- [ ] Build `/articles` — responsive grid of recent posts using `ArticleCard` + `RuleHeading`.
- [ ] Handle empty/edge states (no image, long titles, missing tags).
- [ ] 🟢 **Verify:** home and index render real Substack posts, look on-brand, responsive.

## Day 4 — Article pages & Substack handoff

Goal: readers can read (or be handed off correctly).

- [ ] Build `/article/[slug]`: title, `Byline`, date, hero, `.omp-body` prose, `PullQuote`/`SourceChip` styling, end-of-article `SubscribeField` CTA.
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
