<script lang="ts">
	import { FullBleed } from '$lib/components/layout';
	import Container from '$lib/components/layout/Container.svelte';
	import { VideoGrid } from '$lib/components/sections';
	import { Header } from '$lib/components/structure';
	import { Heading } from '$lib/components/typography';
</script>

<Header title="Session Videos 2025" banner="polygon" />

<Container>
	<Heading tag="h1" align="center" class="pb-8">Videos @ VizChitra 2025</Heading>
	<FullBleed>
		<VideoGrid />
	</FullBleed>
</Container>
