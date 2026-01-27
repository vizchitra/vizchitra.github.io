<script lang="ts">
	import {
		BannerCurve,
		BannerPolygon,
		Container,
		Layer,
		FullBleed,
		Stack,
		Heading
	} from '$lib/components';

	interface Props {
		title: string;
		banner?: 'polygon' | 'curve' | 'none';
	}

	let { title, banner = 'polygon' }: Props = $props();
</script>

<FullBleed>
	<Container width="full">
		{#if banner !== 'none'}
			<Layer position="absolute" inset="0" zIndex={0}>
				{#if banner === 'curve'}
					<BannerCurve staticBanner={true} direction="header" />
				{:else}
					<BannerPolygon staticBanner={true} fadeDirection="bottom" />
				{/if}
			</Layer>
		{/if}

		<!-- Centered title -->
		<Layer position="relative" zIndex={1}>
			<Stack>
				<Heading type="display" align="center" class="p-sm rounded-lg bg-white/80">
					{title}
				</Heading>
			</Stack>
		</Layer>
	</Container>
</FullBleed>
