# 06 — Setup & Deployment

Concrete accounts, domains, DNS, and deploy steps. Fill in the TODOs as you go.

## Accounts checklist

| Service | Purpose | Status |
|---|---|---|
| Substack | Content, subscriptions, payments, email | ☐ create / confirm handle |
| GitHub | This repo + CI (Actions) | ✅ (repo exists) |
| Cloudflare | Pages hosting + DNS + analytics | ☐ create |
| Domain registrar | Buy `onemillionpieces.com` | ☐ register |

> Registrar note: you can register the domain **at Cloudflare** (at-cost pricing) to keep DNS
> and hosting in one place — simplest path. Any registrar works if you point DNS to Cloudflare.

## Substack

1. Publication confirmed (live 2026-07-01):
   - Publication URL: `https://onemillionpieces.substack.com`
   - **RSS feed URL:** `https://onemillionpieces.substack.com/feed`  (used by ingestion)
   - Subscribe URL: `https://onemillionpieces.substack.com/subscribe`  (used by CTAs)
   - First/test post: `https://onemillionpieces.substack.com/p/we-are-free-son-they-are-bombing`
2. (Optional, recommended for on-brand handoff) Buy Substack's **custom domain** (one-time
   $50) and set it to a subdomain — plan: **`read.onemillionpieces.com`**. Note: Substack
   requires a subdomain (e.g. `www`/`read`), not the bare apex; the apex stays with our site.

## Domain plan

```
onemillionpieces.com          → our Astro site (Cloudflare Pages)   [apex]
www.onemillionpieces.com      → redirect to apex (or vice-versa)
read.onemillionpieces.com     → Substack (optional custom domain, on-brand handoff)
```

- Buy `onemillionpieces.com`. **TODO:** confirm availability & register.
- Keep the site on the apex so it's the primary brand address; readers only see `read.` when handing off to Substack.

## Cloudflare Pages setup

1. Create a Cloudflare account; add the domain (or register it there).
2. **Pages → Create project → Connect to Git →** select this repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `pnpm build` (or `npm run build`)
   - Build output directory: `dist`
   - Node version: set via `.nvmrc` / env (e.g. 20+).
4. Add environment variables (see below).
5. First deploy → confirm the `*.pages.dev` URL works.
6. **Custom domain:** Pages → your project → Custom domains → add `onemillionpieces.com`
   (and `www`). Cloudflare provisions SSL automatically.

## Environment variables

Keep secrets/config out of code. Set these in Cloudflare Pages **and** GitHub Actions:

| Variable | Example | Used by |
|---|---|---|
| `SUBSTACK_FEED_URL` | `https://onemillionpieces.substack.com/feed` | ingestion |
| `SUBSTACK_SUBSCRIBE_URL` | `https://onemillionpieces.substack.com/subscribe` (or `read.` custom domain) | subscribe CTAs |
| `PUBLIC_SITE_URL` | `https://onemillionpieces.com` | canonical URLs, sitemap, RSS |

No API keys are required to read a public RSS feed.

## Scheduled rebuild (GitHub Actions)

A workflow (`.github/workflows/rebuild.yml`, added on Day 5) runs on a cron and triggers a
Cloudflare deploy. Two common approaches:

- **Deploy Hook:** create a Cloudflare Pages *Deploy Hook* (a URL); the Action `curl`s it on
  schedule to trigger a fresh build (Cloudflare fetches the latest feed during that build).
  Simplest — store the hook URL as a GitHub secret `CF_DEPLOY_HOOK_URL`.
- **Build-and-upload:** the Action builds `/dist` itself and pushes to Pages via Wrangler.
  Needed only if you want the fetched feed cached into the repo.

Recommended v1: **Deploy Hook**, cron every ~20 min.

```yaml
# sketch — finalize on Day 5
on:
  schedule:
    - cron: "*/20 * * * *"
  workflow_dispatch: {}      # manual "publish now"
jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - run: curl -X POST "${{ secrets.CF_DEPLOY_HOOK_URL }}"
```

## Manual "publish now"

- Re-run the workflow (`workflow_dispatch`), or
- Cloudflare Pages → Deployments → **Retry / Create deployment**.

## DNS records (once domain is at Cloudflare)

- `onemillionpieces.com` (apex) + `www` → managed automatically when you add them as Pages custom domains.
- `read` → the CNAME/records Substack gives you during custom-domain setup (propagation up to ~36h).

> **TODO:** paste the actual records here once configured, as the source of truth.
