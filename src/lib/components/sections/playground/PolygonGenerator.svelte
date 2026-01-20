<script>
  import { formatSlantedText } from "$lib/utils/slanted";
  import { InlineSvg } from "$lib/components";
  import VizChitraLogoSVG from "$lib/assets/logos/vizchitra-logo-type.svg?raw";

  /**
   * @typedef Props
   * @property {any} [formData]
   */

  /** @type {Props} */
  let { formData = {} } = $props();

  let cardWidth = $state(0);
  let clipPath = $state("");
  let points = $state([
    { x: 50, y: 0 },
    { x: 100, y: 38 },
    { x: 82, y: 100 },
    { x: 18, y: 100 },
    { x: 0, y: 38 },
  ]);

  let imageConfig = $state({
    scale: 0.95,
    xOffset: 0,
    yOffset: 0,
  });

  $effect(() => {
    if (formData) {
      points = computePoints(points);
    }
  });

  function computePoints(points) {
    const MIN_VALUE = 40;

    let adjustedPoints = points.slice();

    let data = [
      formData["analysis"],
      formData["coding"],
      formData["collection"],
      formData["narrating"],
      formData["designing"],
    ];

    for (let i = 0; i < 5; i++) {
      let angle = (2 * Math.PI) / 5;
      let x1 =
        50 +
        ((Math.cos(-i * angle - Math.PI / 2) *
          (MIN_VALUE + ((100 - MIN_VALUE - 5) * data[i]) / 5)) /
          100) *
          50;
      let y1 =
        50 +
        ((Math.sin(-i * angle - Math.PI / 2) *
          (MIN_VALUE + ((100 - MIN_VALUE - 5) * data[i]) / 5)) /
          100) *
          50;
      adjustedPoints[i].x = x1;
      adjustedPoints[i].y = y1;
    }

    clipPath = adjustedPoints
      .map((point) => `${point.x}% ${point.y}%`)
      .join(", ");
    return adjustedPoints;
  }

  function computeTransform() {
    let xOffset = imageConfig["xOffset"] || 0;
    let yOffset = imageConfig["yOffset"] || 0;
    let scale = imageConfig["scale"] || 1;
    return `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
  }

  const COLOR_MAPPING = {
    "Collecting data": "var(--color-viz-yellow)",
    "Analyzing data": "var(--color-viz-teal)",
    "Coding visualizations": "var(--color-viz-blue)",
    "Narrating insights": "var(--color-viz-orange)",
    "Designing visualizations": "var(--color-viz-pink)",
    none: "#ddd",
  };
</script>

<div
  id="custom-card"
  class="card-container sticky flex h-full w-full flex-col items-center justify-start rounded p-lg"
  style="--max-card-height: {cardWidth}px"
  bind:clientWidth={cardWidth}
>
  <div class="pentagon-container relative">
    <div class="logo-type absolute z-20">
      {@html VizChitraLogoSVG}
    </div>
    <svg
      class="absolute z-10"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      {#each points as point, i}
        <line
          stroke={COLOR_MAPPING[formData.strength]}
          x1="{point.x}%"
          y1="{point.y}%"
          x2="{i === points.length - 1 ? points[0].x : points[i + 1].x}%"
          y2="{i === points.length - 1 ? points[0].y : points[i + 1].y}%"
          stroke-width="7"
        />
      {/each}

      {#each points as point, i}
        <circle cx="{point.x}%" cy="{point.y}%" r="9" fill="white" />
        <circle cx="{point.x}%" cy="{point.y}%" r="5" fill="#4c4c4c" />
      {/each}
    </svg>

    {#if formData.image}
      <div
        class="image-container"
        style="clip-path: polygon({clipPath}); --strength-color: {COLOR_MAPPING[
          formData.strength
        ]}"
      >
        <img
          src={formData.image}
          alt={formData?.name}
          style="transform: {computeTransform()} "
        />
      </div>
    {/if}
  </div>

  <div class="member-details text-center">
    {#if formData.name}
      <h2 class="member-name font-display align-bottom font-bold">
        {formData.name}
      </h2>
    {/if}

    {#if formData.desc}
      <p class="member-desc">{formData.desc}</p>
    {/if}
  </div>
</div>

<style>
  .card-container {
    top: 80px;
    max-width: 550px;
    max-height: var(--max-card-height);
    border: 1px solid #ddd;
    box-shadow:
      rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }

  .pentagon-container {
    height: 250px;
    width: 250px;
  }

  @media (min-width: 768px) {
    .pentagon-container {
      height: 350px;
      width: 350px;
    }
  }

  .logo-type {
    top: 45%;
    right: 5px;
    width: 120px;
  }

  @media (min-width: 768px) {
    .logo-type {
      width: 180px;
    }
  }

  .member-details {
    width: 250px;
    max-width: 350px;
  }

  @media (min-width: 768px) {
    .member-details {
      width: 350px;
    }
  }

  .member-name {
    font-size: 18px;
    line-height: 1;
  }

  @media (min-width: 768px) {
    .member-name {
      font-size: 22px;
    }
  }

  .member-desc {
    font-size: 14px;
    line-height: 1.3;
  }

  @media (min-width: 768px) {
    .member-desc {
      font-size: 18px;
    }
  }

  .image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      filter: grayscale(100%);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--strength-color);
      opacity: 0.4;
      mix-blend-mode: hard-light;
    }
  }

  @media (max-width: 450px) {
    .card-container {
      max-height: fit-content;
    }
  }
</style>
