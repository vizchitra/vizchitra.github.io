# AI Agent Instructions (VizChitra)

This repo powers the **VizChitra: An Indian Data Visualizations Community** website. It is **static, content-heavy, and performance/accessibility-first**: prefer HTML + CSS (Tailwind) and use minimal JS only when it improves usability.

---

## Agent Mindset

These rules are designed to optimize for long-term maintainability, consistency, and static delivery. When in doubt, prefer clarity over cleverness.

---

## Stack (source of truth)

- **SvelteKit** (Svelte v5) + **@sveltejs/adapter-static**
- **MDsveX** for Markdown pages (`content/`)
- **Tailwind CSS v4**
- **TypeScript**
- **Vite**

---

## Repo layout (high level)

- `content/` — Markdown pages (`.md`) processed by MDsveX
- `src/routes/` — SvelteKit routes (`+page.svelte`, `[slug]/`, etc.)
- `src/lib/` — reusable components, utils, data, assets
- `src/app.css` — Tailwind entry + token-to-utility mapping (`@theme`)
- `src/lib/assets/css/tokens.css` — canonical `--viz-*` tokens (colors, etc.)
- `src/lib/assets/css/fonts.css` — `@font-face` declarations
- `static/` — images/fonts served as-is (use absolute `/...` paths)

---

## Non-negotiables (automated edits must follow)

1. **Static-first**: Everything must work with prerendering + adapter-static (no runtime-only routes).
2. **Import strategy**: Prefer `$lib/...` for shared modules/components. Avoid deep relative imports.
3. **Markdown policy**: Do **not** embed Tailwind utility classes inside Markdown files in `content/`.
4. **Token determinism**: Use canonical `--viz-*` tokens from `src/lib/assets/css/tokens.css`. Avoid ad-hoc hex values.
5. **Accessibility**: Semantic HTML, alt text, keyboard support, and visible focus states.

---

## Design system & styling (Tailwind + tokens)

### CSS-first model (how styling works here)

- Canonical tokens live in `src/lib/assets/css/tokens.css` as `--viz-*`.
- Tailwind utilities are created by mapping tokens in `src/app.css` using `@theme { ... }`.
- Prefer Tailwind utilities in Svelte components; avoid new global CSS unless widely reused.

### Token usage rules

- **No raw hex** in class strings (e.g. avoid `bg-[#747474]`).
- Prefer **semantic roles** when available (e.g. background/foreground/surface/link tokens), and use palette tokens for brand accents only.
- If a new “named value” is needed, add it to `tokens.css` (canonical), then map it in `app.css` (`@theme`) for Tailwind-facing utilities.

### Tailwind conventions (practical)

- Mobile-first utilities; add `sm:`, `md:`, `lg:`, `xl:` only when needed.
- Keep spacing consistent (use Tailwind scale; prefer `gap-*`).
- Avoid bespoke one-off arbitrary values unless unavoidable; if repeated, promote to a shared pattern.

### Fonts

- Fonts are defined via `@font-face` in `src/lib/assets/css/fonts.css`.
- Tailwind-facing font families are exposed via `@theme` in `src/app.css` (e.g. `font-body`, `font-display`).

---

## Content (MDsveX / Markdown)

### Frontmatter (required)

All `.md`/`.svx` files must include:

```yaml
---
title: string
description: string # ~150–160 chars
---
```

Optional:

```yaml
tags: string[]
draft: boolean
image: string # path under /static
---
```

### Markdown styling rule

- Do not add Tailwind classes inside Markdown.
- Styling must be applied by the renderer/wrapper component (e.g. a `prose` wrapper in Svelte), or via dedicated components.

---

## Components (taxonomy + boundaries)

### Where things go

- `src/lib/components/interface/` — reusable primitives (no page copy, no hard-coded asset paths)
- `src/lib/components/typography/` — text primitives/wrappers (e.g. Prose)
- `src/lib/components/layout/` — compositional layout primitives
- `src/lib/components/structure/` — global chrome (header/footer/banners)
- `src/lib/components/sections/` — reusable page blocks
- `src/routes/<route>/_components/` — route-only components tightly coupled to one page

### Imports

- Prefer: `import Thing from '$lib/...';`
- Within the component library itself, prefer direct local imports (avoid barrel imports that can create circular deps).

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

---

## Prerendering

- Pages must be prerenderable.
- Use `export const prerender = true;` in `+page.ts` or `+layout.ts` where appropriate.
- Avoid runtime-only APIs (`cookies`, `locals`, auth guards) in public routes.

---

## Build & deploy expectations

- Build: `pnpm build` (prerender crawler must not hit 404s)
- Preview: `pnpm run preview`
- Any new internal links must resolve during prerender (or have an explicit redirect).

---

## SEO requirements (minimum)

Each page should have:

- Title + meta description
- Open Graph tags for sharing
- Twitter card tags

In Svelte routes, use `<svelte:head>` and populate title/description from load data.

```svelte
<script lang="ts">
	export let data;
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

---

## Common workflows (repo-specific)

### Add a content page

1. Add `content/<slug>.md` with required frontmatter.
2. Ensure routing resolves via `src/routes/[slug]/+page.svelte` (or explicit route).
3. Confirm prerender can discover the page (linked or enumerated).

### Add a UI component

1. Create under `src/lib/components/<category>/ComponentName.svelte`.
2. Type all props (TypeScript).
3. Use Tailwind utilities backed by tokens (no hex).
4. Export from a barrel only for stable, widely reused components (e.g. interface primitives).
5. Avoid barrels for layout, sections, and route-coupled components.

### Add a utility

1. Create `src/lib/utils/<name>.ts` with explicit types.
2. Import via `$lib/utils/<name>`.

---

## Code style (for edits)

- Indentation: **2 spaces**
- JS/TS quotes: **single**
- HTML attributes: **double**
- Keep lines ~80–100 chars (hard max 120)
- Keep components small; extract if they grow beyond ~150 lines

---

## Verification checklist (before submitting)

- [ ] `pnpm build` passes; prerender crawler has no 404s
- [ ] Imports use `$lib/...` where appropriate
- [ ] No Tailwind classes embedded in `content/` markdown
- [ ] No raw hex colors added; tokens used (or added to `tokens.css` + mapped in `app.css`)
- [ ] Accessibility: semantic elements, focus states, keyboard support, alt text
- [ ] All interactive elements must be reachable and usable via keyboard alone.
- [ ] SEO tags present (title, description, Open Graph, Twitter card)
- [ ] Mobile-first layout looks correct across breakpoints
