# SKILLS.md

Catalogue of reusable **skills** available in this repository, and how agents should use them.
See [`AGENTS.md`](./AGENTS.md) for the overall operating manual.

> **Convention:** a skill is a directory containing a `SKILL.md` with YAML frontmatter
> (`name`, `description`, `user-invocable`) followed by instructions — the
> [Claude Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills) format.
> Agents load a skill's `SKILL.md` when its `description` matches the task at hand.

---

## Available skills

### 1. `one-million-pieces-design` — the brand design system

- **Location:** [`.claude/skills/one-million-pieces-design/SKILL.md`](./.claude/skills/one-million-pieces-design/SKILL.md) — auto-loaded by Claude Code (directory name matches the skill `name`).
- **Use it when:** building *any* interface, page, component, mock, or asset for this site —
  production or throwaway. If you are choosing a colour, a font, spacing, a component, or
  writing UI copy, this skill applies.
- **What it contains:** design tokens (`tokens/colors.css`, `fonts.css`, `typography.css`,
  `spacing.css`), the `styles.css` entry point + `omp-*` utilities, React component specimens
  (`components/`), foundation guideline cards (`guidelines/`), and full page kits
  (`ui_kits/homepage`, `ui_kits/newsletter`).
- **How to use it (from the skill's own instructions):**
  1. Read `.claude/skills/one-million-pieces-design/readme.md` first, then explore the files.
  2. Start from `styles.css` — link it, use the **semantic tokens** and `omp-*` classes.
  3. Reuse the components under `components/` and the layouts under `ui_kits/`.
  4. For production code: **copy assets into the app** and follow the rules as an expert.
  5. For throwaway visuals: copy assets out and produce static HTML the user can view.
- **Hard rules:** warm ink on paper; one vermillion action colour; Newsreader (read/headlines)
  + Libre Franklin (UI) + Spline Sans Mono (figures/metadata); data-viz as the primary medium;
  cite every data claim; **no emoji**. Reference semantic tokens, never raw hex.
- **Paths:** the skill's files (`styles.css`, `tokens/`, `components/`, `ui_kits/`, `assets/`)
  live under `.claude/skills/one-million-pieces-design/`.

---

## Project skills / recipes (to add as the build progresses)

As the site takes shape, add focused skills here so future agents follow the same procedures.
Candidates (create each as its own `SKILL.md` when the code exists):

- **`add-a-page`** — how to add a new route/page using the design tokens and layout primitives.
- **`update-ingestion`** — how to safely change the Substack RSS ingestion/normalisation module,
  including updating the test fixture (see [`docs/03-content-sync.md`](./docs/03-content-sync.md)).
- **`build-a-data-figure`** — how to author an on-brand chart/table/stat callout (the house style
  leads with data), reusing the `data/` components and citing sources.
- **`publish-now`** — how to trigger an out-of-schedule rebuild/deploy (see
  [`docs/06-setup-and-deployment.md`](./docs/06-setup-and-deployment.md)).

Keep each skill small, single-purpose, and pointed at the relevant doc for detail.

---

## How agents should choose a skill

1. Read [`AGENTS.md`](./AGENTS.md).
2. If the task is **visual/branded** → load `one-million-pieces-design`.
3. If the task touches **content/RSS** → read [`docs/03-content-sync.md`](./docs/03-content-sync.md).
4. If the task is **deploy/infra** → read [`docs/06-setup-and-deployment.md`](./docs/06-setup-and-deployment.md).
5. When in doubt, prefer reading the relevant doc over improvising.
