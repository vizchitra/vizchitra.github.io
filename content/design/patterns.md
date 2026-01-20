---
title: Patterns
description: Guidelines for composing layout primitives and page sections.
---

<script>
</script>

<Header 
  title="Patterns" 
  tagline="How to compose primitives to build consistent UIs. Focus on flow and structure over pixel-perfect positioning."
/>

<Slanted tag="h2" color="black" textContent="LAYOUT COMPOSITION" />

### Choosing a Layout Primitive

| Layout Pattern      | Primitive     | Use Case                                                |
| ------------------- | ------------- | ------------------------------------------------------- |
| **Vertical Stack**  | **Stack**     | Form fields, text blocks, sidebar items, card content   |
| **Horizontal Wrap** | **Cluster**   | Tags, action buttons, metadata rows, nav links          |
| **2D Grid**         | **Grid**      | Card collections, gallery layouts, dashboard widgets    |
| **Full Width**      | **FullBleed** | Colored backgrounds, hero sections, full-width dividers |

### Do's and Don'ts

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-block: 2rem;">
  <div style="padding: 1rem; background-color: var(--color-teal-light); border-radius: 0.375rem;">
    <strong style="display: block; margin-bottom: 0.5rem; color: var(--color-teal-dark);">✅ DO</strong>
    <p>Use <code>Stack</code> for vertical rhythm between elements.</p>
  </div>
  <div style="padding: 1rem; background-color: var(--color-pink-light); border-radius: 0.375rem;">
    <strong style="display: block; margin-bottom: 0.5rem; color: var(--color-pink-dark);">❌ DON'T</strong>
    <p>Use <code>flex flex-col gap-sm</code> or margins for spacing.</p>
  </div>
</div>

<Notice color="yellow">
  **Linting Rule:** Direct use of `flex`, `grid`, and `gap` utility classes is forbidden by the linter. You must use the layout components.
</Notice>

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="PAGE SECTIONS" />

### Default Content Container

By default, all Markdown content is constrained to a readable measure (`max-w-3xl`) and centered.

```text
<!-- Wrapper automatically applied by layout -->
<section style="max-width: var(--width-3xl); margin-inline: auto;">
	<p>Your content lives here...</p>
</section>
```

### Creating Full-Width Sections

To break out of the default container (e.g., for a colored background section), use the **FullBleed** component.

<FullBleed style="background-color: var(--color-blue-light); padding-block: var(--spacing-xl); margin-block: var(--spacing-lg);">
  <div style="max-width: var(--width-3xl); margin-inline: auto;">
    <Heading tag="h3">Full Width Background</Heading>
    <p>The content inside returns to the standard measure.</p>
  </div>
</FullBleed>

```text
<FullBleed style="background-color: var(--color-blue-light); padding-block: var(--spacing-xl);">
	<!-- Re-apply content-container to center content -->
	<div style="max-width: var(--width-3xl); margin-inline: auto;">
		<Heading tag="h2">Section Title</Heading>
		<p>Content...</p>
	</div>
</FullBleed>
```

### Standard Section

For standard sections that just need vertical separation, use simple vertical margins or the **DividerCurves** component.

<Divider type="curves" />

<Slanted tag="h2" color="black" textContent="CARD PATTERNS" />

### Grid of Cards

Use **Grid** to display a collection of cards. The `minWidth` prop determines when columns wrap.

<Grid minWidth="280px" space="md">
  <Card variant="bordered" color="pink" title="Feature A">Description</Card>
  <Card variant="bordered" color="teal" title="Feature B">Description</Card>
  <Card variant="bordered" color="blue" title="Feature C">Description</Card>
</Grid>

```text
<Grid minWidth="280px" maxColumns={3} space="md">
	{#each items as item}
		<Card variant="bordered" color={item.color} title={item.title}>
			{item.desc}
		</Card>
	{/each}
</Grid>
```

### Action Bar

Use **Cluster** to group action buttons at the bottom of a form or card.

<div style="padding: 1.5rem; border: 1px solid var(--color-grey); border-radius: 0.375rem;">
  <Stack gap="md">
    <p>Are you sure you want to proceed?</p>
    <Cluster justify="end">
      <Button color="grey" href="#">Cancel</Button>
      <Button color="pink" href="#">Confirm</Button>
    </Cluster>
  </Stack>
</div>

```text
<Stack gap="md">
	<p>Content...</p>
	<Cluster justify="end">
		<Button color="grey" href="...">Cancel</Button>
		<Button color="pink" href="...">Confirm</Button>
	</Cluster>
</Stack>
```
