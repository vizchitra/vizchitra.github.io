# VizChitra Site Architecture

## Purpose

A content-first SvelteKit site for conference and community pages for VizChitra. Built as a fully static, prerendered site that favors CSS-first design tokens and Tailwind v4 utilities for consistent, maintainable UI.

## Architecture Principles

- Keep simple one-word links
- Keep max navigation depth to 2
- Prefer canonical tokens and small primitives for consistency
- Avoid Tailwind classes inside markdown content

## Project Structure

vizchitra.github.io/
├ src/
│ ├ content/
│ ├ lib/
│ │ ├ assets/ (fonts, tokens, images)
│ │ ├ components/ (ui, typography, layout, structure, sections)
│ │ ├ config/
│ ├ routes/
│ ├ app.css
│ ├ app.html
├ static/
│ ├ data/
│ ├ fonts/
│ ├ images/
│ ├ CNAME
│ ├ favicon.svg
│ └ robots.txt
├ build/
├ package.json
├ svelte.config.js
├ jsconfig.json
└ vite.config.js

## Build & Deploy

- **Build:** run `pnpm build` (runs `vite build` per `package.json`).
- **Adapter:** uses `@sveltejs/adapter-static` (configured in `svelte.config.js`); output written to `build/`.
- **Prerender:** global prerendering enabled via `export const prerender = true;` (see `src/routes/+layout.svelte`), with enumerated entries and redirects configured in `svelte.config.js`.
- **Assets:** static files live in `static/`; Vite-bundled assets should be referenced via `$lib` imports or absolute `/` paths to avoid nested-route lookup failures.

## Design System

- **Canonical tokens:** single source of truth is `src/lib/assets/css/tokens.css` (OKLCH-based `--viz-*` variables).
- **Tailwind mapping:** Tailwind-facing variables and Tailwind entrypoint live in `src/app.css` — `@theme` maps `--viz-*` → `--color-*` used by Tailwind v4 utilities.
- **Markdown policy:** content in `content/` and markdown/mdsvex files should not include utility Tailwind classes; use `prose` wrappers or small presentation components instead.
- **Token determinism:** prefer explicit numeric OKLCH values (avoid runtime `oklch(from var(...))` where determinism is required).

## Component Taxonomy (under `src/lib/components`)

- `ui/` — primitives and atoms: Button, Input, Icon, InlineSvg
- `typography/` — prose wrappers, Markdoc helpers, display text (Slanted, VizChitra logo)
- `layout/` — Container, Section, PageHeader, PolygonDivider
- `structure/` — site chrome: header, footer, banners
- `sections/` — page-specific blocks: mission, team, sponsorship, polygon-playground
  Examples: `src/lib/components/ui/Button.svelte`, `src/lib/components/typography/Slanted.svelte`, `src/lib/components/sections/mission/Mission.svelte`.

## Page Structure

/
├── ethos
├── structure
├── team
├── mission
├── conduct
├── volunteer
├── events
├── brand
├── local
│ ├── bengaluru
│ └── delhi
├── podcast
├── stream
├── videos
│
├── 2026
│ ├── proposals
│ ├── cfp
│ ├── sponsorship
│ ├── tickets
│ ├── sessions
│ ├── speakers
│ └── schedule
│
├── 2025
│ ├── proposals
│ ├── cfp
│ ├── sponsorship
│ ├── sessions
│ ├── speakers
│ ├── schedule
│ ├── videos
│ ├── feedback
│ └── photos
│
├── insights
│ ├── editorial25
│ ├── village25
│ ├── audience25
│ ├── budget25
│ ├── branding25
│ ├── communication25
│ ├── participatory25
│ ├── volunteers25
│ └── engagement25
│
└── guides
├ talks
└ …

(Keep this tree updated as routes evolve.)

## Common Pitfalls & Guidance

- Prefer `$lib/...` imports for shared modules/assets instead of fragile relative paths to reduce breakage during refactors.
- Prerender crawler: ensure every linked internal route resolves (or has an explicit redirect) so prerender doesn't encounter 404s.
- Fonts & asset paths: use `%sveltekit.assets%` in `src/app.html` or place fonts in `static/` to avoid nested-route asset requests.
- Tokens: avoid ad-hoc hex values in components; derive from `--viz-*` tokens and prefer fixed numeric OKLCH values when determinism is needed.
- Watch for large bundle warnings from Vite; split large pages with dynamic imports if necessary.

## Suggested Follow-up Edits

- Normalize imports to `$lib` across `src/lib/components/**`.
- Convert derived token expressions in `src/lib/assets/css/tokens.css` to explicit OKLCH numeric values.
- Confirm font asset resolution in `src/app.html` and consider moving fonts to `static/` if necessary.
- Run `pnpm build` and a `pnpm preview` smoke-test for key pages: `/`, `/2025/conference`, `/sponsorship`, `/team`, `/polygon-playground`, and an example `[slug]` page.
