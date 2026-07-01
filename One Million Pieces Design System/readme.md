# One Million Pieces — Design System

A self-contained design system for **One Million Pieces**, a modern, rigorous
newsroom where journalism is treated as a science: it seeks truth by collecting
information, visualising data, debating, and caring about nothing but the facts.
The name is the thesis — everything is made of a million pieces, and to begin to
understand anything you have to collect them all.

The system is **data-driven, highly visual, intellectual, and built to the
highest quality**. It reads like *The New York Times* and *The Atlantic* — but
fresher, and unmistakably made by people who understand data and software.

> **Direction:** "Ledger" — classic-fresh, warm ink on paper, a single
> vermillion action colour, and data treated as the primary storytelling medium.
> (Chosen from three explored directions; see `Brand Directions.dc.html`.)

---

## How to use this kit

Link the one entry stylesheet, then use semantic tokens and the utility classes:

```html
<link rel="stylesheet" href="styles.css">
```

`styles.css` imports the fonts and every token file. Wrap content and reference
tokens — never hard-code a hex that lives in the token set.

```html
<h1 class="omp-display">The pieces, collected.</h1>
<span class="omp-kicker">Investigation · Housing</span>
<div class="omp-figure" style="font-size:44px;">4.2M</div>
```

---

## Content fundamentals

The voice is **precise, plain-spoken and quietly authoritative** — a brilliant
colleague explaining what the data actually shows, never a marketer.

- **Headlines are declarative and specific**, and they almost always carry a
  number or a finding: *"The 4.2 million records behind an eviction crisis"*,
  *"How 30,000 precincts actually voted"*. Never vague or punny.
- **Kickers** are uppercase topic labels: `INVESTIGATION · HOUSING`, `DATA`,
  `ANALYSIS · ELECTIONS`. One or two words plus an optional " · ".
- **Deks** (standfirsts) are one sentence of serif that says what the piece
  found and how — often *"We collected every … since …"*.
- **Sentence case** everywhere in UI ("See the data", "Read the analysis"),
  verb-first buttons, never "Click here" / "Submit".
- **Every data claim cites its source**, inline, as a source chip. Provenance is
  a brand value, not a footnote.
- **Numbers are the argument.** Figures are set in mono with tabular numerals so
  the record always looks like a record. Use a real figure over a hedge.
- **No emoji. No exclamation marks. No hype.** En-dashes for ranges (2016–2024),
  em-dashes sparingly for asides. Thin, factual metadata: `12 MIN · DATA DESK`.
- **Don't pad.** One good sentence beats a paragraph; a real chart beats a stock
  photo. When there's no data, say so plainly.

## Visual foundations

**Type.** Three families, each with a job:
- **Newsreader** (serif) — display, headlines and all long-form reading. Screen-
  optimised, high-contrast, literary. Display headlines run to 56px with tight
  −0.02em tracking; body is 17px at 1.62 line-height, measure held near 65ch.
- **Libre Franklin** (sans) — the machinery of the page: kickers, nav, labels,
  captions, buttons. A Franklin-Gothic revival, honest and newspapery.
- **Spline Sans Mono** (mono) — data, figures, timestamps, source lines. Always
  tabular numerals.

**Colour.** Warm **paper** `#F7F3EA` and near-black warm **ink** `#1B1712` carry
almost everything. A single **vermillion** `#C63A22` is the only action/brand
colour — links, primary buttons, the highlighted bar, the kicker. A stable
**categorical data palette** (vermillion, teal, ochre, olive, plum, sky, clay,
gray) serves charts, plus a vermillion **sequential ramp** for intensity. Status
uses olive / ochre / red. Product UI references **semantic aliases**
(`--text-accent`, `--surface-card`, `--border-subtle`), never primitives.

**Surfaces & shape.** Print-like and crisp. Small radii (2–10px; cards ~6px),
hairline `#E4DDCE` rules and 2–3px department rules do most of the structural
work. Shadows are sparse and warm (`--shadow-card` is barely there); elevation
is reserved for menus and dialogs. Cards are near-square with a 1px border and a
whisper of shadow — not floaty.

**Imagery.** De-saturated (`saturate(0.92)`), warm, documentary — never glossy
stock. But the house instinct is to **lead with data visualisation** (charts,
tables, maps, big figures) rather than decorative photography.

**Layout.** A visible editorial grid: centered masthead, a 2px ink rule under the
section nav, department dividers, multi-column story grids, a vermillion-ruled
"By the numbers" strip. Structure is part of the argument.

**Motion.** Fast and mechanical — 60ms interaction transitions, buttons scale to
0.98 on press, images ease up 3% on hover over 400ms. Nothing bounces. Hover on
links and headlines reveals a vermillion underline; hover on quiet buttons fills
with the inset paper tone.

## Iconography

The brand's own **mosaic mark** (a 4×4 grid, two vermillion tiles) is the single
proprietary glyph — used as logo, favicon and avatar (`assets/logos/`).

For UI icons the system uses **[Lucide](https://lucide.dev)** — monoline, 1.75px
stroke, rounded joins — which matches the crisp editorial feel. Load from CDN and
size at 20px (16 dense, 24 tile); icons inherit `currentColor`.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="search"></i>  <!-- then lucide.createIcons() -->
```

> ⚠ **Substitution flag:** Lucide is a stand-in chosen for stroke/style fit — swap
> for a bespoke set if the brand commissions one. **No emoji** in product UI.
> Simple directional glyphs (→ ↗ ↑) may be set in type where an icon is overkill.

---

## Index / manifest

**Root**
- `styles.css` — entry point (imports fonts + all tokens)
- `readme.md` — this guide
- `SKILL.md` — Agent-Skill wrapper
- `Brand Directions.dc.html` — the three explored directions (Ledger = chosen)

**tokens/** — `fonts.css` · `colors.css` · `typography.css` · `spacing.css`

**components/** (React `.jsx` + `.d.ts` + `.prompt.md`, one specimen card each)
- `brand/` — `Logo`
- `core/` — `Button` · `Tag` · `Badge`
- `editorial/` — `Byline` · `ArticleCard` · `PullQuote` · `RuleHeading` · `SourceChip`
- `data/` — `StatCallout` · `BarChart` · `Sparkline` · `DataTable`
- `forms/` — `Input` · `SubscribeField`

**guidelines/** — foundation specimen cards (Type, Colors, Spacing, Brand) +
`wordmark.html` (identity: construction, lockups, clearspace, misuse)

**ui_kits/**
- `homepage/index.html` — the front page
- `newsletter/index.html` — The Daily Brief email template

**assets/logos/** — `omp-mark.svg` (2-colour), `omp-mark-mono.svg` (currentColor)

---

## Caveats & sources

- **Fonts** (Newsreader, Libre Franklin, Spline Sans Mono) are all open-licensed
  (OFL) and currently loaded from Google Fonts in `tokens/fonts.css`. For
  production, self-host the binaries and swap the `@import` for `@font-face`.
- **Icons**: Lucide via CDN is a substitution — see Iconography above.
- **Imagery**: story thumbnails in the kits are placeholders; drop in real,
  de-saturated documentary photography.
- This is a **new brand designed from scratch** (name only was provided) — the
  mark, palette, type pairing and voice are all proposals to iterate on.

> **Sharing:** set this project's File type to **Design System** in the Share
> menu so others in your org can view and consume it.
