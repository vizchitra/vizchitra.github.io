# AI Agent Instructions (VizChitra)

This repo powers the **VizChitra: An Indian Data Visualizations Community** website. It is **static, content-heavy, and performance/accessibility-first**: prefer HTML + CSS (Tailwind) and use minimal JS only when it improves usability.

---

## Agent Mindset

These rules are designed to optimize for long-term maintainability, consistency, and static delivery. When in doubt, prefer clarity over cleverness.

---

## Stack (source of truth)

- **SvelteKit** (Svelte v5) + **@sveltejs/adapter-cloudflare** (deployed to Cloudflare Pages)
- **Content Collections** (`@content-collections/core`) for Markdown pages (`content/`)
- **Tailwind CSS v4** (`@tailwindcss/vite`) for styling
- **TypeScript** + **Zod** for type safety and schema validation
- **Vite** as build and dev tool
- **PNPM** as package manager (v10.33+, Node ≥ 22.16)
- **Lefthook** for git pre-commit hooks (format + lint)
- **Wrangler** for Cloudflare Pages preview (`pnpm run preview`)

---

## Repo layout (high level)

```
content/
  pages/           — Standalone markdown pages (community, ethos, conduct, tools…)
  guides/          — Facilitator guides (talks/, workshops/, dialogues/, exhibition/, panels/)

lab/               — Design-system audit markdown docs (served via /studio route)

src/
  app.css          — Tailwind entry + @theme static tokens + base layer global styles
  app.html         — HTML shell
  hooks.server.ts  — Cloudflare/server hooks
  lib/
    assets/
      css/
        fonts.css  — @font-face declarations (IBM Plex Sans, Cairo, Fira Code)
        tokens.css — LEGACY canonical --viz-* variables (NOT imported; kept for reference)
        style.css  — LEGACY/unused global styles (not imported anywhere)
    components/    — All reusable UI components (see taxonomy below)
    config/        — App-level config (if any)
    content/
      schemas.ts   — Shared Zod schemas (single source of truth for frontmatter)
    data/          — Static data files (CSV/JSON): sessions, team, sponsors, orgs, roles…
    markdown/
      directive.js            — Remark plugin: VizChitra custom directives
      directive.test.js       — Tests for directive plugin
      directives.config.ts    — Directive registry (notice, slanted…)
      table-labels.js         — Rehype plugin: table label injection
    studio/        — Studio editor logic (session.ts, staging.ts, contentSchemas.ts, editor/)
    tokens.ts      — TypeScript color tokens (hex + OKLCH values, for JS use)
    types/         — Shared TypeScript types
    utils/         — Utility functions (actions, csv-parser, device-id, markdown, sessions…)
  routes/
    +layout.svelte / +layout.ts / +layout.server.ts
    +page.svelte / +page.ts   — Homepage
    [slug]/                   — Generic content page route (renders content/pages/*.md)
    2025/                     — VizChitra 2025 conference pages
    2026/                     — VizChitra 2026 conference pages (proposals, sessions, talks…)
    404/                      — Custom 404 page
    api/
      proposals/              — Proposal submission API endpoints
      studio/                 — Studio backend API endpoints
    guides/                   — Guides listing + [guideSlug] detail pages
    guides.md/                — (route alias)
    lab/                      — Design system lab / audit viewer
    studio/                   — Content editing Studio (auth, login, logout, [slug])
    team/                     — Team page
    tools/                    — Tools page

static/            — Served as-is (images, fonts, docs). Use absolute /… paths.
scripts/           — Node scripts (e.g. fetch_data.js)
audit/             — CSS/Tailwind audit scripts (audit.js, tailwind-audit.js)
content-collections.ts — Content Collections config (collections: pages, guides, audits)
studio.config.ts   — Studio UI config (collections: Pages, Talks, Workshops, Dialogues…)
svelte.config.js   — SvelteKit config (adapter-cloudflare, prerender settings, alias)
vite.config.js     — Vite config
lefthook.yml       — Pre-commit hooks (format TS/JS/Svelte/MD, lint)
workflow.md        — Git branching and PR workflow
```

