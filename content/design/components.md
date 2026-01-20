---
title: Components
description: Reusable system components including Layout, Interface, and Typography.
---

<script>
</script>

<Header 
  title="Components" 
  tagline="The building blocks of the interface. These components enforce consistency and are directly mapped to the CSS components layer."
/>

<Slanted tag="h2" color="black" textContent="LAYOUT" />

### primitives.layout

These components control spacing and flow. **Do not use raw flex/grid classes.**

#### Stack

Vertical flow with consistent spacing.

<Stack>
  <div style="padding: 0.5rem; background-color: var(--color-grey-light); border-radius: 0.25rem;">Item 1</div>
  <div style="padding: 0.5rem; background-color: var(--color-grey-light); border-radius: 0.25rem;">Item 2</div>
  <div style="padding: 0.5rem; background-color: var(--color-grey-light); border-radius: 0.25rem;">Item 3</div>
</Stack>

```svelte
<Stack gap="md">
	<div>Item 1</div>
	<div>Item 2</div>
</Stack>
```

| Prop  | Type   | Default | Options                                         |
| ----- | ------ | ------- | ----------------------------------------------- |
| `gap` | string | `'md'`  | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'` |

#### Cluster

Inline flow that wraps. Perfect for tags, buttons, or metadata.

<Cluster gap="sm">
  <div style="padding: 0.25rem; background-color: var(--color-pink-light); border-radius: 0.25rem;">Tag 1</div>
  <div style="padding: 0.25rem; background-color: var(--color-blue-light); border-radius: 0.25rem;">Tag 2</div>
  <div style="padding: 0.25rem; background-color: var(--color-teal-light); border-radius: 0.25rem;">Tag 3</div>
</Cluster>

```svelte
<Cluster gap="sm" align="center" justify="start">
	<Button>Action</Button>
	<span>Label</span>
</Cluster>
```

| Prop      | Type   | Default    | Options                                                             |
| --------- | ------ | ---------- | ------------------------------------------------------------------- |
| `gap`     | string | `'md'`     | `'xs'`, `'sm'`... (same as Stack)                                   |
| `align`   | string | `'center'` | `'start'`, `'end'`, `'center'`, `'baseline'`, `'stretch'`           |
| `justify` | string | `'start'`  | `'start'`, `'end'`, `'center'`, `'between'`, `'around'`, `'evenly'` |

#### Grid

Responsive grid layout.

<Grid minWidth="100px" space="sm">
  <div style="padding: 0.5rem; background-color: var(--color-blue-light); border-radius: 0.25rem;">1</div>
  <div style="padding: 0.5rem; background-color: var(--color-blue-light); border-radius: 0.25rem;">2</div>
  <div style="padding: 0.5rem; background-color: var(--color-blue-light); border-radius: 0.25rem;">3</div>
</Grid>

```svelte
<Grid minWidth="280px" maxColumns={3} space="sm">
	<Card>...</Card>
	<Card>...</Card>
</Grid>
```

| Prop         | Type   | Default   | Description                                     |
| ------------ | ------ | --------- | ----------------------------------------------- |
| `minWidth`   | string | `'280px'` | Minimum width of a column before wrapping       |
| `maxColumns` | number | `3`       | Maximum number of columns                       |
| `space`      | string | `'md'`    | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'` |

#### FullBleed

Breaks out of the centered content container to span the full viewport.

```svelte
<FullBleed style="background-color: var(--color-section);">
	<!-- Content here -->
</FullBleed>
```

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="INTERFACE" />

### primitives.interface

Interactive and containing elements.

#### Button

Standard action element.

<Cluster>
  <Button color="pink" href="#">Primary Action</Button>
  <Button color="grey" href="#">Secondary</Button>
</Cluster>

```svelte
<Button color="pink" href="/route" size="md">Label</Button>
```

| Prop       | Type    | Default   | Options                                                        |
| ---------- | ------- | --------- | -------------------------------------------------------------- |
| `color`    | string  | `'black'` | `'pink'`, `'blue'`, `'teal'`, `'orange'`, `'yellow'`, `'grey'` |
| `size`     | string  | `'md'`    | `'sm'`, `'md'`, `'lg'`                                         |
| `href`     | string  | required  | URL path                                                       |
| `external` | boolean | `false`   | Opens in new tab if true                                       |

#### Card

Generic content container. Supports `bordered` (accent border) or Default (image) variants.

<Grid minWidth="200px" maxColumns={2} space="sm">
  <Card variant="bordered" color="pink" title="Bordered Card">
    Simple content container with an accent border.
  </Card>
</Grid>

```svelte
<Card variant="bordered" color="pink" title="Title">Content</Card>
```

#### CallCard

High-prominence call to action with decorative patterns.

<CallCard
  title="Join Us"
  subtitle="Become a member"
  pattern="circle"
  color="teal"
  href="#"
/>

```svelte
<CallCard title="Title" subtitle="Subtitle" pattern="circle" color="teal" href="/link" />
```

| Prop      | Type   | Options                                      |
| --------- | ------ | -------------------------------------------- |
| `pattern` | string | `'circle'`, `'waves'`, `'river'`, `'stream'` |
| `color`   | string | Brand colors                                 |

#### FormatCard

specialized card for defining event formats.

<FormatCard
title="Workshop"
color="orange"
duration="3h"
bestFor="Deep dives"
points={['Interactive', 'Code-focused']}
/>

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="TYPOGRAPHY" />

### primitives.typography

Semantic text components.

#### Heading & SubHeading

Standard page hierarchy.

<Heading tag="h3" align="left">Section Title</Heading>
<SubHeading>Descriptive subtitle text allowing for <ColorSpan color="blue">highlights</ColorSpan>.</SubHeading>

```svelte
<Heading tag="h2">Title</Heading>
<SubHeading>Subtitle</SubHeading>
```

#### Slanted

Decorative display text for section dividers.

<Slanted tag="h3" color="pink" textContent="SECTION HEADER" />

```svelte
<Slanted tag="h2" color="pink" textContent="TEXT" />
```

#### Notice

For alerts, warnings, or emphasized information.

<Notice color="yellow">
  **Note:** This is important information for the user.
</Notice>

```svelte
<Notice color="yellow">Markdown content supported</Notice>
```
