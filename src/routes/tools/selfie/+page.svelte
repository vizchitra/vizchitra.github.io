<script lang="ts">
	import { FullBleed, PolygonPlayground, ToolsCard, ToolsHeader, Header } from '$lib/components';
</script>

<Header banner="square" color="grey"></Header>

<section class="mx-auto max-w-7xl space-y-10 px-2 py-12">
	<ToolsHeader
		trail={[
			{ href: '/tools', label: 'Tools' },
			{ href: '/tools/selfie', label: 'Selfie' }
		]}
		title="Selfie (Polygon) Playground"
		subtitle="Interactive playground for polygon selfies and experimental canvas-based compositions."
	/>

	<FullBleed>
		<ToolsCard widthClass="w-full" maxWidthClass="max-w-6xl">
			<PolygonPlayground />
		</ToolsCard>
	</FullBleed>
</section>
