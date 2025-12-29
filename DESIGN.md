# VizChitra Design System

## Principles

- **CSS-first**: prefer Tailwind utilities and CSS variables over component props.
- **Token-driven**: use design tokens for colors, typography, spacing.
- **Semantic styling**: prefer semantic roles (e.g. `--color-bg`) over palette colors (e.g. `--color-viz-yellow`).
- **Minimal global styles**: only a few shared classes for layout and content.
- **Component-scoped styles**: keep styles local to components unless widely reused.

## Overview

This repo uses **CSS-first** approach - using CSS variables and Tailwind utilities. The goal is to keep UI consistent and easy to change, without forcing everything into a component library.

## Source of Truth

- **Design tokens** live in: `src/lib/assets/css/tokens.css`
- **Global styles + Tailwind entry** live in: `src/app.css`
- **Fonts (`@font-face`)** live in: `src/lib/assets/css/fonts.css`

Rule: if you need a new color/font token, add it to `tokens.css` (not scattered in components).

## CSS-First & Tailwind Approach

- Tailwind is imported via `@import "tailwindcss";` in `src/app.css`.
- Tokens are defined as plain CSS variables in `src/lib/assets/css/tokens.css` (canonical `--viz-*`).
- Tailwind-facing utilities are created by mapping canonical tokens via `@theme { ... }` in `src/app.css` (`--color-*`, `--font-*`).
- Prefer Tailwind utilities in Svelte components.
- Use `@apply` only for a small number of shared “content” helpers (e.g. `.content-container`).

## Token Types (Palette vs Semantic)

### Palette Tokens (brand colors)

These are the “named paints” and should remain stable.

- Canonical (in `tokens.css`): `--viz-color-yellow`, `--viz-color-teal`, `--viz-color-blue`, `--viz-color-orange`, `--viz-color-pink` (plus `--viz-color-white|black|grey`)
- Tailwind-facing (in `app.css @theme`): `--color-viz-yellow`, `--color-viz-teal`, `--color-viz-blue`, `--color-viz-orange`, `--color-viz-pink` (plus `--color-viz-white|black|grey`)

Use palette tokens when you mean _the brand color itself_ (highlights, accents, banners).

### Semantic Tokens (meaning-based aliases)

These are “roles” and can be adjusted over time without rewriting components:

- `--color-bg`, `--color-fg`, `--color-surface`, `--color-border`, `--color-link`, `--color-accent`

Use semantic tokens when you mean _purpose_ rather than a specific brand color.

Recommended convention:

- New UI components should prefer semantic tokens.
- Marketing/illustrative sections can use palette tokens.

## Typography

### Font Families

Defined in `@theme` (in `src/app.css`) so Tailwind produces utilities:

- `font-body` (body text)
- `font-display` (display / headings)
- `font-base` (alias for body text)

Guidelines:

- Default body text: `font-body`
- Headlines / slanted text: `font-display`

### Type Scale

Current code mostly uses Tailwind utilities like `text-xl`, `text-2xl`, `text-[18px]`, etc.

Rule of thumb:

- Prefer Tailwind scale first.
- If you find repeated arbitrary sizes (e.g. `text-[18px]` in many places), promote them into a shared class in `src/app.css` (or later, a token strategy).

## Layout Primitives

Use a small set of consistent wrappers:

- `.content-container` — standard max-width + horizontal padding
- `.full-bleed` — breakout sections that span the viewport

Avoid inventing new “container” widths in random components unless necessary.

## Component Organization (taxonomy)

### Goals

- Keep reusable components in `src/lib/components/**`
- Keep route-only components colocated under `src/routes/**`
- Separate primitives (UI) from site chrome (structure) and page blocks (sections)

### Recommended structure

```text
src/
  lib/
    components/
      ui/                 # Reusable primitives (no page/business coupling)
        button/
          Button.svelte
          IconButton.svelte
        form/
          Input.svelte
          Select.svelte
        feedback/
          Notice.svelte
          Tooltip.svelte
        media/
          InlineSvg.svelte
          VideoEmbed.svelte

      typography/         # Text primitives / wrappers
        Heading.svelte
        Text.svelte
        Prose.svelte      # typographic wrapper for Markdown output

      layout/             # Page scaffolding / wrappers (composition)
        Container.svelte
        Section.svelte
        Grid.svelte
        Stack.svelte

      structure/          # Site chrome (header/footer/banners)
        header/
          Header.svelte
          Nav.svelte
        footer/
          Footer.svelte
        banners/
          Banner.svelte

      sections/           # Reusable page sections (page blocks)
        mission/
          MissionSection.svelte
        team/
          TeamSection.svelte
          MemberCard.svelte
        sponsors/
          SponsorCards.svelte

    utils/                # Pure utilities (no Svelte)
      urls.ts
      dates.ts
      format.ts

    types/                # Shared types
      content.ts
      team.ts

  routes/
    team/
      _components/        # Route-only components (not reused elsewhere)
        TeamHero.svelte
```

### Boundaries (important)

- `components/ui/` should be theme/token-driven and reusable (no page-specific copy, no hard-coded asset paths).
- `components/structure/` is global chrome used across pages (header/footer/banners).
- `components/sections/` are reusable blocks that may appear on multiple pages.
- If a component is used by exactly one route and tightly coupled to its data, place it in `src/routes/<route>/_components/`.

### Importing Components

- Use barrels for route-level imports: `import { Button, PageHeader } from '$lib/components';`
- Inside the component library itself, use **direct relative imports (not via root barrel)** to avoid circular deps.

## CSS Usage Rules

- No new raw hex colors in component class strings (e.g. avoid `bg-[#747474]`).
  - Use Tailwind color utilities backed by tokens or semantic variables.
- Prefer Tailwind utilities for spacing/layout.
- Keep component-scoped `<style>` for geometry/behavior that Tailwind doesn’t express cleanly (clip-path, SVG masks, complex keyframes).

## Markdown Content

Content pages should not embed Tailwind class strings inside markdown.

- Styling for markdown output should be applied by the renderer wrapper (e.g. `prose` classes in the Svelte page).
- If you later decide to allow Tailwind classes in markdown, we’ll add explicit Tailwind v4 `@source` scanning.

## Accessibility (minimum bar)

- Maintain visible focus styles on interactive controls.
- Ensure text contrast on brand backgrounds is readable.
- Use semantic HTML (button vs link) and ensure `aria-*` when needed.
