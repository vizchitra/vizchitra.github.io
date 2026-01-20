---
title: Foundations
description: Base design tokens including color, typography, spacing, and layout.
---

<script>
	import { colorTokens } from '$lib/utils/colorTokens';
	// Data for rendering
	const colors = {
	neutral: [
	{ name: 'white', token: '--color-white', hex: '#ffffff' },
	{ name: 'black', token: '--color-black', hex: '#050505' },
	{ name: 'grey', token: '--color-grey', hex: '#6a6a6a' }
	],
	brand: [
	{ name: 'yellow', token: '--color-yellow' },
	{ name: 'teal', token: '--color-teal' },
	{ name: 'blue', token: '--color-blue' },
	{ name: 'orange', token: '--color-orange' },
	{ name: 'pink', token: '--color-pink' }
	]
	};
	const spacing = [
	{ name: '0', value: '0' },
	{ name: 'px', value: '1px' },
	{ name: 'xs', value: 'clamp(0.25rem, 0.5vw + 0.125rem, 0.5rem)' },
	{ name: 'sm', value: 'clamp(0.5rem, 1vw + 0.25rem, 1rem)' },
	{ name: 'md', value: 'clamp(1rem, 2vw + 0.5rem, 1.5rem)' },
	{ name: 'lg', value: 'clamp(1.5rem, 3vw + 0.75rem, 2.5rem)' },
	{ name: 'xl', value: 'clamp(2rem, 4vw + 1rem, 4rem)' },
	{ name: '2xl', value: 'clamp(3rem, 6vw + 1.5rem, 6rem)' },
	{ name: '3xl', value: 'clamp(4rem, 8vw + 2rem, 8rem)' },
	{ name: '4xl', value: 'clamp(6rem, 12vw + 3rem, 12rem)' }
	];
	const fonts = [
	{ name: 'display', family: 'Cairo, Optima, sans-serif' },
	{ name: 'body', family: 'IBM Plex Sans, sans-serif' },
	{ name: 'mono', family: 'ui-monospace, monospace' }
	];
	const fontSizes = [
	'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'
	];
	const weights = [
	{ name: 'normal', value: 400 },
	{ name: 'medium', value: 500 },
	{ name: 'semibold', value: 600 },
	{ name: 'bold', value: 700 },
	{ name: 'black', value: 900 }
	];
	const radius = [
	{ name: 'none', value: '0' },
	{ name: 'sm', value: '0.25rem' },
	{ name: 'md', value: '0.5rem' },
	{ name: 'lg', value: '0.75rem' }
	];
	const shadows = ['sm', 'md', 'lg'];
	const maxWidths = [
	'prose', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'
	];
	const minWidths = [
	'2xs', 'xs', 'sm', 'md', 'lg', 'xl'
	];
</script>

<Header 
  title="Foundations" 
  tagline="The atomic design tokens that define the visual language. These values conform to the tokens.css source of truth."
/>

<Slanted tag="h2" color="black" textContent="COLORS" />

### Neutrals

| Name  | Token           | Value (Approx)   |
| ----- | --------------- | ---------------- |
| White | `--color-white` | oklch(100% 0 0)  |
| Black | `--color-black` | oklch(0.19% 0 0) |

### Brand Palette

Each brand color includes `light` (tint), `default`, and `dark` (shade) variants.

| Color  | Base Token       | Usage               |
| ------ | ---------------- | ------------------- |
| Yellow | `--color-yellow` | Highlights          |
| Teal   | `--color-teal`   | Secondary actions   |
| Blue   | `--color-blue`   | Links, Info         |
| Orange | `--color-orange` | Warnings, Warmth    |
| Pink   | `--color-pink`   | Accents, Primary    |
| Grey   | `--color-grey`   | Borders, Muted text |

