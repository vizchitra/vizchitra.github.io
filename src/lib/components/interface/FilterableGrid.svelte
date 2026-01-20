<script lang="ts" generics="T extends Record<string, any>">
  import { ButtonBar, Cluster, Dropdown, Grid, Stack } from "$lib/components";
  import { onMount } from "svelte";

  interface Props<T> {
    items: T[];
    filterKey: keyof T;
    filterLabel?: string;
    gridCols?: {
      sm?: number;
      md?: number;
      lg?: number;
    };
    space?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    renderCard: import("svelte").Snippet<[T]>;
  }

  let {
    items,
    filterKey,
    filterLabel = "All",
    gridCols = { sm: 1, md: 2, lg: 3 },
    space = "md",
    renderCard,
  }: Props<T> = $props();

  let isMobile = $state(false);
  let selectedFilter = $state("All");

  const filterOptions = $derived([
    filterLabel,
    ...Array.from(new Set(items.map((item) => String(item[filterKey])))),
  ]);

  const filteredItems = $derived(
    selectedFilter === filterLabel
      ? items
      : items.filter((item) => String(item[filterKey]) === selectedFilter),
  );

  const buttonBarData = $derived(
    filterOptions.map((option, index) => ({
      label: option,
      code: option,
      id: option + index,
    })),
  );

  function handleButtonBarChange(e: any) {
    selectedFilter = e.code;
  }

  function handleDropdownChange(e: any) {
    selectedFilter = e.value;
  }

  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const lgCols = $derived(gridCols.lg ?? 3);
  const mdCols = $derived(gridCols.md ?? 2);
  const smCols = $derived(gridCols.sm ?? 1);
</script>

<Stack space="lg" class="mx-auto max-w-7xl px-sm py-lg">
  <Cluster justify="center" class="mx-auto mb-md">
    {#if !isMobile}
      <ButtonBar
        data={buttonBarData}
        activeValue={selectedFilter}
        keyField="code"
        labelField="label"
        onSelect={handleButtonBarChange}
      />
    {/if}
    {#if isMobile}
      <Dropdown
        data={buttonBarData}
        activeValue={selectedFilter}
        keyField="code"
        labelField="label"
        onSelect={handleDropdownChange}
      />
    {/if}
  </Cluster>

  <div class="mx-auto w-full" style="max-width: 90dvw;">
    <Grid cols={lgCols} {space}>
      {#each filteredItems as item (item.id)}
        {@render renderCard(item)}
      {/each}
    </Grid>
  </div>
</Stack>
