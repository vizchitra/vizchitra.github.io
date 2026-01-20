<script>
  import { browser } from "$app/environment";
  import { InlineSvg } from "$lib/components";

  import CalendarIcon from "$lib/assets/icons/calendar.svg?raw";
  import LocationIcon from "$lib/assets/icons/location.svg?raw";
  import SpeakerCardPattern1 from "$lib/assets/patterns/speaker-card-pattern-1.svg?raw";
  import SpeakerCardPattern2 from "$lib/assets/patterns/speaker-card-pattern-2.svg?raw";
  import CloseIcon from "$lib/assets/icons/x.svg?raw";

  /**
   * @typedef Props
   * @property {boolean} [modalOpen]
   * @property {any} [data]
   * @property {any} [colorMapping]
   */

  /** @type {Props} */
  let { modalOpen = false, data = {}, colorMapping = {} } = $props();

  $effect(() => {
    if (modalOpen && browser && data?.talkInfo) {
      document.body.style.overflow = "hidden";
    } else if (browser) {
      document.body.style.overflow = "";
    }
  });

  let screenWidth = $state(0);
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if modalOpen === true && data?.talkInfo}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="details-modal fixed top-0 left-0 z-50 flex h-screen w-screen cursor-default items-center justify-center"
    onclick={(e) => {
      e.stopPropagation();
      modalOpen = false;
    }}
    onmousedown={(e) => {
      e.stopPropagation();
      handleMouseDown(e);
    }}
  >
    <div
      class="modal-overlay pointer-events-auto fixed top-0 left-0 z-10 h-full w-full opacity-100"
    ></div>
    <div
      class="modal border-grey-light relative z-20 overflow-auto rounded-md border bg-white shadow-2xl"
      onmousedown={(e) => {
        e.stopPropagation();
        handleMouseDown(e);
      }}
      onclick={(e) => {
        e.stopPropagation();
        handleClick(e);
      }}
    >
      <div class="button-wrapper sticky top-0 z-50">
        <button
          class="close-btn absolute top-4 right-4 z-50 cursor-pointer"
          aria-label="close modal"
          onclick={() => (modalOpen = false)}
        >
          {@html CloseIcon}
        </button>
      </div>
      <div
        class="modal-header p-lg pt-sm"
        style:background-color={colorMapping[data.talkType]?.primary}
      >
        <div class="title text-white">
          {#if data.talkType}
            <p class="kicker-text mb-xs !font-medium uppercase">
              {data.talkType}
            </p>
          {/if}

          <h3 class="modal-talk-title text-shadow mb-xs font-bold">
            {data.title}
          </h3>

          {#if data.subtitle}
            <p class="modal-talk-subtitle text-shadow">
              {data.subtitle}
            </p>
          {/if}
        </div>
      </div>
      <div class="details-section relative h-full">
        <div
          class="details-content relative p-lg px-md pb-2xl md:px-lg xl:px-12"
        >
          <div class="modal-title-text mb-md">
            <h3
              class="modal-speaker-name text-shadow font-display mb-xs text-left align-bottom font-bold uppercase"
            >
              {data.name}
            </h3>
            <p class="modal-speaker-role text-shadow text-left">
              {data.role}
            </p>
          </div>

          <div class="details mb-lg flex flex-col gap-xs">
            {#if data.talkInfo}
              <p class="modal-talk-info text-shadow mb-md">
                {@html data.talkInfo}
              </p>
            {/if}

            {#if data.time}
              <div class="detail flex items-center gap-sm">
                <div class="icon-container w-4 md:w-5">
                  {@html CalendarIcon.replaceAll(
                    "#68B9B2",
                    colorMapping[data.talkType]?.primary,
                  )}
                </div>
                <p class="modal-detail-text leading-none">{data.time}</p>
              </div>
            {/if}

            {#if data.location}
              <div class="detail flex items-center gap-sm">
                <div class="icon-container w-4 md:w-5">
                  {@html LocationIcon.replaceAll(
                    "#68B9B2",
                    colorMapping[data.talkType]?.primary,
                  )}
                </div>
                <p class="modal-detail-text leading-none">{data.location}</p>
              </div>
            {/if}
          </div>

          {#if data.link && data.link !== ""}
            <a
              class="modal-link block w-fit rounded-sm px-sm py-sm leading-none text-white hover:opacity-90"
              target="_blank"
              href="{data.link}/#tickets"
              >{data.talkType === "workshop" ? "Buy tickets" : "Learn more"}</a
            >
          {/if}

          <div
            class="pattern-container absolute right-0 bottom-0 -z-1 opacity-70"
            style="transform: translate({0}px, {20}px); "
          >
            {@html SpeakerCardPattern2.replaceAll(
              "#FFD485",
              colorMapping[data.talkType]?.patternGradient[0],
            ).replaceAll(
              "#F89F72",
              colorMapping[data.talkType]?.patternGradient[1],
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    background-color: rgba(255, 255, 255, 0.67);
    backdrop-filter: blur(2px);
  }

  .details-modal .modal {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 100%;
    height: fit-content;
    max-width: min(800px, calc(100% - 1rem));
    max-height: 95vh;
    max-height: 95dvh;
    transform: translate(-50%, -50%);

    transition: 0.2s all ease;
  }

  @media (max-width: 420px) {
    .details-modal .modal {
      height: 100%;
    }
  }

  .text-shadow {
    text-shadow:
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white,
      1px 1px 0 white;
  }

  /* Modal title text */
  .modal-title-text {
    min-width: 240px;
  }

  /* Modal talk title */
  .modal-talk-title {
    font-size: 1.75rem;
    line-height: 1.1;
  }

  @media (min-width: 640px) {
    .modal-talk-title {
      font-size: 2rem;
    }
  }

  @media (min-width: 1280px) {
    .modal-talk-title {
      font-size: 2.5rem;
    }
  }

  /* Modal talk subtitle */
  .modal-talk-subtitle {
    font-size: 1.5rem;
    line-height: 1.1;
  }

  @media (min-width: 640px) {
    .modal-talk-subtitle {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 1280px) {
    .modal-talk-subtitle {
      font-size: 2rem;
    }
  }

  /* Modal speaker name */
  .modal-speaker-name {
    font-size: 2rem;
    line-height: 1;
  }

  @media (min-width: 1280px) {
    .modal-speaker-name {
      font-size: 2.25rem;
    }
  }

  /* Modal speaker role */
  .modal-speaker-role {
    font-size: 1rem;
    line-height: 1.2;
  }

  @media (min-width: 640px) {
    .modal-speaker-role {
      font-size: 1.25rem;
    }
  }

  /* Modal talk info */
  .modal-talk-info {
    font-size: 1.125rem;
    line-height: 1.4;
  }

  @media (min-width: 768px) {
    .modal-talk-info {
      font-size: 1.4rem;
      line-height: 1.5;
    }
  }

  /* Modal detail text */
  .modal-detail-text {
    font-size: 1rem;
  }

  @media (min-width: 640px) {
    .modal-detail-text {
      font-size: 1.25rem;
    }
  }

  /* Modal link */
  .modal-link {
    background-color: #444;
    font-size: 1rem;
  }

  @media (min-width: 640px) {
    .modal-link {
      font-size: 1.25rem;
    }
  }
</style>
