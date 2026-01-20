<script lang="ts">
  import type { Snippet } from "svelte";

  type Space = 0 | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  interface Props {
    paddingY?: Space;
    paddingX?: Space;
    class?: string;
    children?: Snippet;
  }

  let {
    paddingY = "xl",
    paddingX = 0,
    class: className = "",
    children,
  }: Props = $props();
</script>

<div
  class="full-bleed {className}"
  style:--full-bleed-padY="var(--spacing-{paddingY})"
  style:--full-bleed-padX="var(--spacing-{paddingX})"
>
  {@render children?.()}
</div>

<style>
  .full-bleed {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    position: relative;
    left: 0;
    right: 0;
    padding-block: var(--full-bleed-paddingY);
    padding-inline: var(--full-bleed-paddingX);
  }
</style>
