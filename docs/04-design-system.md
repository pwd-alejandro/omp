# 04 — Design System

**A complete design system already exists** in this repo:
[`.claude/skills/one-million-pieces-design/`](../.claude/skills/one-million-pieces-design/) (auto-loaded as a skill). It is the
**source of truth** for every visual and copy decision. This doc explains *what it is* and *how
it maps onto the website* — it does not redefine the brand.

> Invoke it as the `one-million-pieces-design` skill (see [`SKILLS.md`](../SKILLS.md)). Always
> read its `readme.md` and start from `styles.css` before building UI.

## The direction: "Ledger"

A modern, rigorous newsroom where journalism is treated as a science — collect the pieces,
visualise the data, cite everything. Reads like *The NYT* / *The Atlantic*, but fresher and
unmistakably built by people who understand data. **Warm ink on paper, one vermillion action
colour, data as the primary storytelling medium.**

## What ships in the system

| Folder | Contents | Use for |
|---|---|---|
| `styles.css` | Entry point — imports fonts + all tokens | Link this first; everything hangs off it |
| `tokens/` | `colors.css`, `fonts.css`, `typography.css`, `spacing.css` | The design tokens. Reference **semantic aliases**, never raw hex |
| `components/` | React specimens: `brand/`, `core/` (Button, Tag, Badge), `editorial/` (Byline, ArticleCard, PullQuote, RuleHeading, SourceChip), `data/` (StatCallout, BarChart, Sparkline, DataTable), `forms/` (Input, SubscribeField) | Reuse/port these rather than inventing |
| `guidelines/` | Foundation specimen cards (type, colour, spacing, brand) + `wordmark.html` | Reference for correct usage |
| `ui_kits/` | `homepage/index.html`, `newsletter/index.html` | Full-page reference layouts to build from |
| `assets/logos/` | `omp-mark.svg` (2-colour), `omp-mark-mono.svg` | The mosaic mark — logo/favicon/avatar |

## Tokens (the essentials)

**Colour** — reference semantic aliases (`--text-primary`, `--surface-card`, `--text-accent`,
`--border-subtle`, `--action-primary-bg`, …), never primitives.
- Paper `#F7F3EA` (page), card lift `#FCFAF4`, hairline `#E4DDCE`.
- Ink `#1B1712` (primary), `#57534A` (secondary), `#8A857B` (tertiary).
- **Vermillion `#C63A22`** — the single action/brand colour (links, primary buttons, kickers, rules).
- Stable categorical **data palette** (vermillion, teal, ochre, olive, plum, sky, clay, gray) + a vermillion sequential ramp for charts.

**Type** — three families, each with a job:
- **Newsreader** (serif) — display, headlines, all long-form reading. Display 56px, tight −0.022em tracking; body 17px at 1.62 line-height, measure ~65ch.
- **Libre Franklin** (sans) — kickers, nav, labels, captions, buttons.
- **Spline Sans Mono** — all figures, timestamps, source lines; **tabular numerals** always.
- Scale/weights/tracking are defined in `tokens/typography.css`; utility classes: `.omp-display`, `.omp-h1…h4`, `.omp-lead`, `.omp-body`, `.omp-kicker`, `.omp-mono`, `.omp-figure`.

**Shape & motion** — small radii (2–10px, cards ~6px), hairline rules, sparse warm shadows;
fast mechanical motion (~60ms), press-scale 0.98, vermillion underline on hover. Nothing bounces.

## How it maps onto the website

| Page (from [`01`](./01-architecture.md)) | Build from | Key system pieces |
|---|---|---|
| `/` home | `ui_kits/homepage/index.html` | Masthead + 2px ink rule nav, story grid, `ArticleCard`, "By the numbers" strip, `StatCallout` |
| `/articles` index | homepage grid patterns | `ArticleCard`, `Tag`, `RuleHeading` |
| `/article/[slug]` | editorial components | `Byline`, `PullQuote`, `SourceChip`, `.omp-body` prose, end-of-piece `SubscribeField` |
| `/subscribe` | `forms/` | `SubscribeField`, `Button` → Substack |
| Newsletter parity | `ui_kits/newsletter/index.html` | Keep the site and "The Daily Brief" email visually coherent |

### Styling Substack's article HTML
Article bodies arrive as sanitized HTML from RSS. Style them in one `.omp-body`/`.prose` scope
so Substack's headings, blockquotes, images, lists, and footnotes render in Newsreader on paper,
with vermillion links — **without editing the source HTML**. Map Substack pull-quotes to
`PullQuote` styling and any inline citations toward the `SourceChip` look where feasible.

## Voice & copy rules (apply to all UI text)

- Declarative, specific headlines that usually carry a number or finding.
- Kickers are uppercase topic labels: `INVESTIGATION · HOUSING`, `DATA`, `ANALYSIS · ELECTIONS`.
- Deks: one serif sentence saying what the piece found and how.
- Sentence-case, verb-first buttons ("See the data", "Read the analysis"). Never "Click here".
- Every data claim cites its source inline. **No emoji, no exclamation marks, no hype.**

## Production wiring (do this during the design-system build day)

1. **Fonts:** the system loads Newsreader / Libre Franklin / Spline Sans Mono from Google Fonts
   (OFL licensed). For production, **self-host** the binaries and swap `@import` for `@font-face`.
2. **Icons:** [Lucide](https://lucide.dev) (monoline, 1.75px) is the chosen UI icon set — a
   documented substitution; the mosaic mark is the only proprietary glyph. No emoji.
3. **Tokens over Tailwind:** if Tailwind is used, configure it to consume these tokens; the CSS
   variables remain the source of truth.
4. **Copy the design system's assets** into the Astro app (don't hotlink across the folder).
5. **Imagery:** kit thumbnails are placeholders — use real, de-saturated (`saturate(0.92)`)
   documentary photography, and prefer leading with data-viz.

## Accessibility & quality bar

WCAG AA contrast, visible focus (`--focus-ring` vermillion), semantic HTML, alt text, keyboard
nav, `prefers-reduced-motion`. Lighthouse ≥95 Performance/Accessibility/SEO on home + article.
Test light/dark and mobile/desktop.

## Caveat

This is a **new brand designed from scratch** (only the name was given) — mark, palette, type
pairing and voice are strong proposals to iterate on with Alejandro, not immutable law. If the
brand evolves, update the design system first, then this doc.
