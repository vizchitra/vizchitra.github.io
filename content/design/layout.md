---
title: Layout Primitives
description: The 8 spatial composition components. Each has one responsibility. No overlaps.
---

<Header
  title="Layout Primitives"
/>

## PAGE RHYTHM & WIDTH

### 1. Container

**Sets page rhythm with vertical padding, centers content, and constrains width.**

Combines vertical padding (page sections) with horizontal centering and width control. Use for all page-level sectioning.

**Use when:** Content changes topic or section, or needs width constraint with centering.

<Container paddingY="md" width="content" paddingX="sm" style="border: 2px dashed var(--color-grey); border-radius: var(--radius-md);">
  <Stack space="sm">
    <div style="padding: 0.5rem; background-color: var(--color-pink-200); border-radius: 0.25rem; font-size: 0.875rem;">Section 1: Hero</div>
    <div style="padding: 0.5rem; background-color: var(--color-pink-200); border-radius: 0.25rem; font-size: 0.875rem;">Section 2: Features</div>
  </Stack>
</Container>

```svelte
<Container paddingY="xl" width="content" paddingX="md">
	<Stack space="lg">
		<!-- Content here -->
	</Stack>
</Container>
```

| Prop       | Type   | Default      | Options                                                     |
| ---------- | ------ | ------------ | ----------------------------------------------------------- |
| `paddingY` | Space  | `'md'`       | `'0'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`      |
| `paddingX` | Space  | `'md'`       | `'0'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`      |
| `width`    | Width  | `'content'`  | `'prose'`, `'narrow'`, `'content'`, `'wide'`, `'full'`       |
| `tag`      | string | `'div'`      | Any HTML element name                                        |

**Anti-patterns:**

- Do not use Stack at page root — Wrap in Container first
- Do not add margins to children — Container/Stack handle spacing
- Do not nest Containers for spacing — Use one Container with Stack inside

### 2. Stack

**Applies all vertical spacing between direct children.**

Single source of vertical rhythm. Replaces all margin-top hacks.

**Use when:** Things go down (vertical flow).

<Stack space="md">
  <div style="padding: 0.5rem; background-color: var(--color-orange-200); border-radius: 0.25rem; font-size: 0.875rem;">Item 1</div>
  <div style="padding: 0.5rem; background-color: var(--color-orange-200); border-radius: 0.25rem; font-size: 0.875rem;">Item 2</div>
  <div style="padding: 0.5rem; background-color: var(--color-orange-200); border-radius: 0.25rem; font-size: 0.875rem;">Item 3</div>
</Stack>

```svelte
<Stack space="md" align="center">
	<Heading>Title</Heading>
	<Text>Description text</Text>
	<Button>Action</Button>
</Stack>
```

| Prop    | Type  | Default     | Options                                                   |
| ------- | ----- | ----------- | --------------------------------------------------------- |
| `space` | Space | `'md'`      | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`           |
| `align` | Align | `'stretch'` | `'start'`, `'end'`, `'center'`, `'baseline'`, `'stretch'` |

**Anti-patterns:**

- Do not add margin-top to children — Stack owns all spacing
- Do not use margin-bottom — Stack's gap replaces it
- Do not mix Stack with Container for spacing — Stack handles vertical, Container handles width

### 3. Cluster

**Lays out items horizontally with consistent gaps and wrapping.**

Row-based layout. Wraps automatically. Resets on smaller screens.

**Use when:** Things go across (horizontal flow with wrapping).

<Cluster space="sm" align="center" justify="start">
  <div style="padding: 0.25rem; background-color: var(--color-yellow-200); border-radius: 0.25rem; font-size: 0.75rem;">Tag 1</div>
  <div style="padding: 0.25rem; background-color: var(--color-yellow-200); border-radius: 0.25rem; font-size: 0.75rem;">Tag 2</div>
  <div style="padding: 0.25rem; background-color: var(--color-yellow-200); border-radius: 0.25rem; font-size: 0.75rem;">Tag 3</div>
  <div style="padding: 0.25rem; background-color: var(--color-yellow-200); border-radius: 0.25rem; font-size: 0.75rem;">Tag 4</div>
</Cluster>

```svelte
<Cluster space="sm" align="center" justify="between">
	<Button>Action 1</Button>
	<Button>Action 2</Button>
	<span>Meta info</span>
</Cluster>
```

| Prop      | Type    | Default    | Options                                                             |
| --------- | ------- | ---------- | ------------------------------------------------------------------- |
| `space`   | Space   | `'md'`     | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` (or custom CSS value)        |
| `align`   | Align   | `'center'` | `'start'`, `'end'`, `'center'`, `'baseline'`, `'stretch'`           |
| `justify` | Justify | `'center'` | `'start'`, `'end'`, `'center'`, `'between'`, `'around'`, `'evenly'` |

