<script lang="ts">
  import type { Snippet } from "svelte";

  type Tag = "h1" | "h2" | "h3" | "h4";
  type Type = "display" | "title" | "subtitle";
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
    children?: Snippet;
    class?: string;
  }

  let {
    type = "title",
    align = "left",
    color = "black",
    tag,
    children,
    class: className = "",
  }: Props = $props();

  // Define the Hierarchy "Bundles"
  const typeClasses: Record<string, string> = {
    display: "text-ui-display font-bold leading-tight tracking-tight",
    title: "text-ui-lg font-semibold leading-tight",
    subtitle: "text-ui-md font-normal leading-relaxed text-opacity-80",
  };

  const finalTag = $derived(
    tag ?? (type === "display" ? "h1" : type === "title" ? "h2" : "h3"),
  );
</script>

<svelte:element
  this={finalTag}
  class="{typeClasses[type]} text-{align} text-{color} {className}"
>
  {@render children?.()}
</svelte:element>
