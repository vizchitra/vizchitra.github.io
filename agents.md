# AI Agent Instructions (VizChitra)

> **Note:** These guidelines work with **ANY AI coding assistant** (Claude Code, Cursor, GitHub
> Copilot, etc.). Team members may use different AI tools — these instructions are
> **tool-agnostic**.

> We are not assembling pages — we are maintaining a system.

This repo powers the **VizChitra: An Indian Data Visualization Community** website. It is **static,
content-heavy, and performance/accessibility-first**.

---

## 1. Core Mindset

> Clarity > cleverness. System > shortcuts.

Optimize for long-term maintainability, consistency, and static delivery. Every decision should
strengthen the system.

- ✅ Prefer **semantic intent** over visual tuning
- ✅ Prefer **tokens** over raw values
- ✅ Prefer **layout primitives** over ad-hoc styling
- ✅ Prefer **enforcement** over convention
- ❌ **No short-term hacks** that harm system coherence

---

## 2. Architecture & Repo Layout

> One source of truth per concern.

### Stack (Source of Truth)

- **SvelteKit** (Svelte v5) + **adapter-static** (Prerendering)
- **MDsveX** (Markdown processing)
- **Tailwind CSS v4** (Utility framework)
- **TypeScript** (Type safety)

**Constraint:** No runtime dependencies for public routes. Everything must build to static HTML.

### Directory Structure

```
src/
  lib/
    components/          # ALL reusable UI components (exported via index.ts)
      typography/        # Text, Heading, SubHeading (Text primitives)
      layout/            # Stack, Cluster, Grid, Container, Box (Spatial primitives)
      controls/          # Button, Accordion, Dropdown (Interactive primitives)
      blocks/            # Card, VideoCard, MarqueeRow (Semantic chunks)
      composition/       # (planned) CardGrid, FilterGrid
      sections/          # Header, Footer, Hero (Page compositions)
      patterns/          # BannerCurve, PatternStream, Divider (Decorative, optional)
    utils/               # Usage: $lib/utils/name
  routes/                # Routing shell (thin wrappers)
  fonts.css              # Font-face declarations
  app.css                # Design tokens + Tailwind config + @layer definitions
content/                 # Markdown content (Narrative + Metadata)
static/                  # Public assets (Images, Fonts)
```

### Litmus Test

> If you delete all `content/*.md` files, the site should still build and render empty but
> structurally correct pages.

- **Content Layer**: Holds all narrative and metadata.
- **Component Layer**: Visuals and structure only; no route-specific copy.

---

## 3. Design System Taxonomy

> **Foundation** → **Typography** → **Layout** → **Controls** → **Blocks** → **Composition** → **Sections** →
> **Patterns** (orthogonal)

The design system is organized into 8 independent, composable layers under `src/lib/components/`:

| Layer           | Role                            | Mental Model | Examples                              |
| --------------- | ------------------------------- | ------------ | ------------------------------------- |
| **Foundation**  | Tokens, fonts, & layer defs     | Values       | `app.css`, `fonts.css`                |
| **Typography**  | Text primitives & scales        | Language     | `Heading`, `Text`, `SubHeading`       |
| **Layout**      | Layout & spacing utilities      | Space        | `Stack`, `Grid`, `Container`, `Box`   |
| **Controls**    | Interactive primitives          | Actions      | `Button`, `Accordion`, `Dropdown`     |
| **Blocks**      | Reusable semantic chunks        | Meaning      | `Card`, `VideoCard`, `MarqueeRow`     |
| **Composition** | Reusable arrangements of blocks | Structure    | `CardGrid`, `FilterGrid` (planned)    |
| **Sections**    | Page-level compositions         | Architecture | `Header`, `Footer`, `Hero`            |
| **Patterns**    | Decorative visuals (optional)   | Expression   | `BannerCurve`, `PatternStream`, `Divider` |

**Foundation** contains all design tokens and layer definitions in `src/`:

- `app.css` — Design tokens, Tailwind config, `@layer` definitions, and prose styling
- `fonts.css` — `@font-face` declarations only