---

## Changelog

Always update `changelog.md` at the end of every session before committing.

- Append a new entry at the top (newest-first).
- Format: `## YYYY-MM-DD — <short title>` then **What changed**, **Why**, **Key files**, **Notes for next agent**.
- One entry per logical change group (not per commit).
- The pre-commit hook (lefthook) auto-formats and lints staged files; it does **not** block on changelog absence — but the convention must still be followed manually.

---

## Non-negotiables (automated edits must follow)

1. **Cloudflare-first**: Uses `@sveltejs/adapter-cloudflare`, not `adapter-static`. Prerendering is configured with `entries: ['*']`. API routes (`/api/*`) and Studio routes (`/studio*`) are excluded from the prerender error handler.
2. **Import strategy**: Use barrel exports (`import { Component } from '$lib/components'`) for all component imports. Avoid direct `.svelte` imports from other directories.
3. **Markdown policy**: Do **not** embed Tailwind utility classes inside Markdown files in `content/`.
4. **Token determinism**: Use `--color-viz-*` tokens from `src/app.css` (`@theme static` block). Do **not** use `--viz-*` variables from `tokens.css` (legacy/unused). Avoid ad-hoc hex values.
5. **Accessibility**: Semantic HTML, alt text, keyboard support, and visible focus states.
6. **Schema discipline**: Frontmatter changes must be reflected in **both** `src/lib/content/schemas.ts` (Zod) **and** `content-collections.ts`. `schemas.ts` is the single source of truth.

---

## Design system & styling (Tailwind + tokens)

### CSS-first model (how styling works here)

The token system has **two layers**. Always use the upper layer (`@theme static` in `app.css`):

| Layer                       | File                            | Prefix                                   | Status                          |
| --------------------------- | ------------------------------- | ---------------------------------------- | ------------------------------- |
| Tailwind tokens (active)    | `src/app.css` (`@theme static`) | `--color-viz-*`, `--color-{hue}-{shade}` | ✅ Use this                     |
| Canonical CSS vars (legacy) | `src/lib/assets/css/tokens.css` | `--viz-*`                                | ⚠️ Not imported; reference only |

### Active token structure (src/app.css → @theme static)

**Color ramps** (11 stops, standardized lightness 50→950):

- `--color-yellow-{50…950}`, `--color-teal-{50…950}`, `--color-blue-{50…950}`
- `--color-orange-{50…950}`, `--color-pink-{50…950}`, `--color-grey-{50…950}`

**Named semantic variants** (use these in components):

- Base: `--color-viz-yellow` / `-teal` / `-blue` / `-orange` / `-pink` / `-grey`
- Subtle (100): `--color-viz-{hue}-subtle` — large airy backgrounds, section containers
- Light (200): `--color-viz-{hue}-light` — hover states on subtle backgrounds
- Muted (300): `--color-viz-{hue}-muted` — borders, disabled, quiet elements
- Solid (700): `--color-viz-{hue}-solid` — high-contrast icons & fills
- Dark (800): `--color-viz-{hue}-dark` — text on light backgrounds

**Semantic roles**:

- `--color-bg` → `--color-viz-white` (studio white: `oklch(99% 0.002 240)`)
- `--color-fg` → `--color-viz-black` (deep charcoal: `oklch(18% 0.005 240)`)
- `--color-muted` → `--color-viz-grey-muted`
- `--color-border` → `--color-viz-grey-muted`
- `--color-link` → `--color-viz-blue-dark`
- `--color-accent` → `--color-viz-pink`

**Typography tokens** (`@theme static`):

- `--font-body` / `--font-base` → IBM Plex Sans (`--font-plex`)
- `--font-display` → Cairo (`--font-cairo`)
- `--font-mono` → Fira Code (`--font-fira`)

**Fluid type scale** (`--text-viz-xs` through `--text-viz-7xl`):

- Driven by `--text-base: clamp(1rem, 0.904rem + 0.38vw, 1.25rem)` and `--ratio: 1.125`

