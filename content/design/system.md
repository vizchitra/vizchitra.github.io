# Design System Taxonomy

Our design system separates values, text, space, actions, meaning, composition, and mood into independent, composable layers under `src/lib/components`.

The following captures the system's layer order, the team mental-model mapping, and quick examples. Use the table below as the canonical reference when classifying or placing a component.

| Layer      | Mental model | Role                              | Examples                        |
| ---------- | ------------ | --------------------------------- | ------------------------------- |
| Foundation | Numbers      | Token source, fonts & common CSS  | `tokens.css`, `fonts.css`       |
| Typography | Words        | Text primitives & scales          | `Text.svelte`, `Title.svelte`   |
| Structure  | Space        | Layout for spacing & flow         | `Stack.svelte`, `Grid.svelte`   |
| Interface  | Actions      | Small interactive primitives      | `Button.svelte`, `Input.svelte` |
| Blocks     | Meaning      | Reusable semantic chunks          | `Card.svelte`, `Media.svelte`   |
| Sections   | Composition  | Composition for content structure | `Header.svelte`, `Hero.svelte`  |
| Patterns   | Mood         | Decorative visuals (orthogonal)   | `Wave.svelte`, `Stream.svelte`  |

---

## 📁 Canonical Folder Structure

```txt
src/
  components/
    foundation/
      tokens.css      # Canonical --viz-* tokens
      fonts.css       # Font-face declarations
      layers.css      # @layer base, components, utilities, prose
    typography/
    structure/
    interface/
    blocks/
    sections/
    patterns/
    index.ts
  app.css             # Entry point (imports foundation/layers.css)
```

> src/components/index.ts is the only public API; all folders below it are private implementation details.

Everything UI-related lives here.
_Pages and routes compose Sections — not the other way around._

---

## 1️⃣ `foundation/`

-- _Role:_ Design tokens, global CSS rules, and layer definitions
-- _Purpose:_ Central source of truth for values and styling architecture; no UI rendering
-- _Contains:_ CSS variables, token maps, `@font-face` declarations, `@layer` definitions
-- _Rules:_ No Svelte components, no semantic markup, no layout ownership

```txt
src/lib/components/foundation/
  tokens.css          # Canonical --viz-* design tokens
  fonts.css           # Font-face declarations
  layers.css          # Tailwind config + @layer base/components/utilities + prose
```

---

## 2️⃣ `typography/`

-- _Role:_ Text system primitives
-- _Purpose:_ Define rhythm, scale, and typographic hierarchy
-- _Includes:_ `Text`, `Title`, `Prose`, `Code` (atomic text components)
-- _Rules:_ Pure text responsibilities — avoid layout, visual decorations, or side effects

```txt
src/lib/components/typography/
  Text.svelte
  Heading.svelte
  Prose.svelte
  Code.svelte
```

---

## 3️⃣ `structure/`

-- _Role:_ Layout primitives
-- _Purpose:_ Provide predictable spacing, flow, and alignment utilities used by other layers
-- _Includes:_ `Stack`, `Cluster`, `Grid`, `Container`, `Spacer`
-- _Rules:_ No visual styling or semantics; no interactive behavior — structure only

```txt
src/lib/components/structure/
  Stack.svelte
  Grid.svelte
  Container.svelte
```

---

## 4️⃣ `interface/`

-- _Role:_ Interaction primitives
-- _Purpose:_ Small, single-purpose interactive elements for user input and actions
-- _Includes:_ `Button`, `IconButton`, `Link`, `Input`, `Select`, `Toggle`, `Badge`
-- _Rules:_ One primary interaction, minimal surface area, built from Typography + Structure; avoid multi-part semantics (if it contains multiple interactive children, it belongs elsewhere)

```txt
src/lib/components/interface/
  Button.svelte
  IconButton.svelte
  Input.svelte
```

---

## 5️⃣ `blocks/`

-- _Role:_ Reusable semantic UI chunks
-- _Purpose:_ Encapsulate meaningful UI pieces that combine primitives into usable blocks
-- _Includes:_ `Card`, `Media`, `MediaCard`, `NavItem`, `StatBlock`, `ListItem`
-- _Rules:_ Compose Interface + Structure + Typography; no page-level awareness or routing responsibilities

```txt
src/lib/components/blocks/
  Card.svelte
  Media.svelte
  ListItem.svelte
```

---

## 6️⃣ `sections/`

-- _Role:_ Page-level compositions
-- _Purpose:_ Build page sections by composing Blocks; express page structure without embedding route logic
-- _Includes:_ `Header`, `Footer`, `Hero`, `FAQ`, `Banner`
-- _Rules:_ Page-aware and data-driven but route-agnostic; may be decorated by Patterns; avoid routing logic

```txt
src/lib/components/sections/
  Header.svelte
  Hero.svelte
  Footer.svelte
```

Sections answer: “What part of a page is this?”

---

## 7️⃣ `patterns/`

-- _Role:_ Visual, decorative systems
-- _Purpose:_ Provide optional, data-driven visual expression layered on top of components
-- _Includes:_ `Waves`, `Ridge`, `Streams`
-- _Rules:_ No layout ownership, no semantics, no content; fully prop-driven, optional and swappable

```txt
src/lib/components/patterns/
  DotField.svelte
  WaveDivider.svelte
```

Removing Patterns must never break layout or content.

---

## 🔁 Dependency Rules (enforceable)

Foundations → Typography → Structure → Interface → Blocks → Sections

-- _Enforcement:_ Higher layers may import from lower layers only. Prevent circular or upward imports.
-- _Patterns:_ Orthogonal — they may decorate any layer but no layer should depend on Patterns.

---