<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; margin-block: 2rem;">
  {#each colors.brand as c}
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <div style="height: 3rem; width: 100%; border-radius: 0.25rem; background-color: var(--color-{c.name}-light);" title="{c.name} light"></div>
      <div style="height: 3rem; width: 100%; border-radius: 0.25rem; background-color: var(--color-{c.name});" title="{c.name}"></div>
      <div style="height: 3rem; width: 100%; border-radius: 0.25rem; background-color: var(--color-{c.name}-dark);" title="{c.name} dark"></div>
      <span style="font-size: 0.875rem; font-weight: 500; text-transform: capitalize;">{c.name}</span>
    </div>
  {/each}
</div>

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="TYPOGRAPHY" />

### Font Families

| Role    | Token            | Font Stack                                |
| ------- | ---------------- | ----------------------------------------- |
| Display | `--font-display` | Cairo, Optima, sans-serif                 |
| Body    | `--font-body`    | IBM Plex Sans, Helvetica Neue, sans-serif |
| Mono    | `--font-mono`    | ui-monospace, Cascadia Code, monospace    |

### Scale

<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-block: 1rem;">
{#each fontSizes as size}
  <div style="display: flex; align-items: baseline; gap: 2rem;">
    <div style="width: 4rem; font-family: monospace; color: var(--color-grey);">{size}</div>
    <div style="width: 12rem; font-family: monospace; color: var(--color-grey);">--font-size-{size}</div>
    <div style="font-size: var(--font-size-{size});">Aa</div>
  </div>
{/each}
</div>

### Weights

<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-block: 1rem;">
{#each weights as w}
  <div style="display: flex; align-items: baseline; gap: 2rem;">
    <div style="width: 6rem; font-family: monospace; color: var(--color-grey);">{w.name}</div>
    <div style="width: 12rem; font-family: monospace; color: var(--color-grey);">--font-weight-{w.name}</div>
    <div style="font-weight: {w.value}; font-size: 1.25rem;">{w.value}</div>
  </div>
{/each}
</div>

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="SPACING" />

Fluid spacing scale using `clamp()` for responsiveness.

<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-block: 1rem;">
{#each spacing as s}
  <div style="display: flex; align-items: center; gap: 1rem;">
    <div style="width: 3rem; font-family: monospace; color: var(--color-grey);">{s.name}</div>
    <div style="flex: 1;">
        <div style="height: 1.5rem; background-color: var(--color-pink-light); width: var(--spacing-{s.name}); border-radius: 2px;"></div>
    </div>
    <div style="width: 8rem; font-family: monospace; font-size: 0.75rem; color: var(--color-grey); text-align: right;">--spacing-{s.name}</div>
  </div>
{/each}
</div>

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="BORDERS & SHADOWS" />

### Radius

<div style="display: flex; flex-wrap: wrap; gap: 2rem; margin-block: 1rem;">
{#each radius as r}
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <div style="width: 4rem; height: 4rem; background-color: var(--color-grey-light); border: 1px solid var(--color-grey); border-radius: var(--radius-{r.name})"></div>
    <div style="font-family: monospace; font-size: 0.875rem;">{r.name}</div>
    <div style="font-family: monospace; font-size: 0.75rem; color: var(--color-grey);">--radius-{r.name}</div>
  </div>
{/each}
</div>

### Shadows

<div style="display: flex; flex-wrap: wrap; gap: 2rem; margin-block: 1rem;">
{#each shadows as s}
  <div style="width: 6rem; height: 6rem; background-color: white; border-radius: 0.5rem; box-shadow: var(--shadow-{s}); display: flex; align-items: center; justify-content: center; font-family: monospace;">
    {s}
  </div>
{/each}
</div>

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="WIDTHS" />

### Max Widths

<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-block: 1rem;">
{#each maxWidths as w}
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="width: 4rem; font-family: monospace; color: var(--color-grey);">{w}</div>
    <div style="font-family: monospace; font-size: 0.875rem;">--width-{w}</div>
  </div>
{/each}
</div>

### Min Widths (Component)

<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-block: 1rem;">
{#each minWidths as w}
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="width: 4rem; font-family: monospace; color: var(--color-grey);">{w}</div>
    <div style="font-family: monospace; font-size: 0.875rem;">--min-width-{w}</div>
  </div>
{/each}
</div>
