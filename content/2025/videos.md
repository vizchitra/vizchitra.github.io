---
title: Session Videos 2025
description: Sessions at the VizChitra 2025 Event
year: 2025
---

<script lang="ts">
  import videosData from "$lib/data/videos2025.json" with { type: "json" };
  const cardDecor = "/images/patterns/card-decor.webp";
</script>

<Header title="Session Videos 2025" banner="polygon" />

<FullBleed>
<FilterableGrid
  items={videosData}
  filterKey="type"
  filterLabel="All"
  gridCols={{ sm: 1, md: 2, lg: 3 }}
  space="md"
>
  {#snippet renderCard(video)}
    <VideoCard
      id={video.id}
      title={video.title}
      subtitle={video.subtitle}
      thumbnail={video.thumbnail}
      speaker={video.speaker}
      hook={video.hook}
      decoration={cardDecor}
    />
  {/snippet}
</FilterableGrid>
</FullBleed>
