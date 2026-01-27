---
title: Colors
description: Guidelines for using colors in Vizchitra designs, including primary, secondary, and accent colors.
width: wide
---

<script>
import { ColorSwatch, Stack, Cluster, Text, Header } from '$lib/components';

const colors = ['yellow', 'teal', 'blue', 'orange', 'pink', 'grey'];
const levels = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const variants = ['subtle', 'muted', 'base', 'strong', 'contrast'];
</script>

<Header title="Color Guidelines" />

## Brand Colors

Full 9-tone scales from 100 (lightest) to 900 (darkest)

<Stack>
  {#each colors as color}
    <Text type="caption">{color}</Text>
    <Cluster space="xs">
      {#each levels as level}
        <ColorSwatch token="{color}-{level}" width="4rem" />
      {/each}
    </Cluster>
  {/each}
</Stack>

## Named Variants

<Stack>
  {#each colors as color}
    <Text type="caption">{color}</Text>
    <Cluster>
      {#each variants as variant}
        <ColorSwatch token="{color}-{variant}" width="6rem" />
      {/each}
    </Cluster>
  {/each}
</Stack>
