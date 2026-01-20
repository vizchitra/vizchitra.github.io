<script>
  import SpeakerCard from "../SpeakerCard/SpeakerCard.svelte";
  import { InlineSvg } from "$lib/components";
  import sessionsData from "$lib/data/sessions2025.json" with { type: "json" };
  import { onMount } from "svelte";

  /**
   * @typedef Props
   * @property {string[]} [sessionTypes]
   */

  /** @type {Props} */
  let { sessionTypes = ["workshop"] } = $props();

  const sessionInfo = sessionsData.filter((s) =>
    sessionTypes.includes(s.talkType),
  );

  let trackContainer = $state(undefined);
  let cardTrack = $state(undefined);
  let isDragging = $state(false);
  let startX = $state(0);
  let scrollLeft = $state(0);
  let atStart = $state(true);
  let atEnd = $state(false);

  onMount(() => {
    if (trackContainer) {
      updateScrollPosition();
    }
  });

  function handleMouseDown(event) {
    isDragging = true;
    cardTrack.classList.add("dragging");
    startX = event.pageX - cardTrack.offsetLeft;
    scrollLeft = trackContainer.scrollLeft;
  }

  function handleMouseMove(event) {
    if (!isDragging) return;
    event.preventDefault();
    const dragThreshold = 15;
    const x = event.pageX - cardTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) < dragThreshold) return;
    trackContainer.scrollLeft = scrollLeft - walk;
  }

  function scrollTrack(direction) {
    if (trackContainer) {
      const scrollAmount = 420;
      trackContainer.scrollBy({
        left: (direction === "right" ? 1 : -1) * scrollAmount,
        behavior: "smooth",
      });
    }
  }

  function handleMouseLeave() {
    isDragging = false;
    cardTrack.classList.remove("dragging");
  }

  function handleMouseUp() {
    isDragging = false;
    cardTrack.classList.remove("dragging");
  }

  function updateScrollPosition() {
    if (!trackContainer) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackContainer;

    atStart = scrollLeft < 20;
    atEnd = scrollLeft + clientWidth >= scrollWidth - 20;
  }

  let screenWidth = $state(0);
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="mb-sm flex flex-row items-end gap-xs">
  <span class="hint-text text-grey block pb-px text-lg">
    {screenWidth < 1000 ? "Tap" : "Click"} on the cards to learn more</span
  >
  <svg
    width="23"
    height="21"
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5299 20.6648C15.6209 20.9255 15.906 21.0631 16.1668 20.9721L20.4155 19.4895C20.6762 19.3985 20.8138 19.1134 20.7228 18.8526C20.6319 18.5919 20.3467 18.4543 20.086 18.5453L16.3094 19.8632L14.9914 16.0866C14.9005 15.8258 14.6154 15.6882 14.3546 15.7792C14.0939 15.8702 13.9563 16.1553 14.0473 16.416L15.5299 20.6648ZM3.9998 5.99999L4.22341 6.4472C8.11498 4.5014 12.6393 4.55262 15.3118 6.70208C17.9167 8.79707 19.0096 13.1178 15.5517 20.2827L16.002 20.5L16.4523 20.7174C19.9924 13.3822 19.0843 8.45288 15.9386 5.92284C12.8605 3.44726 7.88477 3.49847 3.77619 5.55278L3.9998 5.99999Z"
      fill="#666666"
    />
  </svg>
</div>
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="relative mb-md max-w-full overflow-auto"
  bind:this={trackContainer}
  on:mousedown={handleMouseDown}
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
  on:mouseup={handleMouseUp}
  on:scroll={updateScrollPosition}
>
  <div
    class="speaker-track flex flex-row flex-nowrap gap-sm hover:cursor-grab"
    bind:this={cardTrack}
  >
    {#each sessionInfo as workshop, index (workshop.name)}
      <SpeakerCard
        data={workshop}
        dragParams={{
          isDragging: isDragging,
          startX: startX,
          offsetLeft: cardTrack?.offsetLeft,
        }}
      ></SpeakerCard>
    {/each}
  </div>
</div>

{#if atStart === false || atEnd === false}
  <div
    class="track-controls flex items-center gap-sm self-start pl-sm sm:gap-sm"
  >
    <button
      on:click={() => scrollTrack("left")}
      disabled={atStart}
      class="track-btn border-grey flex cursor-pointer items-center justify-center rounded-full border p-sm hover:opacity-70 disabled:bg-white disabled:opacity-60"
      aria-label="scroll left"><InlineSvg name="arrow-left.svg" /></button
    >
    <button
      on:click={() => scrollTrack("right")}
      disabled={atEnd}
      class="track-btn border-grey flex cursor-pointer items-center justify-center rounded-full border p-sm hover:opacity-70 disabled:bg-white disabled:opacity-60"
      aria-label="scroll right"><InlineSvg name="arrow-right.svg" /></button
    >
  </div>
{/if}

<style>
  :global(.speaker-track.dragging) {
    user-select: none;
    cursor: grabbing;
    scroll-behavior: smooth;
  }

  .track-btn {
    height: 60px;
    width: 60px;
    background-color: #f5c7c7;
  }

  @media (min-width: 640px) {
    .track-btn {
      height: 75px;
      width: 75px;
    }
  }
</style>
