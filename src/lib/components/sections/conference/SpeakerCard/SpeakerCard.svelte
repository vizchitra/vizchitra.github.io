<script>
  import SpeakerPentagon from "./SpeakerPentagon.svelte";
  import SpeakerDetailsModal from "./SpeakerDetailsModal.svelte";

  import CalendarIcon from "$lib/assets/icons/calendar.svg?raw";
  import LocationIcon from "$lib/assets/icons/location.svg?raw";

  /**
   * @typedef Props
   * @property {any} [data]
   * @property {any} [dragParams]
   */

  /** @type {Props} */
  let { data = {}, dragParams = {} } = $props();

  const colorMapping = {
    keynote: {
      primary: "var(--color-viz-pink)",
      patternGradient: ["#F68669B3", "#E6327EB3"],
      bannerColor: "#F3ACCA",
    },
    "standard talk": {
      primary: "var(--color-viz-orange)",
      // patternGradient: ['#F68669B3', '#E6327EB3'],
      patternGradient: ["#FFD485", "#F3844C"],
      bannerColor: "#FBBC9D",
    },
    "sponsored talk": {
      primary: "var(--color-viz-orange)",
      // patternGradient: ['#F68669B3', '#E6327EB3'],
      patternGradient: ["#FFD485", "#F3844C"],
      bannerColor: "#FBBC9D",
    },
    "lightning talk": {
      primary: "var(--color-viz-orange)",
      // patternGradient: ['#F68669B3', '#E6327EB3'],
      patternGradient: ["#FFD485", "#F3844C"],
      bannerColor: "#FBBC9D",
    },
    alternate: {
      primary: "var(--color-viz-orange)",
      patternGradient: ["#F68669B3", "#E6327EB3"],
      bannerColor: "#FBBC9D",
    },
    bof: {
      primary: "var(--color-viz-orange)",
      patternGradient: ["#F68669B3", "#E6327EB3"],
      bannerColor: "#FBBC9D",
    },
    workshop: {
      primary: "var(--color-viz-blue-dark)",
      patternGradient: ["#FACCE5", "#659ABC"],
      bannerColor: "#9CAEDF",
    },
  };

  let isKeynote = $derived(data.talkType === "keynote");
  let modalOpen = $state(false);
  let cardElement;

  function handleCardClick(event) {
    const dragThreshold = 15;
    const x = event.pageX - dragParams?.offsetLeft;

    if (Math.abs(x - dragParams.startX) > dragThreshold) return;

    if (data.talkInfo) {
      modalOpen = true;
    } else {
      console.warn("No talk info available for this speaker.");
    }
  }
</script>

