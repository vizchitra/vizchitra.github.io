# VizChitra Site Architecture

## Purpose

A content-first SvelteKit site for conference and community pages for VizChitra. Built as a fully static, prerendered site that favors CSS-first design tokens and Tailwind v4 utilities for consistent, maintainable UI.

## Architecture Principles

- Keep simple one-word links
- Keep max navigation depth to 2
- Refer to [DESIGN.md](file:///Users/amitkaps/Documents/@github/vizchitra.github.io/DESIGN.md) for visual and UI principles.

## Project Structure

vizchitra.github.io/
├ content/      (Markdown/mdsvex files)
├ src/
│ ├ lib/
│ │ ├ assets/   (fonts, tokens, images)
│ │ ├ components/ (interface, typography, layout, structure, sections)
│ │ ├ config/
│ ├ routes/
│ ├ app.css
│ ├ app.html
├ static/       (static data and assets)
├ build/        (output)

## Related Documentation

- [DESIGN.md](file:///Users/amitkaps/Documents/@github/vizchitra.github.io/DESIGN.md): Detailed design system, tokens, and component taxonomy.
- [agents.md](file:///Users/amitkaps/Documents/@github/vizchitra.github.io/agents.md): Tactical operating manual for AI agents.

## Build & Deploy

- **Build:** run `pnpm build` (runs `vite build` per `package.json`).
- **Adapter:** uses `@sveltejs/adapter-static` (configured in `svelte.config.js`); output written to `build/`.
- **Prerender:** global prerendering enabled via `export const prerender = true;` (see `src/routes/+layout.svelte`), with enumerated entries and redirects configured in `svelte.config.js`.
- **Assets:** static files live in `static/`; Vite-bundled assets should be referenced via `$lib` imports or absolute `/` paths to avoid nested-route lookup failures.


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

## Suggested Follow-up Edits

- Normalize imports to `$lib` across `src/lib/components/**`.
- Convert derived token expressions in `src/lib/assets/css/tokens.css` to explicit OKLCH numeric values.
- Confirm font asset resolution in `src/app.html` and consider moving fonts to `static/` if necessary.
- Run `pnpm build` and a `pnpm preview` smoke-test for key pages: `/`, `/2025/conference`, `/sponsorship`, `/team`, `/polygon-playground`, and an example `[slug]` page.
