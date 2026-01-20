# AI Agent Instructions (VizChitra)

> **Note:** These guidelines work with **ANY AI coding assistant** (Claude Code, Cursor, GitHub Copilot, etc.).
> Team members may use different AI tools — these instructions are **tool-agnostic**.

> We are not assembling pages — we are maintaining a system.

This repo powers the **VizChitra: An Indian Data Visualization Community** website. It is **static, content-heavy, and performance/accessibility-first**.

---

## 1. Core Mindset

> Clarity > cleverness. System > shortcuts.

Optimize for long-term maintainability, consistency, and static delivery. Every decision should strengthen the system.

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
      foundation/        # Design tokens & layer definitions
        tokens.css       #   - Canonical --viz-* CSS variables
        fonts.css        #   - Font-face declarations
        layers.css       #   - Tailwind config + @layer base/components/utilities
      typography/        # Text, Heading, Prose (Text primitives)
      structure/         # Stack, Cluster, Grid (Spatial primitives)
      interface/         # Button, Input, Toggle (Interactive primitives)
      blocks/            # Card, Media, ListItem (Semantic chunks)
      sections/          # Header, Footer, Hero (Page compositions)
      patterns/          # Wave, Stream, Divider (Decorative, optional)
    utils/               # Usage: $lib/utils/name
  routes/                # Routing shell (thin wrappers)
  app.css                # Entry point (imports foundation/layers.css)
content/                 # Markdown content (Narrative + Metadata)
static/                  # Public assets (Images, Fonts)
```

### Litmus Test

> If you delete all `content/*.md` files, the site should still build and render empty but structurally correct pages.

- **Content Layer**: Holds all narrative and metadata.
- **Component Layer**: Visuals and structure only; no route-specific copy.

---

## 3. Design System Taxonomy

> **Foundation** → **Typography** → **Structure** → **Interface** → **Blocks** → **Sections** → **Patterns** (orthogonal)

The design system is organized into 7 independent, composable layers under `src/lib/components/`:

| Layer          | Role                          | Mental Model | Examples                                |
| -------------- | ----------------------------- | ------------ | --------------------------------------- |
| **Foundation** | Tokens, fonts, & layer defs   | Numbers      | `tokens.css`, `fonts.css`, `layers.css` |
| **Typography** | Text primitives & scales      | Words        | `Heading`, `Prose`, `Text`              |
| **Structure**  | Layout & spacing utilities    | Space        | `Stack`, `Grid`, `Cluster`              |
| **Interface**  | Interactive primitives        | Actions      | `Button`, `Input`, `Toggle`             |
| **Blocks**     | Reusable semantic chunks      | Meaning      | `Card`, `Media`, `ListItem`             |
| **Sections**   | Page-level compositions       | Composition  | `Header`, `Footer`, `Hero`              |
| **Patterns**   | Decorative visuals (optional) | Mood         | `Wave`, `Stream`, `Divider`             |

**Foundation** contains all design tokens and layer definitions in `src/lib/components/foundation/`:

- `tokens.css` — All `--viz-*` CSS variables (colors, spacing, motion)
- `fonts.css` — `@font-face` declarations only
- `layers.css` — Tailwind config & `@layer base/components/utilities` + prose styling

**Dependency Rule**: Layers may only import from lower layers. Patterns are orthogonal (no layer depends on Patterns).

See [system.md](src/lib/components/system.md) for the complete canonical reference.

---

## 4. Component Architecture

> Small, typed, import-only-downward, composed from lower layers.

### Import Conventions

**Unified Barrel**: Always import from `$lib/components`. No deep imports.

```javascript
/* ✅ DO */
import { Button, Header, Stack } from '$lib/components';

/* ❌ DON'T (Deep imports forbidden) */
import Button from '$lib/components/interface/Button.svelte';
```

### Structure Primitives

Never use `flex`, `grid`, or `gap` classes directly in reusable components. Always use **structure** primitives:

- **Stack**: Vertical flow with consistent spacing. `space="md"`.
- **Cluster**: Inline flow with wrapping. `space="sm"`.
- **Grid**: Two-dimensional layout. `cols={3}`.

```svelte
<!-- ✅ DO: Use structure primitives -->
<Stack space="md">...</Stack>

<!-- ❌ DON'T: Raw layout utilities -->
<div class="flex flex-col gap-4">...</div>
```

### Component Composition

Build higher-layer components by composing lower layers:

- **Blocks** = Structure + Interface + Typography
- **Sections** = Blocks + Structure + Interface + Typography
- **Patterns** = Optional decorative layers (no layer depends on Patterns)

---

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

We use a hybrid approach with specialized tools for each concern, enforced by CI/CD.

**Formatting:**

- **Oxfmt** (`pnpm format`): Single formatter for all file types.
  - Configured via `.oxfmtrc.json` with Tailwind v4 class sorting enabled.
  - Format on save in editor (VSCode integrated).

**Markdown Tables:**

- Always align table columns for readability in source code.
- Use consistent spacing in pipe separators (`| column |` not `|column|`).
- This makes diffs clearer and source files more maintainable.

```markdown
/_ ✅ DO: Aligned columns _/
| Layer | Role | Examples |
|-------------|---------------------------|-------------------|
| Foundation | Design tokens & CSS | tokens.css |
| Typography | Text primitives | Heading, Prose |

/_ ❌ DON'T: Misaligned columns _/
| Layer | Role | Examples |
|---|---|---|
| Foundation | Design tokens & CSS | tokens.css |
| Typography | Text primitives | Heading, Prose |
```

**Linting:**

1.  **Oxlint** (`pnpm lint:ox`): Fast general linting.
    - Syntax/correctness checks using 90+ built-in rules.
    - Zero configuration needed (uses sensible defaults).
2.  **ESLint** (`pnpm lint:tw`): Design system enforcement.
    - **better-tailwindcss** plugin enforces:
      - No conflicting or duplicate Tailwind classes
      - No raw layout utilities (`flex`, `grid`) — use Stack/Cluster/Grid components instead
      - No `!important` in Tailwind classes
      - No Tailwind classes in Markdown files
    - **no-restricted-imports** enforces barrel imports from `$lib/components`

### Verification Checklist

Before submitting changes:

- [ ] **Linting**: `pnpm lint:all` passes with 0 errors.
- [ ] **Build**: `pnpm build` succeeds with no 404s.
- [ ] **Architecture**: No deep imports; Component layers respected.
- [ ] **Design**: No raw hex values; Layout primitives used.
- [ ] **Content**: Markdown is clean; Metadata present.
