# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VizChitra is a **static, content-heavy** website for an Indian data visualization community. Built with SvelteKit (Svelte v5) + adapter-static, MDsveX for Markdown, and Tailwind CSS v4. Everything prerenders to static HTML with no runtime dependencies.

## Commands

```bash
pnpm dev              # Start dev server at localhost:5173
pnpm build            # Build static site (must have zero 404s)
pnpm preview          # Preview production build
pnpm check            # TypeScript/Svelte type checking
pnpm format           # Format all files (Prettier)
pnpm lint             # Format check + ESLint on src/**/*.{js,svelte} and content/**/*.md
pnpm audit            # Run lint summary + asset audit reports
```

## Architecture

### Content Flow

Content lives in `content/*.md` with required frontmatter (`title`, `description`). The catch-all route `src/routes/[...slug]/` loads content via `$lib/loaders/content.ts` using Vite's `import.meta.glob`.

### Component Layer System

Components in `src/lib/components/` follow a strict 7-layer hierarchy where **higher layers may only import from lower layers**:

```
Foundation → Typography → Layout → Controls → Blocks → Composition → Sections
                                                          ↑
                                             Patterns (orthogonal)
```

- **Foundation** (`src/app.css`, `src/fonts.css`): Design tokens, CSS layers
- **Typography** (`typography/`): Text primitives (Text, Heading, SubHeading)
- **Layout** (`layout/`): Spatial primitives (Stack, Grid, Cluster, Box, Container, FullBleed, Frame, Layer)
- **Controls** (`controls/`): Interactive primitives (Button, Accordion, Dropdown)
- **Blocks** (`blocks/`): Semantic UI chunks (Card, VideoCard, MarqueeRow)
- **Composition** (`composition/`): Reusable arrangements of blocks (CardGrid, FilterGrid)
- **Sections** (`sections/`): Page compositions (Header, Footer, Hero)
- **Patterns** (`patterns/`): Decorative visuals (optional, no layer depends on them)

### Key Constraints

**Barrel imports only** - Always use `$lib/components`, never deep imports:

```javascript
import { Button, Stack, Header } from '$lib/components'; // Correct
import Button from '$lib/components/controls/Button.svelte'; // Forbidden
```

**Layout primitives required** - Use `Stack`, `Cluster`, `Grid` instead of raw `flex`/`grid` classes. ESLint enforces this.

**Spacing tokens only** - Use semantic aliases (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`), not numeric values like `p-4` or `gap-8`.

**No Tailwind in Markdown** - Styling handled by wrapper components.

**No raw hex colors** - Use token-backed utilities.
