---
title: Design System
description: Layer hierarchy and mental model for the VizChitra component system.
---

<Header
  title="Design System Taxonomy"
/>

Our design system separates values, language, space, actions, meaning, structure, architecture, and expression into independent, composable layers under `src/lib/components`.

The following table serves as the canonical reference for the system's layer hierarchy and mental model. Use this to determine the correct classification and directory placement for any new component.

| Layer       | Mental model | Role                             | Examples                                  |
| ----------- | ------------ | -------------------------------- | ----------------------------------------- |
| Foundation  | Values       | Tokens, fonts & common CSS       | `app.css`, `fonts.css`                    |
| Typography  | Language     | Text semantics, scales & style   | `Heading`, `Text`, `SubHeading`           |
| Layout      | Space        | Spatial relationships & flow     | `Stack`, `Grid`, `Container`, `Box`       |
| Controls    | Actions      | Atomic interactive primitives    | `Button`, `Accordion`, `Dropdown`         |
| Blocks      | Meaning      | Semantic content units           | `Card`, `VideoCard`, `MarqueeRow`         |
| Composition | Structure    | Reusable arrangement of blocks   | `CardGrid`, `FilterGrid` (planned)        |
| Sections    | Architecture | Major page landmarks & zones     | `Header`, `Footer`, `Hero`                |
| Patterns    | Expression   | Data-driven visuals (orthogonal) | `BannerCurve`, `PatternStream`, `Divider` |

---

## Canonical Folder Structure

```txt
src/
  app.css                # Design tokens (@theme static), @layer definitions, prose styling
  fonts.css              # @font-face declarations
  lib/
    components/
      typography/        # Text, Heading, SubHeading, Code, Blockquote
      layout/            # Stack, Grid, Box, Container, Cluster, FullBleed, Frame, Layer
      controls/          # Button, Accordion, Dropdown, ColorSwatch, Icon
      blocks/            # Card, VideoCard, MarqueeRow, ContactForm
      composition/       # (planned) CardGrid, FilterGrid
      sections/          # Header, Footer, Hero, NavMenu
      patterns/          # BannerCurve, PatternStream, Divider, Pentagon
      index.ts           # Public barrel export
```

> `src/app.css` is the public CSS entry for design tokens and Tailwind mapping
> `src/fonts.css` contains `@font-face` declarations
> `src/lib/components/index.ts` is the public component barrel; folders below are private implementation details.

Everything UI-related lives here. _Pages and routes compose Sections — not the other way around._

---

## 1. Foundation

- _Role:_ Design tokens, global CSS rules, and layer definitions
- _Purpose:_ Central source of truth for values and styling architecture; no UI rendering
- _Contains:_ CSS variables, token maps, `@font-face` declarations, `@layer` definitions
- _Rules:_ No Svelte components, no semantic markup, no layout ownership

```txt
src/app.css              # Design tokens (@theme static), base layer, components layer
src/fonts.css            # @font-face declarations (Cairo, IBM Plex Sans)
```

---

## 2. Typography

- _Role:_ Text semantics, scales & style
- _Purpose:_ Define rhythm, scale, and typographic hierarchy
- _Includes:_ `Heading`, `Text`, `SubHeading`, `Code`, `Blockquote`, `Link`
- _Rules:_ Pure text responsibilities — avoid layout, visual decorations, or side effects

```txt
src/lib/components/typography/
  Heading.svelte
  Text.svelte
  SubHeading.svelte
  Code.svelte
  Blockquote.svelte
```

---

## 3. Layout

- _Role:_ Spatial relationships & flow
- _Purpose:_ Provide predictable spacing, flow, and alignment utilities used by other layers
- _Includes:_ `Stack`, `Cluster`, `Grid`, `Container`, `Box`, `FullBleed`, `Frame`, `Layer`
- _Rules:_ No visual styling or semantics; no interactive behavior — structure only

```txt
src/lib/components/layout/
  Stack.svelte
  Cluster.svelte
  Grid.svelte
  Container.svelte
  Box.svelte
  FullBleed.svelte
  Frame.svelte
  Layer.svelte
```

---

## 4. Controls

- _Role:_ Interaction primitives
- _Purpose:_ Small, single-purpose interactive elements for user input and actions
- _Includes:_ `Button`, `Accordion`, `Dropdown`, `ColorSwatch`, `Icon`, `SelectInput`
- _Rules:_ One primary interaction, minimal surface area, built from Typography +
  Layout; avoid multi-part semantics (if it contains multiple interactive children, it belongs
  elsewhere)

```txt
src/lib/components/controls/
  Button.svelte
  Accordion.svelte
  Dropdown.svelte
  ColorSwatch.svelte
```

---

## 5. Blocks

- _Role:_ Reusable semantic content units
- _Purpose:_ Encapsulate meaningful UI pieces that combine primitives into usable blocks
- _Includes:_ `Card`, `VideoCard`, `MarqueeRow`, `ContactForm`, `LogoTagline`
- _Rules:_ Compose Controls + Layout + Typography; no page-level awareness or
  routing responsibilities

```txt
src/lib/components/blocks/
  Card.svelte
  VideoCard.svelte
  MarqueeRow.svelte
  ContactForm.svelte
```

---

## 6. Composition

- _Role:_ Reusable arrangements of Blocks
- _Purpose:_ Encapsulate higher-order layouts and data-driven arrangements (grids, lists, filters) for reuse across pages
- _Includes:_ `CardGrid`, `FilterGrid` (planned)
- _Rules:_ Compose Blocks + Layout + Typography; no page-level awareness or routing responsibilities

```txt
src/lib/components/composition/   # (planned)
  CardGrid.svelte
  FilterGrid.svelte
```

---

## 7. Sections

- _Role:_ Page-level compositions
- _Purpose:_ Build page sections by composing Blocks; express page structure without embedding route logic
- _Includes:_ `Header`, `Footer`, `Hero`, `NavMenu`, `FAQ`
- _Rules:_ Page-aware and data-driven but route-agnostic; may be decorated by Patterns; avoid routing logic

```txt
src/lib/components/sections/
  Header.svelte
  Hero.svelte
  Footer.svelte
  NavMenu.svelte
```

---

## 8. Patterns

- _Role:_ Visual, decorative systems
- _Purpose:_ Provide optional, data-driven visual expression
  layered on top of components
- _Includes:_ `BannerCurve`, `PatternStream`, `Divider`, `Pentagon`
- _Rules:_ No layout ownership, no semantics, no content; fully prop-driven, optional and swappable

```txt
src/lib/components/patterns/
  BannerCurve.svelte
  PatternStream.svelte
  Divider.svelte
  Pentagon.svelte
```

Removing Patterns must never break layout or content.

---

## Dependency Rules (enforceable)

Foundation → Typography → Layout → Controls → Blocks → Composition → Sections

- _Enforcement:_ Higher layers may import from lower layers only. Prevent circular or upward
  imports.
- _Patterns:_ Orthogonal — they may decorate any layer but no layer should depend on
  Patterns.

---
