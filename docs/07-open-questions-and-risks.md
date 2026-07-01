# 07 — Open Questions & Risks

Living document. Track decisions that aren't made yet and things that could bite us.

## Open questions (need Alejandro's input)

| # | Question | Why it matters | Default if unanswered |
|---|---|---|---|
| ~~Q1~~ | ~~Substack feed URL?~~ | — | ✅ Resolved: `onemillionpieces.substack.com/feed` (verified live) |
| ~~Q2~~ | ~~Brand specifics — colors, typefaces, "feeling"?~~ | — | ✅ Resolved: full "Ledger" design system in-repo |
| Q3 | Buy the Substack custom domain ($50) for on-brand handoff? | Keeps `read.onemillionpieces.com` instead of `*.substack.com` | Skip for v1, add later |
| Q4 | For **long free** posts, read fully on-site or excerpt + handoff? | Affects article template + reading UX | Full on-site (content is free) |
| Q5 | Do we need the **full archive** at launch, or are recent posts enough? | RSS only exposes ~20 recent posts | Recent posts only for v1 |
| Q6 | Analytics tool preference (Cloudflare Web Analytics vs Plausible vs none)? | Privacy + insight | Cloudflare Web Analytics (free, privacy-friendly) |
| Q7 | Reading-time, tags, and author display — show at launch? | Small design decisions | Show reading time + primary tag |

## Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| RSS feed fetch fails during a scheduled build | Medium | High (empty site) | Last-good-feed fallback; never ship empty; alert on failure ([`03`](./03-content-sync.md)) |
| Substack changes RSS format/fields | Low | Medium | Ingestion isolated in one tested module; fails loudly, localized |
| Only ~20 posts in feed → archive gap grows over time | High (eventually) | Medium | v1 accepts it; plan archive ingestion (export/sitemap) post-launch |
| Paywall detection heuristic misclassifies a post | Low | Medium | Detect via "Read more" marker + length checks; test both cases; easy to tune |
| Content lag from cron interval feels slow | Low | Low | Tune interval; manual "publish now" trigger available |
| Substack image hotlinks break/slow | Low | Low | Lazy-load + dimensions; optionally cache covers at build time |
| Domain handoff breaks "feels like mine" illusion | Medium | Low | Substack custom domain (`read.`) + consistent branding; or add full on-site reading later |
| Duplicate content SEO (our page vs Substack) | Medium | Medium | Use canonical URLs deliberately; decide whether ours or Substack's is canonical per content model |
| Vendor lock-in to Substack | Low | Medium | RSS is portable; content is exportable; our site layer is independent |

## Deferred decisions (revisit post-launch)

- **Paid content gating mechanics:** how to verify a logged-in Substack subscriber for on-site
  gated reading (vs. simple teaser + handoff). Astro server routes make this possible; design when needed.
- **Full on-site reading** for all content (removing handoff).
- **Search** and **tag/author pages**.
- **On-site email capture** feeding Substack.
- **Canonical strategy** if/when both our site and Substack host the same full text.

## Decision log

Record resolved questions here with the date and the call made.

- _(2026-07-01)_ Stack locked: Astro + Cloudflare Pages + GitHub Actions cron rebuild.
- _(2026-07-01)_ Content model: all free at launch; architecture kept forgiving for paid.
- _(2026-07-01)_ Reading UX: on-site rendering; Substack handoff acceptable for launch.
- _(2026-07-01)_ Domain split: site on apex, Substack on `read.` subdomain.
- _(2026-07-01)_ Substack feed confirmed live: `onemillionpieces.substack.com/feed` (1 post, full body, free).
- _(2026-07-01)_ Design system delivered in-repo ("Ledger" direction) — Q2 resolved; doc 04 now references it.
- _(2026-07-01)_ Added `AGENTS.md` + `SKILLS.md` as the agent operating manual and skill catalogue.
