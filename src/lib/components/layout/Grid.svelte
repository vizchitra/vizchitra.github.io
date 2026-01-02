<!--
  Grid.svelte

  Simple, reusable grid wrapper component.

  Props:
  - `cols` (number)      : base column count (default 1)
  - `colsSm` (number)    : `sm:` breakpoint columns
  - `colsMd` (number)    : `md:` breakpoint columns
  - `colsLg` (number)    : `lg:` breakpoint columns
  - `gap` (string)       : Tailwind gap class (default `gap-4`)
  - `className` (string) : extra classes to append

  Example:
  <Grid cols={1} colsMd={2} colsLg={3} gap="gap-6" className="items-start">
    {#each items as item}
      <Card {item} />
    {/each}
  </Grid>

  NOTE: Tailwind's JIT/purge scans need to see the column classes. The comment below lists
  the supported classes so they are included in the build output.

  safelist: grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6
  safelist: sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6
  safelist: md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6
  safelist: lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6
-->

<script lang="ts">
  export let cols: number = 1;
  export let colsSm: number | undefined;
  export let colsMd: number | undefined;
  export let colsLg: number | undefined;
  export let gap: string = 'gap-4';
  export let className: string = '';

  const mapCols = (n: number | undefined) => {
    if (!n) return '';
    switch (n) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      case 5:
        return 'grid-cols-5';
      case 6:
        return 'grid-cols-6';
      default:
        return 'grid-cols-1';
    }
  };

  $: classes = [
    'grid',
    mapCols(cols),
    colsSm ? `sm:${mapCols(colsSm)}` : '',
    colsMd ? `md:${mapCols(colsMd)}` : '',
    colsLg ? `lg:${mapCols(colsLg)}` : '',
    gap,
    className
  ]
    .filter(Boolean)
    .join(' ');
</script>

<div class={classes}>
  <slot />
</div>
