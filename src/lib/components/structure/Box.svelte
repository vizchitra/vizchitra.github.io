<script lang="ts">
  import type { Snippet } from "svelte";

  // Use the tokens defined in your tokens.css and layers.css
  type Space = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  type Color =
    | "white"
    | "black"
    | "grey"
    | "yellow"
    | "blue"
    | "teal"
    | "pink"
    | "orange";
  type Radius = "none" | "sm" | "md" | "lg";
  type Shadow = "none" | "sm" | "md" | "lg";

  interface Props {
    padding?: Space;
    bg?: Color;
    border?: boolean;
    borderColor?: string;
    radius?: Radius;
    shadow?: Shadow;
    class?: string;
    children?: Snippet;
    tag?: string;
  }

  let {
    padding = "md",
    bg = "white",
    border = false,
    borderColor = "var(--color-border)",
    radius = "md",
    shadow = "none",
    class: className = "",
    tag = "div",
    children,
  }: Props = $props();
</script>

<svelte:element
  this={tag}
  class="box {className}"
  style:padding="var(--spacing-{padding})"
  style:background-color="var(--color-{bg})"
  style:border={border ? `1px solid ${borderColor}` : "none"}
  style:border-radius="var(--radius-{radius})"
  style:box-shadow="var(--shadow-{shadow})"
>
  {@render children?.()}
</svelte:element>

<style>
  .box {
    display: block;
    /* Transition for hover effects if passed via className */
    transition:
      box-shadow 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }
</style>