{#if data}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={cardElement}
    on:click={handleCardClick}
    on:touchStart={handleCardClick}
    class="speaker-card border-grey-light relative w-full overflow-hidden rounded-lg border p-sm shadow-md sm:p-lg sm:pt-8 {isKeynote
      ? 'speaker-card--keynote pb-xl sm:pb-24'
      : 'speaker-card--standard pb-md'}"
  >
    <div
      class="title-section flex flex-row items-start {isKeynote
        ? 'title-section--keynote'
        : 'title-section--standard'}"
    >
      {#if isKeynote}
        <div class="title-text title-text--keynote">
          <h3
            class="speaker-name speaker-name--keynote font-display mb-xs text-left align-bottom leading-none font-bold uppercase"
          >
            {data.name}
          </h3>
          <p class="speaker-role text-left">
            {data.role}
          </p>
        </div>
      {/if}
    </div>

    <div class="details-section">
      {#if isKeynote === false}
        <div class="title-text title-text--standard mb-md">
          <h3
            class="speaker-name speaker-name--standard text-shadow font-display mb-xs text-left align-bottom leading-none font-bold uppercase"
          >
            {data.name}
          </h3>
          <p class="speaker-role text-shadow text-left">
            {data.role}
          </p>
        </div>
      {/if}
      <div class="title mb-lg">
        {#if data.kickerText}
          <p class="kicker-text mb-xs !font-medium uppercase">
            {data.kickerText}
          </p>
        {/if}

        <h3
          style="color: {colorMapping[data.talkType]?.primary}"
          class="talk-title text-shadow mb-xs font-bold {isKeynote
            ? 'talk-title--keynote'
            : 'talk-title--standard'}"
        >
          {data.title}
        </h3>

        {#if data.subtitle}
          <p
            style="color: {colorMapping[data.talkType]?.primary}"
            class="talk-subtitle text-shadow {isKeynote
              ? 'talk-subtitle--keynote'
              : 'talk-subtitle--standard'}"
          >
            {data.subtitle}
          </p>
        {/if}
      </div>

      <div class="details flex flex-col gap-xs">
        {#if data.time && CalendarIcon && typeof CalendarIcon === "string"}
          <div class="detail flex items-center gap-sm">
            <div class="icon-container w-5">
              {@html CalendarIcon.replaceAll(
                "#68B9B2",
                colorMapping[data.talkType]?.primary,
              )}
            </div>
            <p class="detail-text leading-none">{data.time}</p>
          </div>
        {/if}

        {#if data.location && LocationIcon && typeof LocationIcon === "string"}
          <div class="detail flex items-center gap-sm">
            <div class="icon-container w-5">
              {@html LocationIcon.replaceAll(
                "#68B9B2",
                colorMapping[data.talkType]?.primary,
              )}
            </div>
            <p class="detail-text leading-none">{data.location}</p>
          </div>
        {/if}
      </div>
    </div>

    <div class="background-container absolute inset-0 -z-1">
      <SpeakerPentagon {colorMapping} memberData={data}></SpeakerPentagon>
    </div>
  </div>

  <SpeakerDetailsModal {data} {colorMapping} {cardElement} bind:modalOpen
  ></SpeakerDetailsModal>
{/if}

<style>
  .text-shadow {
    text-shadow:
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white,
      1px 1px 0 white;
  }

  /* Speaker card sizes */
  .speaker-card--keynote {
    max-width: 550px;
  }

  .speaker-card--standard {
    min-width: 350px;
    max-width: 350px;
  }

  @media (min-width: 768px) {
    .speaker-card {
      min-width: 400px;
    }
  }

  @media (min-width: 1024px) {
    .speaker-card--keynote {
      max-width: 550px;
    }
  }

  /* Title section heights */
  .title-section--keynote {
    height: 325px;
  }

  .title-section--standard {
    height: 265px;
  }

  /* Title text widths */
  .title-text {
    min-width: 240px;
  }

  .title-text--keynote {
    max-width: 50%;
  }

  /* Speaker name typography */
  .speaker-name--keynote {
    font-size: 2rem;
  }

  .speaker-name--standard {
    font-size: 1.75rem;
  }

  @media (min-width: 1280px) {
    .speaker-name--keynote {
      font-size: 2.5rem;
    }

    .speaker-name--standard {
      font-size: 2rem;
    }
  }

  /* Speaker role typography */
  .speaker-role {
    font-size: 1rem;
    line-height: 1.2;
  }

  @media (min-width: 640px) {
    .speaker-role {
      font-size: 1.25rem;
    }
  }

  /* Talk title typography */
  .talk-title {
    line-height: 1.1;
  }

  .talk-title--keynote {
    font-size: 1.5rem;
  }

  .talk-title--standard {
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    .talk-title--keynote {
      font-size: 2rem;
    }

    .talk-title--standard {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 1280px) {
    .talk-title--keynote {
      font-size: 2.5rem;
    }

    .talk-title--standard {
      font-size: 1.8rem;
    }
  }

  /* Talk subtitle typography */
  .talk-subtitle {
    line-height: 1.1;
  }

  .talk-subtitle--keynote {
    font-size: 1.25rem;
  }

  .talk-subtitle--standard {
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    .talk-subtitle--keynote {
      font-size: 1.75rem;
    }

    .talk-subtitle--standard {
      font-size: 1.4rem;
    }
  }

  @media (min-width: 1280px) {
    .talk-subtitle--keynote {
      font-size: 2rem;
    }

    .talk-subtitle--standard {
      font-size: 1.4rem;
    }
  }

  /* Detail text typography */
  .detail-text {
    font-size: 1rem;
  }

  @media (min-width: 640px) {
    .detail-text {
      font-size: 1.25rem;
    }
  }
</style>
