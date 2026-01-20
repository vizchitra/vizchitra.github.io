<script lang="ts">
  import type { Snippet } from "svelte";

  type Tag = "p" | "small";
  type Type = "lead" | "body" | "caption" | "small";
  type Color =
    | "white"
    | "black"
    | "grey"
    | "yellow"
    | "blue"
    | "teal"
    | "pink"
    | "orange";
  type Align = "left" | "center" | "right";

  interface Props {
    // Narrow the options to only what is allowed in your design system
    type?: Type;
    align?: Align;
    color?: Color;
    tag?: Tag;
    balanced?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    type = "body",
    align = "left",
    color = "black",
    balanced = false,
    tag,
    class: className = "",
    children,
  }: Props = $props();

  // Define the Hierarchy "Bundles"
  const typeClasses: Record<string, string> = {
    lead: "text-ui-md font-normal leading-relaxed text-opacity-80",
    body: "text-ui-sm font-normal leading-normal",
    caption:
      "text-ui-xs font-medium leading-none uppercase tracking-wide opacity-60",
    small: "text-ui-xs font-normal leading-tight opacity-60",
  };

  const finalTag = $derived(tag ?? (type === "small" ? "small" : "p"));
</script>

<svelte:element
  this={finalTag}
  class="{typeClasses[type]} text-{align} text-{color} {className}"
  class:text-balance={balanced}
>
  {@render children?.()}
</svelte:element>

<style>
  .text {
    /* Optimization: prevent body text from becoming too wide to read */
    max-width: 65ch;
  }
  .text-balance {
    text-wrap: balance;
  }
</style>
