---
title: Foundations
description: Base design tokens including color, typography, spacing, and layout.
---

<script>
	import { ColorSwatch, Divider, Header, Heading, Stack, Text, Cluster } from '$lib/components';
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
	{ name: 'display', token: '--text-display' },
	{ name: 'title', token: '--text-title' },
	{ name: 'subtitle', token: '--text-subtitle' },
	{ name: 'lead', token: '--text-lead' },
	{ name: 'body', token: '--text-body' },
	{ name: 'caption', token: '--text-caption' }
	];
	const weights = [
	{ name: 'normal', value: 400 },
	{ name: 'medium', value: 500 },
	{ name: 'semibold', value: 600 },
	{ name: 'bold', value: 700 }
	];
	const radius = [
	{ name: '0', value: '0' },
	{ name: 'sm', value: '0.25rem' },
	{ name: 'md', value: '0.5rem' },
	{ name: 'lg', value: '1.25rem' }
	];
	const shadows = ['sm', 'md', 'lg'];
	const widths = [
	{ name: 'narrow', value: '28rem' },
	{ name: 'prose', value: '60ch' },
	{ name: 'content', value: '72rem' },
	{ name: 'wide', value: '90rem' }
	];
</script>

<Header
  title="Tokens & Foundations"
/>

<Heading type="title" tag="h2">Colors</Heading>

### Neutrals

| Name  | Token           | Value (Approx)   |
| ----- | --------------- | ---------------- |
| White | `--color-white` | oklch(100% 0 0)  |
| Black | `--color-black` | oklch(0.15% 0 0) |

### Brand Palette

Each brand color includes named variants: `subtle`, `muted`, `base`, `strong`, `contrast` — plus a numeric 9-tone scale (100–900).

| Color  | Base Token       | Usage               |
| ------ | ---------------- | ------------------- |
| Yellow | `--color-yellow` | Highlights          |
| Teal   | `--color-teal`   | Secondary actions   |
| Blue   | `--color-blue`   | Links, Info         |
| Orange | `--color-orange` | Warnings, Warmth    |
| Pink   | `--color-pink`   | Accents, Primary    |
| Grey   | `--color-grey`   | Borders, Muted text |

<Cluster justify="center" space="lg">
  {#each colors.brand as c}
    <Stack space="xs" align="center">
      <ColorSwatch token="{c.name}-muted" ratio="16/9" label="" />
      <ColorSwatch token="{c.name}-400" ratio="16/9" label="" />
      <ColorSwatch token="{c.name}-strong" ratio="16/9" label="" />
      <Text type="caption" align="center">{c.name}</Text>
    </Stack>
  {/each}
</Cluster>

<Divider type="curves" />

<Heading type="title" tag="h2">Typography</Heading>

### Font Families

| Role    | Token            | Font Stack                                |
| ------- | ---------------- | ----------------------------------------- |
| Display | `--font-display` | Cairo, Optima, sans-serif                 |
| Body    | `--font-body`    | IBM Plex Sans, Helvetica Neue, sans-serif |
| Mono    | `--font-mono`    | ui-monospace, Cascadia Code, monospace    |

### Scale

<Stack space="sm">
{#each fontSizes as size}
  <Cluster justify="center" space="xl">
    <div style="width: 5rem; font-family: monospace; color: var(--color-grey);">{size.name}</div>
    <div style="width: 10rem; font-family: monospace; color: var(--color-grey);">{size.token}</div>
    <div style="font-size: var({size.token});">Aa</div>
  </Cluster>
{/each}
</Stack>

### Weights

<Stack space="sm">
{#each weights as w}
  <Cluster justify="center" space="xl">
    <div style="width: 6rem; font-family: monospace; color: var(--color-grey);">{w.name}</div>
    <div style="width: 12rem; font-family: monospace; color: var(--color-grey);">--font-weight-{w.name}</div>
    <div style="font-weight: {w.value}; font-size: 1.25rem;">{w.value}</div>
  </Cluster>
{/each}
</Stack>

<Divider type="curves" />

<Heading type="title" tag="h2">Spacing</Heading>

Fluid spacing scale using `clamp()` for responsiveness.

<Stack space="sm">
{#each spacing as s}
  <Cluster justify="center" space="md">
    <div style="width: 3rem; font-family: monospace; color: var(--color-grey);">{s.name}</div>
    <div style="width: 200px; display: flex; justify-content: center;">
        <div style="height: 1.5rem; background-color: var(--color-pink-200); width: var(--spacing-{s.name}); border-radius: 2px;"></div>
    </div>
    <div style="width: 8rem; font-family: monospace; font-size: 0.75rem; color: var(--color-grey); text-align: center;">--spacing-{s.name}</div>
  </Cluster>
{/each}
</Stack>

<Divider type="curves" />

<Heading type="title" tag="h2">Borders & Shadows</Heading>

### Radius

<div style="display: flex; flex-wrap: wrap; gap: 2rem; margin-block: 1rem;">
{#each radius as r}
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <div style="width: 4rem; height: 4rem; background-color: var(--color-grey-200); border: 1px solid var(--color-grey); border-radius: var(--radius-{r.name})"></div>
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

<Heading type="title" tag="h2">Widths</Heading>

### Content Widths

<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-block: 1rem;">
{#each widths as w}
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="width: 5rem; font-family: monospace; color: var(--color-grey);">{w.name}</div>
    <div style="font-family: monospace; font-size: 0.875rem;">--width-{w.name}</div>
    <div style="font-family: monospace; font-size: 0.75rem; color: var(--color-grey);">{w.value}</div>
  </div>
{/each}
</div>