**Fluid spacing scale** (`--spacing-viz-xs` through `--spacing-viz-7xl`):

- Driven by `--space-base: clamp(1rem, 0.84rem + 0.77vw, 1.5rem)`

**Width tokens**: `--width-prose: 65ch`, `--width-narrow: 28rem`, `--width-content: 80rem`, `--width-wide: 90rem`

### Token usage rules

- **No raw hex** in class strings (e.g. avoid `bg-[#747474]`).
- Prefer `--color-viz-*` semantic names over raw ramp stops.
- If a new color is needed:
  1. Add to `src/lib/tokens.ts` if needed as a JS constant.
  2. Add the CSS variable to the `@theme static` block in `src/app.css`.
  3. No separate `tokens.css` entry needed.

### Tailwind conventions (practical)

- Mobile-first utilities; add `sm:`, `md:`, `lg:`, `xl:` only when needed.
- Keep spacing consistent (use Tailwind scale; prefer `gap-*`).
- Avoid bespoke one-off arbitrary values unless unavoidable; if repeated, promote to a shared pattern.
- Global utility classes defined in `@layer base` in `app.css`: `.full-bleed`, `.visually-hidden`, `.content-text`, `.content-heading`, `.content-subheading`, `.content-container`, `.content-notice`.

### Fonts

- Fonts are declared via `@font-face` in `src/lib/assets/css/fonts.css` (imported into `app.css`).
- Tailwind-facing font families are exposed via `@theme static` in `src/app.css`: `font-body`, `font-display`, `font-mono`.

---

## Content (Content Collections / Markdown)

### Collections (defined in `content-collections.ts`)

| Collection | Directory         | Route                                 |
| ---------- | ----------------- | ------------------------------------- |
| `pages`    | `content/pages/`  | `/{slug}` via `src/routes/[...slug]/` |
| `guides`   | `content/guides/` | `/guides/{guideSlug}`                 |
| `audits`   | `lab/`            | `/lab/…` (Studio/lab viewer)          |

### Markdown pipeline

All collections use:

- `remark-gfm` — GitHub-flavoured Markdown tables, strikethrough, etc.
- `remark-directive` + `remarkVizchitraDirectives` — custom VizChitra directives
- `rehypeTableLabels` — inject `<caption>` labels into tables
- `allowDangerousHtml: true`

### Custom directives (registered in `src/lib/markdown/directives.config.ts`)

| Name      | Type      | Purpose                                                 |
| --------- | --------- | ------------------------------------------------------- |
| `notice`  | container | Highlighted notice/callout block                        |
| `slanted` | text      | Per-letter slanted heading text (render-only transform) |

To add a new directive: register it in `directives.config.ts`, implement the remark handler in `directive.js`, and add a Studio bridge entry in `contentSchemas.ts` if editable.

### Frontmatter schemas (single source of truth: `src/lib/content/schemas.ts`)

**pages** (required):

```yaml
---
title: string # required
description: string # optional (~150–160 chars)
slug: string # required
banner: polygon | curve | square | blob # optional
color: grey | pink | blue | teal | yellow | orange # optional
draft: boolean # optional, default false
---
```

**guides** (required):

```yaml
---
title: string # required
description: string # required
guide: talks | workshops | dialogues | exhibition | panels # required
section: string # required
order: number # required (for sorting within guide)
draft: boolean # optional, default false
---
```

**audits** (required):

```yaml
---
title: string
description: string # optional
category: typography | tokens | components | patterns | audit # required
draft: boolean # optional
generated: boolean # true for auto-generated audit files
order: number # optional (for sorting)
---
```

### Markdown styling rule

- Do not add Tailwind classes inside Markdown.
- Styling must be applied by the renderer/wrapper component (e.g. a `prose` wrapper in Svelte), or via dedicated components.

---

## Components (taxonomy + boundaries)

### Where things go

