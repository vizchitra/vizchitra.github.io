# Contribute to VizChitra website

Welcome 👋. This repository powers the **VizChitra website**, a static, content-heavy site for an Indian data visualization community.

Our goals are simple:

- **Fast, accessible, and durable**
- **Easy to maintain by a small core team**
- **Friendly to contributors across design, writing, and development**

This document explains _how we work_, _what we care about_, and _how to contribute without breaking things_.

---

## What this site optimizes for

Before contributing, it helps to know what we **intentionally prioritize**:

- **Static-first delivery**
  The site is prerendered and deployed as static files. No server logic, no runtime-only pages.

- **Content over interactivity**
  Most pages are editorial or informational. JavaScript is used sparingly and only when it improves usability.

- **Consistency over cleverness**
  Design tokens, component boundaries, and folder structure exist to prevent drift.

- **Accessibility as a baseline**
  The site should work with keyboards, screen readers, and low-end devices by default.

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

- `content/`
  Markdown content (`.md`, `.svx`) for pages

- `src/routes/`
  Page routes and layouts

- `src/lib/components/`
  Reusable UI components (organized by purpose)

- `src/lib/assets/css/`
  Design tokens and fonts (the “design system”)

- `static/`
  Images and fonts served as-is

If you’re unsure where something belongs, ask before adding it.

---

## How styling works (important)

We follow a **CSS-first, token-driven design system**.

### Design tokens

- Canonical design values live in
  `src/lib/assets/css/tokens.css` as `--viz-*` variables.
- These tokens are mapped to Tailwind utilities in `src/app.css`.

**What this means for contributors:**

- ❌ Don’t use raw hex colors in Tailwind classes
- ❌ Don’t invent one-off styles inline
- ✅ Use existing Tailwind utilities backed by tokens
- ✅ If a new design value is needed, add it to tokens first

This keeps the visual system coherent over time.

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

Components are grouped by _responsibility_, not by page:

- `interface/` – low-level reusable primitives
- `typography/` – text wrappers and prose
- `layout/` – layout building blocks
- `structure/` – global site chrome (header, footer, banners)
- `sections/` – reusable page sections
- `src/routes/<route>/_components/` – page-specific components

**Guideline:**
If a component is tightly coupled to one page, keep it near that page.

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

1. Place it under the appropriate `components/` category
2. Type props using TypeScript
3. Use Tailwind utilities backed by tokens
4. Keep components small and focused

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

- [ ] The site builds without errors
- [ ] No broken internal links
- [ ] No Tailwind classes inside Markdown
- [ ] No raw hex colors added
- [ ] Images have alt text
- [ ] Pages work well on mobile

---

## When in doubt

If something feels unclear:

- Ask before adding complexity
- Prefer boring, readable solutions
- Optimize for the next contributor, not just yourself

Thanks for helping build VizChitra 🌱