**Dependency Rule**: Layers may only import from lower layers. Patterns are orthogonal (no layer
depends on Patterns).

See [Design System Taxonomy](/design/system) for the complete canonical reference.

---

## 4. Component Architecture

> Small, typed, import-only-downward, composed from lower layers.

### Import Conventions

**Unified Barrel**: Always import from `$lib/components`. No deep imports.

```javascript
/* ✅ DO */
import { Button, Header, Stack } from '$lib/components';

/* ❌ DON'T (Deep imports forbidden) */
import Button from '$lib/components/controls/Button.svelte';
```

### Layout Primitives

Never use `flex`, `grid`, or `gap` classes directly in reusable components. Always use **layout**
primitives:

- **Stack**: Vertical flow with consistent spacing. `space="md"`.
- **Cluster**: Inline flow with wrapping. `space="sm"`.
- **Grid**: Two-dimensional layout. `minWidth="280px"`.

```txt
src/
  lib/
    components/          # ALL reusable UI components (exported via index.ts)
      typography/        # Text, Heading, SubHeading (Text primitives)
      layout/            # Stack, Cluster, Grid, Container, Box (Spatial primitives)
      controls/          # Button, Accordion, Dropdown (Interactive primitives)
      blocks/            # Card, VideoCard, MarqueeRow (Semantic chunks)
      composition/       # (planned) CardGrid, FilterGrid
      sections/          # Header, Footer, Hero (Page compositions)
      patterns/          # BannerCurve, PatternStream, Divider (Decorative, optional)
    utils/               # Usage: $lib/utils/name
  routes/                # Routing shell (thin wrappers)
  fonts.css              # Font-face declarations
  app.css                # Design tokens + Tailwind config + @layer definitions
content/                 # Markdown content (Narrative + Metadata)
static/                  # Public assets (Images, Fonts)
```

## 5. Content & Assets

> Markdown is for meaning, not styling.

### MDsveX (Content)

- **Frontmatter**: `title` and `description` are mandatory.
- **Styling**: Handled by wrapper components/layouts.
- **Constraint**: No Tailwind classes in Markdown.

### Assets

- **Location**: `static/`.
- **Access**: Absolute paths (e.g., `/images/logo.webp`).
- **Formats**: Modern (`.webp`, `.avif`).
- **Alt Text**: Mandatory.

---

## 6. Workflows

### Common Tasks

- **Add Page**: Create `content/<slug>.md`. Ensure route exists in `src/routes/`.
- **Add Component**: Create in `$lib/components/<layer>/`. Export via `index.ts` if reused.
- **SEO**: Check `title`, `description`, `og:image`, `twitter:card`.

### Build & Deploy

- Run `pnpm build` locally to verify prerendering.
- Ensure **Zero 404s** in the build log.

---

## 7. Quality Assurance

> Trusted by verify.

### Formatting & Linting Strategy

**Formatting:**

- **Prettier** (`pnpm format`): Formats all file types.
  - Configured with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`.
  - Format on save in editor (VSCode integrated).

**Markdown Tables:**

- Always align table columns for readability in source code.
- Use consistent spacing in pipe separators (`| column |` not `|column|`).
- This makes diffs clearer and source files more maintainable.

**Linting:**

- **ESLint** (`pnpm lint`): Runs Prettier check + ESLint on `src/**/*.{js,svelte}` and `content/**/*.md`.
  - Enforces barrel imports from `$lib/components`
  - Enforces layout primitives (no raw `flex`/`grid` classes)
  - Enforces no Tailwind classes in Markdown files

### Verification Checklist

Before submitting changes:

- [ ] **Linting**: `pnpm lint` passes with 0 errors.
- [ ] **Build**: `pnpm build` succeeds with no 404s.
- [ ] **Architecture**: No deep imports; Component layers respected.
- [ ] **Design**: No raw hex values; Layout primitives used.
- [ ] **Content**: Markdown is clean; Metadata present.
