<script lang="ts">
  import type { Snippet } from "svelte";

  type Space = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  type Align = "start" | "end" | "center" | "baseline" | "stretch";
  type Justify = "start" | "end" | "center" | "between" | "around" | "evenly";

  interface Props {
    space?: Space;
    align?: Align;
    justify?: Justify;
    class?: string;
    children?: Snippet;
  }

  let {
    space = "md",
    align = "center",
    justify = "center",
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

  // Map justify/align keywords to flexbox values
  const JustifyMap: Record<string, string> = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };

  const alignValue = $derived(AlignMap[align] ?? align);
  const justifyValue = $derived(JustifyMap[justify] ?? justify);
</script>

<div
  class="cluster {className}"
  style:--cluster-gap="var(--spacing-{space})"
  style:--cluster-align={alignValue}
  style:--cluster-justify={justifyValue}
>
  {@render children?.()}
</div>

<style>
  /* The CSS in layers.css handles the overall logic,
     but we provide the specific variable overrides here.
  */
  .cluster {
    gap: var(--cluster-gap);
    align-items: var(--cluster-align);
    justify-content: var(--cluster-justify);
  }
</style>
