<script lang="ts">
	import { FullBleed } from '$lib/components/layout';
	import { PolygonPlayground } from '$lib/components/sections';
	import ToolsCard from '$lib/components/interface/ToolsCard.svelte';
	import ToolsHeader from '$lib/components/interface/ToolsHeader.svelte';
</script>

<svelte:head>
	<title>Selfie Tool | VizChitra</title>
	<meta
		name="description"
		content="Selfie / polygon playground for experimenting with shapes and cameras."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl space-y-10 px-2 py-12">
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/selfie', label: 'Selfie' }
		]}
		title="Selfie Playground"
		subtitle="Interactive playground for polygon selfies and experimental canvas-based compositions."
	/>

	<FullBleed>
		<ToolsCard widthClass="w-full" maxWidthClass="max-w-6xl">
			<PolygonPlayground />
		</ToolsCard>
	</FullBleed>
</section>
