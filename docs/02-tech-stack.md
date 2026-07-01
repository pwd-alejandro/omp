# 02 — Tech Stack & Decisions

Short, ADR-style records of _what_ we chose and _why_, so future-you (and future
collaborators) don't re-litigate settled calls.

---

## Decision 1 — Framework: **Astro**

**Chosen.** Alternatives considered: Next.js, Eleventy, plain HTML, Hugo.

**Why Astro:**

- Purpose-built for **content sites**. Ships **zero JavaScript by default** → excellent
  performance and SEO, which is exactly right for reading-heavy pages.
- First-class **content collections** and built-in **RSS import/export** utilities.
- **Islands architecture**: add React/Svelte/Vue components for rich interactivity or
  animation _only where needed_, without shipping a framework to every page.
- Built-in **View Transitions** for smooth animated page-to-page navigation (near-free polish).
- **Hybrid rendering**: routes can be static _or_ server-rendered. This is our clean path to
  **paid-content gating later** without rewriting the site.

**Why not the others:**

- _Next.js_: great, but a heavier React-first model; more JS shipped by default; overkill for a content site until we actually need app-like behavior.
- _Eleventy/Hugo_: excellent static generators, but weaker story for later interactivity/gating and a less pleasant component/animation path.

**Consequence:** we get a fast static site now and a documented, no-rewrite path to paid + fully interactive later.

---

## Decision 2 — Hosting: **Cloudflare Pages**

**Chosen.** Alternatives: Vercel, Netlify, GCP, AWS.

**Why Cloudflare Pages:**

- Generous free tier; global edge CDN; free SSL; git-push deploys.
- Built-in **cron/scheduled** capability to drive rebuilds.
- Best fit for the static + scheduled-rebuild model.

**Why not GCP/AWS (explicitly rejected):**

- This is a content site, not an application. GCP/AWS would mean hand-assembling buckets,
  CDN, DNS, build pipelines, and IAM — days of plumbing and ongoing cost to host what is
  essentially a folder of HTML. Wrong tool for the job.

**Why not Vercel (close runner-up):**

- Excellent DX and ISR (auto-refreshing pages). Slightly pricier at scale. Documented as the
  fallback if we later prefer request-time freshness over scheduled rebuilds.

**Consequence:** ~$0/mo to start; simple ops.

---

## Decision 3 — Content sync: **GitHub Actions cron → rebuild**

**Chosen.** Alternatives: request-time fetch (ISR), manual rebuilds, webhook-driven.

**Why:** Substack has **no push webhook** for new posts, so sync must be pull-based. A
scheduled fetch that rebuilds a fully static site is the simplest, fastest, most robust
option. See [`03-content-sync.md`](./03-content-sync.md).

**Consequence:** up-to-~20-min content lag (tunable), zero runtime infrastructure.

---

## Decision 4 — Language & tooling

- **TypeScript** throughout (types for parsed feed items catch RSS-shape surprises early).
- **Package manager:** pnpm (fast, disk-efficient). npm is fine if preferred.
- **Styling:** Tailwind CSS via `@astrojs/tailwind` for velocity + a design-token config that
  encodes the brand. (Plain CSS with custom properties is an acceptable alternative — decide in
  the design-system phase.)
- **Linting/formatting:** ESLint + Prettier, run in CI.
- **Feed parsing:** a maintained parser (e.g. `fast-xml-parser` or `rss-parser`) — do not
  hand-roll XML parsing.
- **Content sanitization:** sanitize Substack HTML before rendering (e.g. `sanitize-html`) to
  strip anything unexpected and normalize embeds/images.

---

## Decision 5 — Interactivity & animation

- Default: **CSS + Astro View Transitions** (zero/near-zero JS).
- Scroll/reveal motion: a small library (GSAP or Motion One), loaded only on pages that use it.
- Heavy interactive pieces (if ever): a scoped **Island** (React/Svelte) — never the whole site.

See [`04-design-system.md`](./04-design-system.md#motion--animation).

---

## Cost summary (v1)

| Item                                                | Cost                                                         |
| --------------------------------------------------- | ------------------------------------------------------------ |
| Domain registration                                 | ~$10–20 / yr                                                 |
| Cloudflare Pages                                    | $0 (free tier)                                               |
| GitHub Actions                                      | $0 (public repo / within free minutes)                       |
| Substack                                            | Free plan; 10% fee only if/when you charge for subscriptions |
| Substack custom domain (optional, on-brand handoff) | one-time $50                                                 |
| **Total to launch**                                 | **~$10–70 one-time + ~$15/yr**                               |
