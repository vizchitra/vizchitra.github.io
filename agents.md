# AI Agent Instructions (VizChitra)

This repo powers the **VizChitra: An Indian Data Visualizations Community** website. It is **static, content-heavy, and performance/accessibility-first**: prefer HTML + CSS (Tailwind) and use minimal JS only when it improves usability.

---

## Agent Mindset

These rules are designed to optimize for long-term maintainability, consistency, and static delivery. When in doubt, prefer clarity over cleverness.

---

## Stack (source of truth)

- **SvelteKit** (Svelte v5) + **@sveltejs/adapter-static**
- **Content Collection** for Markdown pages (`content/`)
- **Tailwind CSS v4** for CSS
- **TypeScript**
- **Vite** as build and dev tool
- **PNPM** as package manager

---

## Repo layout (high level)

- `content/` — Markdown pages (`.md`) processed by `Content Collection`
- `src/routes/` — SvelteKit routes (`+page.svelte`, `[slug]/`, etc.)
- `src/lib/` — reusable components, utils, data, assets
- `src/app.css` — Tailwind entry + token-to-utility mapping (`@theme`) + canonical `--color-*` CSS variables
- `src/lib/tokens.ts` — TypeScript color tokens (hex + cssVar mappings)
- `src/lib/assets/css/fonts.css` — `@font-face` declarations
- `static/` — images/fonts served as-is (use absolute `/...` paths)

---

## Non-negotiables (automated edits must follow)

1. **Static-first**: Everything must work with prerendering + adapter-static (no runtime-only routes).
2. **Import strategy**: Use barrel exports (`import { Component } from '$lib/components'`) for all component imports. Avoid direct `.svelte` imports from other directories.
3. **Markdown policy**: Do **not** embed Tailwind utility classes inside Markdown files in `content/`.
4. **Token determinism**: Use canonical `--viz-*` tokens from `src/lib/assets/css/tokens.css`. Avoid ad-hoc hex values.
5. **Accessibility**: Semantic HTML, alt text, keyboard support, and visible focus states.

---

## Design system & styling (Tailwind + tokens)

### CSS-first model (how styling works here)

- **Color tokens** live in two places:
  - `src/lib/tokens.ts` — TypeScript constants (hex values, theme tokens)
  - `src/app.css` — CSS custom properties (`--color-*` variables) using OKLCH color space
- **OKLCH Color System**: All brand colors have 11-tone ramps (50-950) with standardized lightness values
- Tailwind utilities are created by mapping tokens in `src/app.css` using `@theme { ... }`.
- Prefer Tailwind utilities in Svelte components; avoid new global CSS unless widely reused.

### Token usage rules

- **No raw hex** in class strings (e.g. avoid `bg-[#747474]`).
- **Use semantic color names**: `--color-viz-yellow`, `--color-viz-teal`, `--color-viz-blue`, `--color-viz-orange`, `--color-viz-pink`, `--color-viz-grey`
- **Named variants available**: `-subtle` (100), `-light` (200), `-muted` (300), base (400), `-strong` (700), `-dark` (800)
- Prefer **semantic roles** when available (e.g. `--color-bg`, `--color-fg`, `--color-accent`, `--color-link`)
- If a new color is needed:
  1. Add to `src/lib/tokens.ts` if it's a JS constant
  2. Add CSS variable to `src/app.css` for styling
  3. Map to Tailwind utility via `@theme` if needed

### Tailwind conventions (practical)

- Mobile-first utilities; add `sm:`, `md:`, `lg:`, `xl:` only when needed.
- Keep spacing consistent (use Tailwind scale; prefer `gap-*`).
- Avoid bespoke one-off arbitrary values unless unavoidable; if repeated, promote to a shared pattern.

### Fonts

- Fonts are defined via `@font-face` in `src/lib/assets/css/fonts.css`.
- Tailwind-facing font families are exposed via `@theme` in `src/app.css` (e.g. `font-body`, `font-display`).

---

## Content (Content Collection / Markdown)

### Frontmatter (required)

All `.md` files must include:

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

- `src/lib/components/interface/` — reusable UI primitives (buttons, cards, modals, etc.)
- `src/lib/components/typography/` — text primitives/wrappers (Heading, Text, Prose, etc.)
- `src/lib/components/layout/` — compositional layout primitives (Stack, Grid, Container, etc.)
- `src/lib/components/patterns/` — visual patterns and decorations (banners, dividers, patterns)
- `src/lib/components/structure/` — global chrome (header/footer/banners)
- `src/lib/components/sections/` — reusable page blocks (conference, FAQ, team, etc.)
- `src/lib/components/proposals/` — proposal-specific components (ProposalCard, filters, etc.)
- `src/routes/<route>/_components/` — route-only components tightly coupled to one page

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
- ✅ Category-level imports (`$lib/components/layout`) are acceptable for better organization
- ❌ Avoid direct `.svelte` imports from other directories: `'$lib/components/interface/Button.svelte'`
- ✅ Exception: Sibling components in same directory can use relative imports: `'./SpeakerPentagon.svelte'`
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

1. Add `content/<slug>.md` with required frontmatter.
2. Ensure routing resolves via `src/routes/[slug]/+page.svelte` (or explicit route).
3. Confirm prerender can discover the page (linked or enumerated).

### Add a UI component

1. Create under `src/lib/components/<category>/ComponentName.svelte`.
2. Type all props (TypeScript).
3. Use Tailwind utilities backed by tokens (no hex).
4. Export from the category's `index.ts` barrel file:
   ```typescript
   export { default as ComponentName } from './ComponentName.svelte';
   ```
5. Verify the root `src/lib/components/index.ts` re-exports the category.
6. Import the component using barrel exports in your code:
   ```typescript
   import { ComponentName } from '$lib/components';
   ```

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
- [ ] Component imports use barrel exports: `import { Component } from '$lib/components'`
- [ ] No direct `.svelte` imports from other directories (except sibling components)
- [ ] No Tailwind classes embedded in `content/` markdown
- [ ] No raw hex colors added; tokens used (add to `tokens.ts` or `app.css` with proper OKLCH values)
- [ ] Accessibility: semantic elements, focus states, keyboard support, alt text
- [ ] All interactive elements must be reachable and usable via keyboard alone.
- [ ] SEO tags present (title, description, Open Graph, Twitter card)
- [ ] Mobile-first layout looks correct across breakpoints