| Directory                         | Purpose                                                                                                                                                                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/components/interface/`   | Reusable UI primitives: Button, Card, CallCard, FormatCard, ToolsCard, Dropdown, Deadline, MarqueeRow, VideoModal, ColumnChart, SquarePortraitDesigner, InlineSvg, ColorSwatch, BreadCrumb, CursorHint, DeckCard, DeckOverview, SpeakerDeck, ButtonBar, ToolsHeader |
| `src/lib/components/typography/`  | Text primitives/wrappers (Heading, Text, Prose, etc.)                                                                                                                                                                                                               |
| `src/lib/components/layout/`      | Compositional layout primitives (Stack, Grid, Container, etc.)                                                                                                                                                                                                      |
| `src/lib/components/patterns/`    | Visual patterns and decorations (banners, dividers, SVG patterns)                                                                                                                                                                                                   |
| `src/lib/components/structure/`   | Global chrome (Header, Footer, navigation)                                                                                                                                                                                                                          |
| `src/lib/components/sections/`    | Reusable page blocks (conference sections, FAQ, team, etc.)                                                                                                                                                                                                         |
| `src/lib/components/proposals/`   | Proposal-specific components (ProposalCard, filters, etc.)                                                                                                                                                                                                          |
| `src/lib/components/sessions/`    | Session card components (SessionCardExpanded, SessionCardBackground, PatternComingSoon)                                                                                                                                                                             |
| `src/lib/components/controls/`    | (Reserved; currently empty — for future interactive controls)                                                                                                                                                                                                       |
| `src/routes/<route>/_components/` | Route-only components tightly coupled to one page                                                                                                                                                                                                                   |

### Imports

**Standard Pattern (Recommended):**

```typescript
import { Button, Stack, Header, Heading } from '$lib/components';
```

**Alternative (for better IDE context):**

```typescript
import { Button, Card } from '$lib/components/interface';
import { Stack, Grid } from '$lib/components/layout';
```

**Rules:**

- ✅ Use root barrel export (`$lib/components`) for all component imports
- ✅ Category-level imports (`$lib/components/layout`) are acceptable
- ❌ Avoid direct `.svelte` imports from other directories: `'$lib/components/interface/Button.svelte'`
- ✅ Exception: Sibling components in same directory can use relative imports: `'./SessionCardBackground.svelte'`
- See [`src/lib/components/README.md`](src/lib/components/README.md) for complete import guidelines

---

## Assets (images, fonts, paths)

- Put static images in `static/images/`.
- Reference images using absolute paths:
  - Markdown: `![Alt text](/images/file.webp)`
  - Svelte: `<img src="/images/file.webp" alt="..." />`
- Use `%sveltekit.assets%` only in `src/app.html` when needed.
- Always include descriptive `alt` text.
- Prefer modern formats (`.webp`, `.avif`) for photos.
- Avoid unbounded intrinsic sizes; specify width/height when possible to reduce CLS.
- Cloudflare excludes `/fonts/*`, `/images/*`, `/docs/*`, `/app/*` from its workers routes (handled as static assets).

---

## Prerendering & deployment

- Uses `@sveltejs/adapter-cloudflare`. Deployed to Cloudflare Pages.
- `svelte.config.js` configures `prerender.entries: ['*']` with `concurrency: 8`.
- **Skipped from prerender error handler**: `/api/*`, `/studio*`, `/app/*`, and paths listed in `_redirects`.
- `handleMissingId: 'ignore'`, `handleUnseenRoutes: 'ignore'`.
- API routes (`src/routes/api/`) are **server-only** (Cloudflare Workers functions).
- Studio route (`src/routes/studio/`) is **not prerendered** — excluded from error handler.
- Redirects are defined in `_redirects` (Cloudflare Pages format) — this is the single source of truth. `svelte.config.js` reads `_redirects` at build time to exclude those paths from prerender errors.
- `output.bundleStrategy: 'split'` for code-splitting per route.

---

## Build & scripts

```bash
pnpm dev          # dev server (--host)
pnpm build        # production build (prerender)
pnpm run preview  # Cloudflare Pages preview via wrangler
pnpm check        # svelte-kit sync + svelte-check
pnpm format       # oxfmt (TS/JS) + prettier (Svelte/MD)
pnpm lint         # format check only
pnpm lint:code    # oxlint
pnpm data:fetch   # node scripts/fetch_data.js (fetch remote data → src/lib/data/)
pnpm audit:css    # CSS audit (node audit/audit.js)
pnpm audit:tailwind  # Tailwind audit
```

- Pre-commit hooks via **lefthook** (`lefthook.yml`):
  - `oxfmt` — formats staged `.{ts,js,mjs,cjs,json}` files
  - `prettier` — formats staged `.{svelte,md}` files
  - `oxlint` — lints staged `.{ts,js,svelte}` files
  - Staged fixes are auto-staged (`stage_fixed: true`)

---

## SEO requirements (minimum)

Each page should have:

- Title + meta description
- Open Graph tags for sharing
- Twitter card tags

In Svelte routes, use `<svelte:head>` and populate title/description from load data.

```svelte
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { title, description } = data;
</script>

<svelte:head>
	<title>{title} | VizChitra</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
```

**Note**: Use Svelte 5 runes syntax (`$props()`) instead of `export let`.

---

## Common workflows (repo-specific)

### Add a content page

1. Add `content/pages/<slug>.md` with required frontmatter (title, slug).
2. Routing resolves via `src/routes/[...slug]/+page.svelte`.
3. Confirm prerender can discover the page (linked from another page, or listed in load function).

### Add a guide section

1. Add `content/guides/<guide-type>/<section>.md` with required frontmatter (title, description, guide, section, order).
2. Routing resolves via `src/routes/guides/[guideSlug]/+page.svelte`.
3. Register new `guide` enum values in `src/lib/content/schemas.ts` and `content-collections.ts` if needed.

### Add a UI component

1. Create under `src/lib/components/<category>/ComponentName.svelte`.
2. Type all props (TypeScript).
3. Use Tailwind utilities backed by `--color-viz-*` tokens (no hex).
4. Export from the category's `index.ts` barrel file:
   ```typescript
   export { default as ComponentName } from './ComponentName.svelte';
   ```
5. Verify the root `src/lib/components/index.ts` re-exports the category (already does for all categories).
6. Import the component using barrel exports:
   ```typescript
   import { ComponentName } from '$lib/components';
   ```

### Add a utility

1. Create `src/lib/utils/<name>.ts` with explicit types.
2. Import via `$lib/utils/<name>`.

### Add a data file

1. Place CSV or JSON in `src/lib/data/`.
2. CSV files need a type declaration (see `csv.d.ts` pattern).
3. Import directly in `.ts` / `.server.ts` load functions.

### Add a markdown directive

1. Add entry to `directives` array in `src/lib/markdown/directives.config.ts`.
2. Implement the remark handler in `src/lib/markdown/directive.js`.
3. If it should be editable in Studio, add a bridge entry in `src/lib/studio/contentSchemas.ts`.

---

## Code style (for edits)

- Indentation: **2 spaces**
- JS/TS quotes: **single**
- HTML attributes: **double**
- Keep lines ~80–100 chars (hard max 120)
- Keep components small; extract if they grow beyond ~150 lines
- Svelte 5 runes: use `$props()`, `$state()`, `$derived()`, `$effect()` — no `export let`

---

## Verification checklist (before submitting)

- [ ] `pnpm build` passes; prerender crawler has no 404s on public routes
- [ ] Component imports use barrel exports: `import { Component } from '$lib/components'`
- [ ] No direct `.svelte` imports from other directories (except sibling components)
- [ ] No Tailwind classes embedded in `content/` markdown
- [ ] No raw hex colors; `--color-viz-*` tokens used (`@theme static` in `app.css`)
- [ ] Frontmatter changes reflected in `src/lib/content/schemas.ts` AND `content-collections.ts`
- [ ] Accessibility: semantic elements, focus states, keyboard support, alt text
- [ ] All interactive elements must be reachable and usable via keyboard alone
- [ ] SEO tags present (title, description, Open Graph, Twitter card)
- [ ] Mobile-first layout looks correct across breakpoints
- [ ] `changelog.md` updated with a new entry at the top
