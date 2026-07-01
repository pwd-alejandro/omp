# 03 — Content Sync (Substack ↔ Site)

This is the heart of the project. It explains exactly how content gets from Substack onto our
site, what the RSS feed can and cannot give us, and how we handle the edge cases.

## The Substack RSS feed

Substack publishes an RSS feed for every publication. Ours (confirmed live 2026-07-01):

```
https://onemillionpieces.substack.com/feed
```

**Test fixture:** the first post — ["We are free, son. They are bombing Caracas"](https://onemillionpieces.substack.com/p/we-are-free-son-they-are-bombing)
— comes through as a **free post with full body** (verified). Save a snapshot of this feed as
the ingestion module's test fixture so we develop against real content, not lorem ipsum.

### What the feed contains (verified, 2026)

- The **most recent posts** (roughly the latest ~20 — Substack does not expose the full archive via RSS).
- Per item: `title`, `link` (canonical Substack URL), `pubDate`, `dc:creator` (author),
  `category` tags, `description` (summary), and **`content:encoded`** (the HTML body).
- **Free posts:** `content:encoded` holds the **full article HTML**.
- **Paid posts:** `content:encoded` holds only the **public teaser**, ending with a
  **"Read more"** link/marker and a subscribe prompt — the same thing a logged-out visitor sees.

### Hard limits to design around

| Limit                       | Implication                                | Our handling                                                                                                 |
| --------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Only ~recent posts in feed  | No full archive from RSS alone             | v1 shows recent posts; full archive is a deferred enhancement (see [`07`](./07-open-questions-and-risks.md)) |
| Paid posts truncated        | Can't render full paid content on our site | Show teaser + "Subscribe to read on Substack" CTA                                                            |
| No push webhook             | Can't be notified of new posts             | Poll on a schedule                                                                                           |
| Feed reflects current state | Edits/deletes propagate on next fetch      | Rebuild picks up changes automatically                                                                       |

## Sync mechanism: scheduled rebuild

Because there's no webhook, we **pull**. The chosen model:

```
GitHub Actions (cron: every ~20 min)
    │
    ├─ checkout repo
    ├─ fetch RSS feed  → save raw XML as a build artifact / cache
    ├─ pnpm install
    ├─ astro build      (ingestion runs here; parses feed → pages)
    └─ deploy /dist to Cloudflare Pages
```

- **Interval:** start at 20 minutes. Lower it if you want fresher content; raise it to save build minutes.
- **Instant publish when needed:** re-run the Action manually, or hit "Retry deployment" in Cloudflare Pages.
- **Alternative (documented, not chosen):** Vercel ISR fetches at request-time and caches for
  N minutes — fresher, but ties us to Vercel and adds a runtime dependency. Revisit only if
  the rebuild lag ever becomes a real problem.

## Ingestion pipeline (build-time)

A single, well-tested module (`src/content/substack.ts` or similar) does the following:

1. **Fetch** the feed URL (with a timeout and a descriptive User-Agent).
2. **Parse** the XML with a maintained parser — never hand-roll.
3. **Normalize** each `<item>` into a typed object:
   ```ts
   type Post = {
     title: string;
     slug: string; // derived, URL-safe, stable
     substackUrl: string; // the canonical link on Substack
     publishedAt: Date;
     author: string;
     tags: string[];
     excerpt: string; // clean summary for cards/meta
     bodyHtml: string; // sanitized content:encoded
     coverImage?: string; // first image / enclosure
     isPaywalled: boolean; // detected (see below)
   };
   ```
4. **Detect paywalled/truncated** items: check for the trailing "Read more" marker / a
   subscribe-prompt block / an unusually short body relative to the summary. Set `isPaywalled`.
5. **Sanitize** `bodyHtml` (strip scripts/unexpected tags, normalize images to be lazy-loaded
   and responsive, fix relative URLs, handle Substack embeds).
6. **Derive a stable slug** — prefer deriving from the Substack post slug in `link` so URLs stay
   consistent across rebuilds even if titles change.
7. **Feed into Astro** as a content collection so pages can query/sort/paginate posts.

### Resilience: never ship an empty site

The feed fetch can fail (network blip, Substack hiccup) at the exact moment the cron fires.
Guard against it:

- Cache the **last successful feed XML** (committed to the repo or stored as a build cache).
- If the live fetch fails or returns fewer items than the cache, **fall back to the cached feed**
  and log a warning — do **not** build a site with zero/partial content.
- Optionally alert (e.g. a failed-build notification) so we notice persistent failures.

## Rendering rules

```
for each Post:
  if not isPaywalled:
      render full article page from bodyHtml         # all posts today
  else:  # future paid content
      render teaser from excerpt/bodyHtml
      show "Subscribe to read the full piece on Substack" → substackUrl (or read.onemillionpieces.com)
```

The same Astro template branches on `isPaywalled`, so turning on premium content later is a
content flag, not a code migration. If we later want server-side gating (e.g. verify a logged-in
Substack subscriber), that specific route becomes server-rendered in Astro — the rest stays static.

## Images

- Substack image URLs are hotlinkable but we should be deliberate: for performance and
  resilience, consider downloading/caching cover images at build time and serving them via
  Cloudflare, or at minimum lazy-load and set explicit dimensions to avoid layout shift.
- Decide during the design phase; not a launch blocker.

## Outgoing RSS (our own feed)

Astro can also **generate our own `/rss.xml`** so readers can subscribe in feed readers
directly from our domain. Nice-to-have; include it in the SEO/polish phase.

## Open items tracked elsewhere

- Full archive beyond ~20 posts → [`07-open-questions-and-risks.md`](./07-open-questions-and-risks.md)
- Exact paywall-detection heuristic → finalize during the ingestion build day ([`05`](./05-roadmap.md))
