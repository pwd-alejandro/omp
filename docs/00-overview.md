# 00 — Project Overview

## Vision

**One Million Pieces** is an independent news outlet. The writing lives on Substack (which
handles the boring-but-critical parts: hosting content, subscriptions, payments, and email).
This project is the **face** of the outlet — a custom website that makes the writing feel
like it belongs to a real publication, not a generic newsletter template.

The site reads content from Substack and presents it in a distinctive, fast, on-brand way.

## Goals

1. **A landing page that establishes the brand** — what One Million Pieces is, who it's for, and a clear path to subscribe.
2. **An article experience that feels bespoke** — a homepage/feed of pieces and clean article presentation, driven automatically by what's published on Substack.
3. **Automatic sync** — publishing on Substack should make content appear on the site with no manual step.
4. **Fast time-to-launch** — ship something real quickly; polish iteratively.
5. **Forgiving architecture** — free content today, but the design must not block adding paid/premium content and full on-site reading later.

## Non-goals (for v1)

- ❌ Building our own CMS, auth, or payment system — **Substack owns all of that.**
- ❌ Rendering full paywalled content on our site — technically impossible from RSS (see [`03-content-sync.md`](./03-content-sync.md)) and not needed yet.
- ❌ A complete searchable archive of every post ever written — RSS only exposes recent posts. Deferred (see [`07-open-questions-and-risks.md`](./07-open-questions-and-risks.md)).
- ❌ Comments, user accounts, or a mobile app.

## The key insight this whole project rests on

> Substack's RSS feed contains the **full text of free posts**, but only a **teaser** for
> paid posts. Subscriptions and payments **always** happen on substack.com.

Because our content starts **all free**, we can render complete articles on our own site today.
When/if we add paid tiers, those specific posts will show a preview + "subscribe to read on
Substack" call-to-action. The architecture (Astro's hybrid rendering) supports this switch
per-article without a rewrite.

## Confirmed decisions

| Decision           | Choice                                                                               | Where it's detailed                                          |
| ------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| Content model      | All free now; forgiving for paid later                                               | [03](./03-content-sync.md)                                   |
| Reading experience | On-site rendering; Substack handoff acceptable for long/future-paid pieces at launch | [01](./01-architecture.md)                                   |
| Framework          | Astro                                                                                | [02](./02-tech-stack.md)                                     |
| Hosting            | Cloudflare Pages                                                                     | [02](./02-tech-stack.md), [06](./06-setup-and-deployment.md) |
| Sync               | GitHub Actions cron → rebuild                                                        | [03](./03-content-sync.md)                                   |
| Design source      | Full "Ledger" design system in-repo (tokens, components, UI kits)                    | [04](./04-design-system.md)                                  |
| Domain split       | Site on apex `onemillionpieces.com`; Substack on `read.` subdomain                   | [06](./06-setup-and-deployment.md)                           |

## Glossary

- **RSS feed** — an XML document Substack publishes at `/feed` listing recent posts. Our source of truth for content.
- **`content:encoded`** — the RSS field containing a post's full HTML body (full for free posts, teaser for paid).
- **SSG (Static Site Generation)** — building all pages to plain HTML at build time. Fastest, cheapest to serve.
- **Scheduled rebuild** — a cron job that re-runs the build periodically so new Substack posts appear.
- **Astro Island** — an interactive component (React/Svelte/etc.) hydrated on an otherwise-static page. How we add rich interactivity/animation only where needed.
- **Hybrid rendering** — Astro's ability to make some routes static and others server-rendered. Our path to paid-content gating later.
- **Handoff** — linking from our site to the post on Substack for reading/subscribing.
