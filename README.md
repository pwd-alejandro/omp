# One Million Pieces

The website for **One Million Pieces** — an independent news outlet.

Content, subscriptions, and payments are managed on **Substack**. This repository is the
public-facing website: a landing page and article frontend that reads the Substack RSS
feed and presents the writing in a custom, on-brand experience.

## How it fits together (30-second version)

```
  Author writes  ─▶  Substack (CMS + payments + email)  ─▶  RSS feed
                                                              │
                                                     (scheduled fetch)
                                                              │
                                                              ▼
                              This repo (Astro) ─build─▶ Cloudflare Pages ─▶ onemillionpieces.com
```

- **Substack** is the backend: it stores posts, handles subscriptions/payments, sends email.
- **This site** pulls the Substack RSS feed on a schedule, rebuilds, and serves a fast,
  beautiful static site from the global edge.
- For **v1**, full reading of longer/paywalled pieces can hand off to Substack; the site is
  architected so full on-site reading and paid gating can be added later without a rewrite.

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) (static, zero-JS-by-default, hybrid-ready) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Content sync | GitHub Actions cron → fetch RSS → redeploy |
| Source of truth | Substack RSS feed |

## For agents & contributors

- **[`AGENTS.md`](./AGENTS.md)** — operating manual for anyone (AI or human) working here. Read it first.
- **[`SKILLS.md`](./SKILLS.md)** — catalogue of skills, incl. the brand design system.
- **[`.claude/skills/one-million-pieces-design/`](./.claude/skills/one-million-pieces-design/)** — the complete "Ledger" design system (tokens, components, UI kits), auto-loaded as a skill. Source of truth for all visuals.

## Planning docs

Everything is planned in [`/docs`](./docs). Start here:

1. [`00-overview.md`](./docs/00-overview.md) — vision, goals, scope, glossary
2. [`01-architecture.md`](./docs/01-architecture.md) — system design & data flow
3. [`02-tech-stack.md`](./docs/02-tech-stack.md) — decisions & rationale
4. [`03-content-sync.md`](./docs/03-content-sync.md) — the Substack ↔ site sync, in depth
5. [`04-design-system.md`](./docs/04-design-system.md) — brand, layout, pages, motion
6. [`05-roadmap.md`](./docs/05-roadmap.md) — the day-by-day build plan
7. [`06-setup-and-deployment.md`](./docs/06-setup-and-deployment.md) — accounts, domain, DNS, deploy
8. [`07-open-questions-and-risks.md`](./docs/07-open-questions-and-risks.md) — decisions pending & risks

## Status

📋 **Planning.** No code yet. See the [roadmap](./docs/05-roadmap.md) for the first day's tasks.
