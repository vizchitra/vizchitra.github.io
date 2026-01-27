# Contribute to VizChitra website

Welcome 👋. This repository powers the **VizChitra website**, a static, content-heavy site for an
Indian data visualization community.

Our goals are simple:

- **Fast, accessible, and durable**
- **Easy to maintain by a small core team**
- **Friendly to contributors across design, writing, and development**

This document explains _how we work_, _what we care about_, and _how to contribute without breaking
things_.

---

## What this site optimizes for

Before contributing, it helps to know what we **intentionally prioritize**:

- **Static-first delivery** The site is prerendered and deployed as static files. No server logic,
  no runtime-only pages.

- **Content over interactivity** Most pages are editorial or informational. JavaScript is used
  sparingly and only when it improves usability.

- **Consistency over cleverness** Design tokens, component boundaries, and folder structure exist to
  prevent drift.

- **Accessibility as a baseline** The site should work with keyboards, screen readers, and low-end
  devices by default.

---

## Tech stack (source of truth)

You don’t need to know everything here to contribute, but this is what the site is built on:

- **SvelteKit** (Svelte v5) with static adapter
- **MDsveX** for Markdown-based content
- **Tailwind CSS v4**, driven by design tokens
- **TypeScript** for type-safe JavaScript
- **Vite** for build and dev tool
- **PNPM** for package manager

---

## Repository overview

At a high level:

- `content/` Markdown content (`.md`, `.svx`) for pages

- `src/routes/` Page routes and layouts

- `src/lib/components/` Reusable components organized into 8 layers:
  - `foundation/` – Design tokens and global CSS
  - `typography/` – Text primitives
  - `layour/` – Layout & spacing utilities
  - `controls/` – Interactive primitives
  - `blocks/` – Semantic UI chunks
  - `composition/` – Reusable arrangements of blocks (grids, lists)
  - `sections/` – Page-level compositions
  - `patterns/` – Decorative visuals (optional)

- `static/` Images and fonts served as-is

If you’re unsure where something belongs, ask before adding it.

---

## How styling works (important)

We follow a **token-driven, layer-based design system**.

### Design tokens

- Canonical design values live in `src/lib/components/foundation/tokens.css` as `--viz-*` variables
- These tokens are mapped to Tailwind utilities in `src/app.css`
- See [system.md](src/lib/components/system.md) for the complete architecture

**What this means for contributors:**

- ❌ Don't use raw hex colors in Tailwind classes
- ❌ Don't invent one-off styles inline
- ❌ Don't use `flex`, `grid`, or `gap` directly in reusable components
- ✅ Use existing Tailwind utilities backed by tokens
- ✅ Use **structure** primitives for layout: `Stack`, `Cluster`, `Grid`
- ✅ If a new design value is needed, add it to `foundation/tokens.css` first

This keeps the visual system coherent and maintainable over time.

---

## Writing & content (Markdown)

### Frontmatter (required)

Every Markdown file must include:

```yaml
---
title: string
description: string
---
```

Optional fields:

```yaml
tags: string[]
draft: boolean
image: string # path under /static
```

### Styling rules for Markdown

- **Do not add Tailwind classes inside Markdown**
- Markdown should stay semantic and content-focused
- Styling is handled by wrapper components (e.g. `Prose`)

If you need special layouts or visuals, use a Svelte component instead of hacking Markdown.

---

## Components: how we organize UI

Components are organized into **8 composable layers** (dependencies flow downward):

| Layer           | Purpose                         | Examples                       |
| --------------- | ------------------------------- | ------------------------------ |
| **Foundation**  | Design tokens & global CSS      | `tokens.css`, `components.css` |
| **Typography**  | Text primitives & scales        | `Heading`, `Prose`, `Text`     |
| **Layout**      | Layout & spacing utilities      | `Stack`, `Cluster`, `Grid`     |
| **Controls**    | Interactive primitives          | `Button`, `Input`, `Toggle`    |
| **Blocks**      | Reusable semantic chunks        | `Card`, `Media`, `ListItem`    |
| **Composition** | Reusable arrangements of blocks | `CardGrid`, `FilterGrid`       |
| **Sections**    | Page-level compositions         | `Header`, `Footer`, `Hero`     |
| **Patterns**    | Decorative visuals (optional)   | `Wave`, `Stream`, `Divider`    |

**Guideline:** Components can only import from lower layers (Foundation → Typography → Structure →
... → Sections). Patterns are optional decorations that no layer depends on.

**Page-specific components:** If a component is tightly coupled to one page, keep it near that page
in `src/routes/<route>/`.

See [agents.md](agents.md) Section 3 and 4 for detailed architecture rules.

---

## Images & assets

- Put images in `static/images/`
- Reference them with absolute paths:
  - Markdown: `![Alt text](/images/file.webp)`
  - Svelte: `<img src="/images/file.webp" alt="..." />`
- Always include meaningful `alt` text
- Prefer modern formats (`.webp` or `.avif` where possible)

---

## Accessibility expectations

Accessibility is not optional here.

At minimum:

- Use semantic HTML (`nav`, `main`, `section`, `button`, etc.)
- All interactive elements must be keyboard-accessible
- Focus states must be visible
- Images must have appropriate `alt` text

If you’re unsure, default to the simplest semantic solution.

---

## SEO basics (handled per page)

Every page should have:

- A clear title
- A concise meta description
- Open Graph + Twitter metadata

These are usually set in the page route using `<svelte:head>` and data from frontmatter.

---

## Common contribution workflows

### Adding a content page

1. Add a Markdown file under `content/`
2. Ensure there’s a corresponding route
3. Link to it from somewhere so prerender can discover it

### Adding a UI component

1. Determine which layer your component belongs to (Foundation -> Typography -> Layout -> Controls
   -> Blocks -> Compositions -> Sections -> Patterns)
2. Place it in `src/lib/components/<layer>/`
3. Type all props using TypeScript
4. Use Tailwind utilities backed by tokens (never raw hex colors)
5. For layout, use Structure primitives (`Stack`, `Cluster`, `Grid`) instead of `flex`/`grid`
   classes
6. Keep components small and focused
7. Export via `src/lib/components/index.ts` if it's reusable

### Adding utilities

- Place them in `src/lib/utils/`
- Use explicit types
- Import via `$lib/utils/...`

---

## Code style (light but important)

- 2-space indentation
- Single quotes in JS/TS
- Double quotes in HTML
- Keep lines readable (~80–100 chars)
- Extract components if they grow too large

---

## Before opening a PR

Please check:

- [ ] The site builds without errors (`pnpm build`)
- [ ] Linting passes (`pnpm lint`)
- [ ] No broken internal links
- [ ] No Tailwind classes inside Markdown
- [ ] No raw hex colors in component classes
- [ ] Layout uses `Stack`, `Cluster`, `Grid` (not `flex`/`grid` directly)
- [ ] Components import from `$lib/components` (barrel imports only)
- [ ] Images have alt text
- [ ] Pages work well on mobile
- [ ] Component layer classification is correct

---

## When in doubt

If something feels unclear:

- Ask before adding complexity
- Prefer boring, readable solutions
- Optimize for the next contributor, not just yourself

Thanks for helping build VizChitra 🌱
