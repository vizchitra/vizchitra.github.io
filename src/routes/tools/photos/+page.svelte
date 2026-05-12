<script lang="ts">
	import { FullBleed, ToolsCard, ToolsHeader, Header } from '$lib/components';
	import SquarePortraitDesigner from '$lib/components/interface/SquarePortraitDesigner.svelte';
</script>

<Header banner="square" color="grey" />

<section class="mx-auto max-w-7xl space-y-10 px-2 py-12">
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/photos', label: 'Photos' }
		]}
		title="Square Portrait Designer"
		subtitle="Upload a portrait with a transparent or solid background, align the face using guide lines, then export a clean square headshot as WebP."
	/>

	<FullBleed>
		<ToolsCard widthClass="w-full" maxWidthClass="max-w-6xl">
			<SquarePortraitDesigner />
		</ToolsCard>
	</FullBleed>
</section>
