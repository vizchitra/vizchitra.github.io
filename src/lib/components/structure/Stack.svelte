<script lang="ts">
  import type { Snippet } from "svelte";

  type Space = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  type Align = "start" | "end" | "center" | "baseline" | "stretch";

  interface Props {
    space?: Space;
    align?: Align;
    class?: string;
    children?: Snippet;
  }

  let {
    space = "md",
    align = "stretch",
    class: className = "",
    children,
  }: Props = $props();

  // Map Align keywords to flexbox values
  const AlignMap: Record<string, string> = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch",
  };

  const alignValue = $derived(AlignMap[align] ?? align);
</script>

<div
  class="stack {className}"
  style:--stack-gap="var(--spacing-{space})"
  style:--stack-align={alignValue}
>
  {@render children?.()}
</div>

<style>
  /* The CSS in layers.css handles the overall logic,
     but we provide the specific variable overrides here.
  */
  .stack {
    align-items: var(--stack-align);
  }
</style>
