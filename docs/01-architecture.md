# 01 — Architecture

## System diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                SUBSTACK                                    │
│  (backend — not ours)                                                      │
│  • Post editor / CMS            • Subscriptions & payments (Stripe)        │
│  • Email delivery               • Comments                                 │
│                                                                            │
│  Exposes:  https://<pub>.substack.com/feed   ← RSS (recent posts)          │
│            https://read.onemillionpieces.com ← posts on our brand domain   │
└───────────────────────────────┬────────────────────────────────────────── ┘
                                 │  (pull, on a schedule)
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                           BUILD PIPELINE                                   │
│  GitHub Actions cron (every ~20 min) OR git push                           │
│    1. Fetch RSS feed                                                       │
│    2. Parse → normalize into Astro content collection                     │
│    3. astro build  → static HTML/CSS/JS in /dist                           │
│    4. Deploy /dist to Cloudflare Pages                                     │
└───────────────────────────────┬───────────────────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE PAGES (edge CDN)                         │
│  Serves onemillionpieces.com globally, cached at the edge, free SSL        │
│                                                                            │
│  Pages:  /            landing / homepage feed                              │
│          /articles    index of pieces                                      │
│          /article/... individual piece (full text, or teaser + handoff)    │
│          /about, /subscribe, ...                                           │
└───────────────────────────────┬───────────────────────────────────────────┘
                                 │
                                 ▼
                              READER
                 (subscribe → hands off to Substack)
```

## Components

### 1. Substack (external backend)
Owns content, money, and email. We never replicate this. We only **read** from it via RSS
and **link** to it for subscribing/paying and (optionally) reading long pieces.

### 2. Content ingestion (build-time)
A small module in this repo that:
- fetches the RSS XML,
- parses it (title, link, `pubDate`, author, categories, `content:encoded`, enclosure/first image),
- detects truncated (paywalled) items via the trailing "Read more" / missing-body signal,
- normalizes each item into a typed content entry Astro can render,
- derives a URL-safe slug per post.

See [`03-content-sync.md`](./03-content-sync.md) for the detail.

### 3. Astro site (this repo)
Turns normalized content into pages. **Static by default.** Interactive/animated bits are
opt-in Islands so the article text stays fast.

### 4. Cloudflare Pages (hosting)
Builds on push and serves the output from the global edge. A **cron trigger / scheduled
GitHub Action** re-runs the build so new posts appear without anyone touching git.

## Data flow: publishing a new post

1. Author publishes on Substack.
2. Within one cron interval (~20 min), the scheduled build fetches the feed and sees the new item.
3. Astro regenerates the homepage feed, the article index, and a page for the new post.
4. Cloudflare Pages serves the new static pages worldwide.

**Content lag = the cron interval.** Acceptable for a newsletter; tunable. A manual "Deploy"
button in Cloudflare (or re-running the Action) publishes instantly when needed.

## Rendering strategy (and the forgiving part)

| Content type | v1 behavior | How it renders |
|---|---|---|
| Free post (all posts today) | Full article on our site | Static page from `content:encoded` |
| Long free post | Optionally: excerpt on-site + "continue on Substack" | Static page + handoff link |
| Paid post (future) | Teaser on-site + "Subscribe to read" CTA | Static page from teaser; Astro route can later become server-rendered to gate |

Because free vs. paid is a **per-post flag we already detect from RSS**, adding premium
content later is a rendering branch — not an architectural change. The same template shows
either the full body or the teaser-plus-CTA.

## Why build-time (static) instead of a server?

- The content changes at most a few times a day → no reason to compute pages per request.
- No user data, no auth on our side → no server logic to run.
- Static + edge CDN = the fastest, cheapest, most reliable option, and the best SEO.
- If we later need per-request logic (paid gating, personalization), Astro on Cloudflare
  supports server-rendered routes selectively — we opt specific pages in, not the whole site.

## Trust & failure modes

- **Feed fetch fails during build** → the build should reuse the last good content (cache the
  last successful feed in the repo/artifact) and never ship an empty site. See [`03`](./03-content-sync.md).
- **Substack changes RSS format** → ingestion is isolated in one module with tests, so breakage
  is localized and obvious.
- **Post edited on Substack** → next rebuild picks up the change (feed reflects current content).
- **Post deleted on Substack** → drops out of the feed; next rebuild removes it. (Old URL may
  404 — acceptable, or add a redirect list later.)