**Anti-patterns:**

- Do not use Cluster for vertical layouts — Use Stack instead
- Do not use Cluster at page level — Wrap in Container
- Do not add margins to Cluster children — Use space property

---

### 4. Grid

**Distributes items in two dimensions with responsive tracks.**

Cards, galleries, dashboards. Order matters in both axes. Auto-responsive.

**Use when:** Layout is truly 2D (not just wrapping rows).

<Grid minWidth="100px" gap="sm">
  <div style="padding: 0.5rem; background-color: var(--color-pink); color: white; border-radius: 0.25rem; font-size: 0.875rem;">1</div>
  <div style="padding: 0.5rem; background-color: var(--color-pink); color: white; border-radius: 0.25rem; font-size: 0.875rem;">2</div>
  <div style="padding: 0.5rem; background-color: var(--color-pink); color: white; border-radius: 0.25rem; font-size: 0.875rem;">3</div>
  <div style="padding: 0.5rem; background-color: var(--color-pink); color: white; border-radius: 0.25rem; font-size: 0.875rem;">4</div>
  <div style="padding: 0.5rem; background-color: var(--color-pink); color: white; border-radius: 0.25rem; font-size: 0.875rem;">5</div>
</Grid>

```svelte
<Grid minWidth="280px" gap="md">
	<Card>...</Card>
	<Card>...</Card>
	<Card>...</Card>
</Grid>
```

| Prop       | Type    | Default      | Options / Description                                              |
| ---------- | ------- | ------------ | ------------------------------------------------------------------ |
| `minWidth` | string  | `'20rem'`    | Minimum column width before wrapping (e.g. `'280px'`)              |
| `gap`      | Gap     | `'md'`       | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`                    |
| `align`    | Align   | `'center'`   | `'start'`, `'end'`, `'center'`, `'stretch'`, `'baseline'`          |
| `justify`  | Justify | `'center'`   | `'start'`, `'end'`, `'center'`, `'stretch'`                        |

**Anti-patterns:**

- Do not use Grid for single-column layouts — Use Stack instead
- Do not use Grid for navigation items — Use Cluster instead
- Do not force fixed grid with no responsiveness — Use minWidth for auto-fit

---

<Heading type="title" tag="h2">Decoration</Heading>

### 5. Box

**Adds visual styling (background, border, padding) to content.**

Decorates without affecting layout. For cards, panels, highlighted areas.

**Use when:** Content needs visual distinction.

<Box space="md" color="pink">
  <Text>Styled content in a box</Text>
</Box>

```svelte
<Box space="md" color="teal" radius="md">
	<Stack space="sm">
		<Heading tag="h3">Card Title</Heading>
		<Text>Card content goes here</Text>
	</Stack>
</Box>
```

| Prop     | Type   | Default    | Options                                                          |
| -------- | ------ | ---------- | ---------------------------------------------------------------- |
| `color`  | Color  | `'grey'`   | `'none'`, `'grey'`, `'yellow'`, `'blue'`, `'teal'`, `'pink'`, `'orange'` |
| `space`  | Space  | `'sm'`     | `'0'`, `'xs'`, `'sm'`, `'md'`, `'lg'`                            |
| `inset`  | Inset  | `'normal'` | `'normal'`, `'stretch'`, `'squish'`                              |
| `radius` | Radius | `'0'`      | `'0'`, `'sm'`, `'md'`, `'lg'`                                   |
| `tag`    | string | `'div'`    | Any HTML element name                                            |

**Anti-patterns:**

- Do not use Box for spacing — Use Stack or Container
- Do not use Box for centering — Use Container or Cluster

### 6. FullBleed

**Breaks out of parent width to span full viewport.**

For hero images, full-width banners, edge-to-edge sections.

**Use when:** Content must escape container constraints.

<FullBleed paddingY="md">
  <div style="padding: 1rem; background-color: var(--color-teal-200); text-align: center; font-size: 0.875rem;">Full viewport width content</div>
</FullBleed>

```svelte
<Container width="content">
	<Stack space="lg">
		<Text>Regular content</Text>
		<FullBleed paddingY="xl">
			<img src="/hero.jpg" alt="Full width hero" />
		</FullBleed>
		<Text>Back to constrained content</Text>
	</Stack>
