<script lang="ts">
  import {
    BannerCurve,
    BannerPolygon,
    Heading,
    Title,
    Cluster,
    Stack,
    Text,
    FullBleed,
    Slanted,
    LogoTagline,
  } from "$lib/components";

  interface Props {
    title: string;
    banner?: "polygon" | "curve";
    interactive?: boolean;
    size?: "default" | "large";
    showLogo?: boolean;
    tagline?: string;
  }

  let {
    title,
    banner = "polygon",
    interactive = false,
    size = "default",
    showLogo = false,
    tagline = "A SPACE TO CONNECT AND CREATE WITH DATA",
  }: Props = $props();

  const heightClass = $derived(
    size === "large" ? "h-[60svh] md:h-[80svh]" : "h-[40svh]",
  );
</script>

<FullBleed class="pb-lg">
  <div
    class="relative {heightClass} bg-gradient-to-b from-transparent to-white"
  >
    <div class="absolute inset-0 {banner === 'curve' ? '' : 'overflow-hidden'}">
      {#if banner === "curve"}
        <BannerCurve staticBanner={!interactive} direction="header" />
      {:else}
        <BannerPolygon staticBanner={!interactive} fadeDirection="bottom" />
      {/if}
    </div>

    {#if !interactive}
      <!-- Static header: centered title -->
      <div class="absolute inset-0 flex items-center justify-center">
        <Title type="display" align="center">
          {title}
        </Title>
      </div>
    {:else if banner === "polygon"}
      <!-- Interactive polygon: centered logo with tagline -->
      <div
        class="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Cluster></Cluster>
        <LogoTagline tag="h3" textContent={tagline} />
      </div>
    {:else}
      <!-- Interactive curve: logo bottom left, tagline top right -->
      <div class="left-sm md:left-lg pointer-events-none absolute bottom-0">
        <LogoTagline />
      </div>
      <div class="right-xl pointer-events-none absolute top-lg">
        <Title type="subtitle" align="right" color="grey" class="max-w-xs">
          <Slanted color="black" textContent="A SPACE TO CONNECT" />
          <Slanted color="black" textContent="AND CREATE WITH DATA" />
        </Title>
      </div>
    {/if}
  </div>
</FullBleed>
