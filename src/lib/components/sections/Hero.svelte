<script lang="ts">
	import {
		Container,
		Layer,
		FullBleed,
		Stack,
		BannerCurve,
		BannerPolygon,
		LogoTagline,
		Heading,
		Slanted
	} from '$lib/components';

	interface Props {
		banner?: 'polygon' | 'curve';
		tagline?: string;
	}

	let { banner = 'polygon', tagline = 'A SPACE TO CONNECT AND CREATE WITH DATA' }: Props = $props();
</script>

<FullBleed>
	<Container width="full" class="h-[60svh] overflow-hidden">
		<!-- Banner background layer -->
		{#if banner === 'curve'}
			<Layer position="absolute" inset="0" zIndex={0}>
				<BannerCurve staticBanner={false} direction="header" />
			</Layer>
			<Layer position="absolute" inset="0" zIndex={1} class="pointer-events-none">
				<div class="absolute bottom-0 left-5 md:left-25">
					<LogoTagline />
				</div>
			</Layer>
			<Heading type="title" color="grey" align="right" class="absolute top-0 right-10 w-[20ch]">
				<Slanted text={tagline} />
			</Heading>
		{:else}
			<Layer position="absolute" inset="0" zIndex={0}>
				<BannerPolygon staticBanner={false} fadeDirection="bottom" />
			</Layer>
			<Layer position="relative" zIndex={1}>
				<Stack>
					<LogoTagline tag="h1" text={tagline} />
				</Stack>
			</Layer>
		{/if}
	</Container>
</FullBleed>