</Container>
```

| Prop       | Type  | Default  | Options                                                     |
| ---------- | ----- | -------- | ----------------------------------------------------------- |
| `paddingY` | Space | `'xl'`   | `'0'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`      |
| `paddingX` | Space | `'0'`    | `'0'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`      |

**Anti-patterns:**

- Do not use FullBleed for every image — Only for intentional full-width escapes
- Do not nest FullBleed components — Creates layout chaos

---

### 7. Frame

**Maintains aspect ratio for images and videos.**

Wraps media content to enforce consistent proportions.

**Use when:** Images or videos need fixed aspect ratios.

```svelte
<Frame ratio="video" position="center" width="100%">
	<img src="image.jpg" alt="Description" />
</Frame>
```

| Prop       | Type     | Default       | Options / Description                                              |
| ---------- | -------- | ------------- | ------------------------------------------------------------------ |
| `ratio`    | Ratio    | `'landscape'` | `'square'`, `'portrait'`, `'landscape'`, `'video'`, `'ultrawide'` or custom (e.g. `'2/1'`) |
| `position` | Position | `'center'`    | `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'` or CSS value  |
| `width`    | string   | —             | Optional width constraint (e.g. `'100%'`, `'400px'`)               |
| `height`   | string   | —             | Optional height constraint (e.g. `'80svh'`)                        |
| `tag`      | string   | `'div'`       | HTML element to render                                             |

### 8. Layer

**Controls stacking context and positioning.**

For overlays, sticky headers, absolute positioning.

**Use when:** Content needs z-index control or non-flow positioning.

```svelte
<Layer position="sticky" zIndex={10}>
	<Header />
</Layer>
```

| Prop       | Type     | Default      | Options / Description                                         |
| ---------- | -------- | ------------ | ------------------------------------------------------------- |
| `position` | Position | `'relative'` | `'relative'`, `'absolute'`, `'fixed'`, `'sticky'`             |
| `inset`    | boolean or string | `false` | `true` = `0px`, or custom CSS (e.g. `'1rem'`)          |
| `zIndex`   | number or string  | —       | Z-index value                                           |
| `overflow` | Overflow | —            | `'visible'`, `'hidden'`, `'clip'`, `'scroll'`, `'auto'`       |

---

The **Golden Path** for building pages:

```svelte
<Container paddingY="xl" width="content" paddingX="md">
	<Stack space="lg">
		<Heading tag="h1">Page Title</Heading>
		<Text>Introduction paragraph</Text>

		<Grid minWidth="280px" gap="md">
			<Card>Feature 1</Card>
			<Card>Feature 2</Card>
			<Card>Feature 3</Card>
		</Grid>
	</Stack>
</Container>
```

**If content is prose:**

```svelte
<Container paddingY="xl" width="prose">
	<Stack space="lg">
		<h1>Article Title</h1>
		<p>Long-form readable content...</p>
		<p>More paragraphs...</p>
	</Stack>
</Container>
```

**If you need full-width content:**

```svelte
<Container paddingY="xl" width="content">
	<Stack space="lg">
		<Heading>Section Title</Heading>
		<FullBleed>
			<img src="/wide-image.jpg" alt="Full width" />
		</FullBleed>
		<Text>Back to normal width</Text>
	</Stack>
</Container>
```

---

<Heading type="title" tag="h2">What Owns What</Heading>

Never mix these responsibilities:

| Concern            | Primitive                      | Do NOT Use                |
| ------------------ | ------------------------------ | ------------------------- |
| Page sections      | **Container**                  | Margins, padding on divs  |
| Reading width      | **Container** (width="prose")  | Raw max-width classes     |
| Vertical spacing   | **Stack**                      | Margin-top, margin-bottom |
| Horizontal spacing | **Cluster**                    | Flex on divs without gap  |
| 2D distribution    | **Grid**                       | Multiple Stacks           |
| Visual styling     | **Box**                        | Inline styles             |
| Full-width escape  | **FullBleed**                  | Negative margins          |
| Aspect ratio       | **Frame**                      | Padding-bottom hacks      |
| Stacking context   | **Layer**                      | Raw z-index / position    |

---

<Heading type="title" tag="h2">One-Line Rules for Reviews</Heading>

- **If something needs space** — Use Stack
- **If sections need separation** — Use Container with paddingY
- **If text needs readability** — Use Container with width="prose"
- **If items wrap** — Use Cluster
- **If grid-like** — Use Grid
- **If visually styled** — Use Box
- **If full-width needed** — Use FullBleed
- **If media needs ratio** — Use Frame
- **If stacking context** — Use Layer
- **If uncertain** — Re-read the Core Rule

---

<Heading type="title" tag="h2">Final Reminder</Heading>

These primitives exist to:

- Reduce layout decisions
- Enforce consistency
- Make pages predictable

**If you feel the need to invent a new layout pattern, first try composing these 8.**
