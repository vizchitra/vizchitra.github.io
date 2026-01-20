<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: "display" | "lg" | "md" | "sm" | "xs";
    align?: "left" | "center" | "right";
    color?:
      | "black"
      | "white"
      | "blue"
      | "pink"
      | "orange"
      | "teal"
      | "yellow"
      | "grey";
    children?: Snippet;
    class?: string;
  }

  let {
    tag = "h2",
    size = "lg",
    align = "center",
    color = "black",
    children,
    class: className = "",
  }: Props = $props();

  const sizeClasses: Record<string, string> = {
    display: `
        text-[length:var(--heading-display-size)]
        font-[var(--heading-display-weight)]
      `,
    lg: `
        text-[length:var(--heading-lg-size)]
        font-[var(--heading-lg-weight)]
      `,
    md: `
        text-[length:var(--heading-md-size)]
        font-[var(--heading-md-weight)]
      `,
    sm: `
        text-[length:var(--heading-sm-size)]
        font-[var(--heading-sm-weight)]
      `,
    xs: `
        text-[length:var(--heading-xs-size)]
        font-[var(--heading-xs-weight)]
   `,
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const colorClasses = {
    black: "text-black",
    white: "text-white",
    blue: "text-blue",
    pink: "text-pink",
    orange: "text-orange",
    teal: "text-teal",
    yellow: "text-yellow",
    grey: "text-grey",
  };
</script>

<svelte:element
  this={tag}
  class="{alignClasses[align]} {sizeClasses[size]} {colorClasses[
    color
  ]} {className}"
>
  {@render children?.()}
</svelte:element>
