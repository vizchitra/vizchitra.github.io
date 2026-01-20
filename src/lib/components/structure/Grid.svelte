<script lang="ts">
  import type { Snippet } from "svelte";

  type Space = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  type Align = "start" | "end" | "center" | "stretch" | "baseline";
  type Justify = "start" | "end" | "center" | "stretch";

  interface Props {
    cols?: number | "auto";
    maxCols?: number;
    minWidth?: string;
    space?: Space;
    align?: Align; // Vertical alignment of items in cells
    justify?: Justify; // Horizontal alignment of items in cells
    class?: string;
    children?: Snippet;
  }

  let {
    cols = "auto",
    maxCols,
    minWidth = "280px",
    space = "md",
    align = "stretch",
    justify = "stretch",
    class: className = "",
    children,
  }: Props = $props();

  // Purely handles the grid template
  const gridTemplate = $derived(
    cols === "auto"
      ? `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`
      : `repeat(${cols}, 1fr)`,
  );

  // Simplified max-cols logic using CSS variables for cleaner markup
  const maxWidth = $derived(
    maxCols
      ? `calc(${maxCols} * ${minWidth} + (${maxCols} - 1) * var(--spacing-${space}))`
      : "none",
  );

  // Map user props to CSS Grid values
  const alignMap = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
    baseline: "baseline",
  };
  const justifyMap = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
  };
</script>

<div
  class="grid-system {className}"
  style:grid-template-columns={gridTemplate}
  style:max-width={maxWidth}
  style:--grid-gap="var(--spacing-{space})"
  style:--grid-align={alignMap[align]}
  style:--grid-justify={justifyMap[justify]}
>
  {@render children?.()}
</div>

<style>
  /* The CSS in layers.css handles the overall logic,
     but we provide the specific variable overrides here.
  */
  .grid-system {
    gap: var(--grid-gap);
    align-items: var(--grid-align);
    justify-items: var(--grid-justify);
  }
</style>
