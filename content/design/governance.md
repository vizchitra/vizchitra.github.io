---
title: Governance
description: Rules for contributing to and evolving the design system.
---

<script>
</script>

<Header 
  title="Governance" 
  tagline="The design system is a living product. These rules ensure it scales without degrading."
/>

<Notice color="pink">
  **Enforcement:** The rules below are enforced by CI/CD via `oxlint` and `eslint`. Bypass attempts will fail the build.
</Notice>

<Slanted tag="h2" color="black" textContent="CONTRIBUTION" />

### How to Propose Changes

1. **Tokens**: Additions to `tokens.css` require approval.
   - Do not add "one-off" values.
   - Verify if an existing token can serve the purpose.
2. **Components**: New components must live in `src/lib/components`.
   - Must use existing tokens.
   - Must NOT use arbitrary Tailwind values (e.g. `bg-[#123]`).

### Breaking Changes

A change is **breaking** if it:

- Renames or removes a token.
- Changes a component prop name or type.
- Alters the visual output of a primitive significantly.

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="LINTING RULES" />

We use `eslint-plugin-better-tailwindcss` to enforce system usage.

### 1. No Tailwind in Markdown

**Context:** Content files (`.md`)
**Rule:** `better-tailwindcss/no-unregistered-classes`

❌ **Forbidden:**

```text
<div data-invalid-class="bg-red-500 p-sm">...</div>
```

✅ **Allowed:**

```markdown
<Notice color="pink">...</Notice>
```

### 2. No Raw Layout Classes

**Context:** Component files (`.svelte`)
**Rule:** `better-tailwindcss/no-restricted-classes`

We explicitly block generic layout utilities to force semantic structure.

| Forbidden Class                 | Required Component |
| ------------------------------- | ------------------ |
| `flex`, `flex-col`, `gap-*`     | **Stack**          |
| `flex`, `flex-row`, `flex-wrap` | **Cluster**        |
| `grid`, `grid-cols-*`           | **Grid**           |

### 3. No Raw Hex Values

**Context:** All files
**Rule:** `no-unregistered-classes`

All colors must map to the system palette.

❌ **Forbidden:** `text-[#ff0000]`
✅ **Allowed:** `text-pink` (mapped to token)

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="EVOLUTION" />

### Adding a New Token

1.  Add canonical CSS variable to `src/lib/assets/css/tokens.css`
    ```css
    --viz-space-new: 5rem;
    ```
2.  Map to Tailwind theme in `src/app.css`
    ```css
    --spacing-new: var(--viz-space-new);
    ```

### Adding a New Component

1.  Draft in `foundations/components` (if experimental).
2.  Move to `src/lib/components` once stable.
3.  Document in `/design/components`.
