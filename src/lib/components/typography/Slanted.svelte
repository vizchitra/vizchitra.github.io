<script lang="ts">
  import { formatSlantedText } from "$lib/utils/slanted";

  interface Props {
    color?: string;
    textContent?: string;
  }

  let { color = "black", textContent = "" }: Props = $props();

  let letters = $derived(textContent ? formatSlantedText(textContent) : []);
</script>

<div class="text-{color}-dark font-normal">
  {#if letters.length}
    {#each letters as l}
      <span class="slanted-text" style="--letter-slant: {l.slant}"
        >{l.letter}</span
      >
    {/each}
  {/if}
</div>

<style>
  .slanted-text {
    font-family: var(--font-display);
    font-variation-settings: "slnt" var(--letter-slant);
  }
</style>
