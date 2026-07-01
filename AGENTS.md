# AGENTS.md

Operating manual for AI agents (and humans) working in this repository. Read this first,
then the `/docs`. Follow it.

> **Convention:** this is the standard [`AGENTS.md`](https://agents.md) file. Claude Code and
> other agent tools read it automatically. Skills are catalogued in [`SKILLS.md`](./SKILLS.md).

---

## 1. What this repository is

The public website for **One Million Pieces**, an independent, data-driven news outlet.

- **Substack is the backend** — it owns content, subscriptions, payments, and email. We never
  rebuild any of that.
- **This repo is the frontend** — an [Astro](https://astro.build) site, hosted on
  **Cloudflare Pages**, that reads the Substack **RSS feed** and presents the writing in a
  custom, on-brand experience.
- Content is **all free at launch**; the architecture stays forgiving for **paid/premium** later.

If anything here conflicts with a doc, the doc wins for detail — but update this file so it stays true.

## 2. Read before you act

| Order | Doc | What it gives you |
|---|---|---|
| 1 | [`docs/00-overview.md`](./docs/00-overview.md) | Vision, goals, non-goals, glossary |
| 2 | [`docs/01-architecture.md`](./docs/01-architecture.md) | System design, data flow, failure modes |
| 3 | [`docs/02-tech-stack.md`](./docs/02-tech-stack.md) | Every stack decision + rationale |
| 4 | [`docs/03-content-sync.md`](./docs/03-content-sync.md) | **The Substack ↔ site sync — the core** |
| 5 | [`docs/04-design-system.md`](./docs/04-design-system.md) | How to build with the brand |
| 6 | [`docs/05-roadmap.md`](./docs/05-roadmap.md) | Day-by-day build plan + current status |
| 7 | [`docs/06-setup-and-deployment.md`](./docs/06-setup-and-deployment.md) | Accounts, domain, DNS, deploy, env |
| 8 | [`docs/07-open-questions-and-risks.md`](./docs/07-open-questions-and-risks.md) | Undecided things, risks, decision log |

**Do not invent architecture.** Decisions are logged in doc 07. If you think one is wrong,
raise it there — don't silently diverge.

## 3. The design system is law

A complete, self-contained design system lives in **`One Million Pieces Design System/`**
(the "Ledger" direction). It is the source of truth for every visual decision. See
[`SKILLS.md`](./SKILLS.md) for how to invoke it as a skill, and
[`docs/04-design-system.md`](./docs/04-design-system.md) for how it maps onto this site.

Non-negotiable brand rules (from the design system's `readme.md`):

- **Warm ink on paper.** Ink `#1B1712` on paper `#F7F3EA`. A **single** vermillion `#C63A22`
  is the only action/brand colour.
- **Type has three jobs:** **Newsreader** (serif) for reading + headlines; **Libre Franklin**
  (sans) for labels/nav/UI; **Spline Sans Mono** for all figures, timestamps, source lines.
- **Reference semantic tokens** (`--text-accent`, `--surface-card`, `--border-subtle`), never
  raw hex or primitives.
- **Data is the primary storytelling medium.** Lead with charts/tables/figures over stock photos.
- **Every data claim cites its source** inline (source chip). Provenance is a brand value.
- **Voice:** precise, plain-spoken, quietly authoritative. Declarative headlines, usually
  carrying a number. Sentence-case, verb-first UI ("See the data", not "Click here").
- **No emoji. No exclamation marks. No hype.** En-dashes for ranges, tabular numerals for figures.
- **Motion is fast and mechanical** (~60ms), buttons scale to 0.98 on press, nothing bounces.
- Respect `prefers-reduced-motion`; hit Lighthouse ≥95 on home + article.

## 4. Stack & conventions (once code exists)

- **Framework:** Astro + TypeScript. Static by default; interactivity/animation only as scoped Islands.
- **Styling:** the design system's tokens (`One Million Pieces Design System/tokens/*` via
  `styles.css`) + `omp-*` utility classes. Tailwind may wrap these, but tokens are the source of truth.
- **Content:** pulled from Substack RSS at build time. Ingestion is one isolated, tested module.
- **Package manager:** pnpm. **Node:** 20+.
- **Lint/format:** ESLint + Prettier, enforced in CI.
- Keep the Substack subscribe/feed URLs in **one config value** — never hard-code them across files.

## 5. Source of content (confirmed)

| Thing | Value |
|---|---|
| Publication | `https://onemillionpieces.substack.com` |
| **RSS feed** | `https://onemillionpieces.substack.com/feed` |
| Subscribe | `https://onemillionpieces.substack.com/subscribe` |
| Test article (first fixture) | [`/p/we-are-free-son-they-are-bombing`](https://onemillionpieces.substack.com/p/we-are-free-son-they-are-bombing) |

Verified 2026-07-01: feed live, 1 item, **full body** (free post), author "Alejandro Lozada Cortés".
Save a snapshot of this feed as the test fixture for the ingestion module.

## 6. Working agreement for agents

- **Ground truth over assumption.** Read the relevant doc/token file before writing code that touches it.
- **Small, verifiable steps.** Each roadmap task ends in a "🟢 Verify" milestone — hit it.
- **Never ship an empty site.** Feed fetch must fall back to the last good content (see doc 03).
- **Respect the paid-forgiving design.** Branch rendering on `isPaywalled`; don't hard-wire "everything is free".
- **Update the decision log** in doc 07 when you resolve an open question. Update this file and
  the roadmap status when reality changes.
- **Ask when a decision is genuinely the owner's** (Alejandro) — don't guess on brand/business calls.
- **Don't commit or push** unless asked.

## 7. Current status

📋 **Planning complete; no site code yet.** Design system in place, feed verified. Next up:
**Day 0** in [`docs/05-roadmap.md`](./docs/05-roadmap.md) (scaffold Astro + deploy a hello-world to Cloudflare Pages).
