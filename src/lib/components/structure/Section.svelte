<script lang="ts">
  import type { Snippet } from "svelte";

  type Space = "0" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  interface Props {
    paddingY?: Space;
    /** Whether the content should be restricted to the site's max-width */
    contained?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    paddingY = "2xl",
    contained = true,
    class: className = "",
    children,
  }: Props = $props();
</script>

<section
  class="section-root {className}"
  style:--section-pad="var(--spacing-{paddingY})"
>
  <div class={contained ? "section-inner-contained" : "section-inner-full"}>
    {@render children?.()}
  </div>
</section>

<style>
  .section-root {
    width: 100%;
    padding-block: var(--section-pad);
  }

  /* The "Contained" logic replaces your manual mx-auto */
  .section-inner-contained {
    max-width: var(--max-width-4xl);
    margin-inline: auto;
    padding-inline: var(--spacing-md);
  }

  .section-inner-full {
    width: 100%;
  }
</style>
