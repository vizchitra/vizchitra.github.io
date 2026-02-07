<script lang="ts">
	import type { PageData } from './$types';
	import { Prose } from '$lib/components/typography';
	import { Container } from '$lib/components/layout';
	import { Header } from '$lib/components/structure';

	let { data }: { data: PageData } = $props();
	let color = data.document.color ? data.document.color : 'grey';
	let banner = data.document.banner ? data.document.banner : 'curve';
</script>

<svelte:head>
	<title>{data.document.title}</title>
	{#if data.document.description}
		<meta name="description" content={data.document.description} />
		<meta property="og:description" content={data.document.description} />
		<meta name="twitter:description" content={data.document.description} />
	{/if}
	<meta property="og:title" content={data.document.title} />
	<meta name="twitter:title" content={data.document.title} />
	<meta property="og:type" content="website" />
</svelte:head>

{#if data.document.banner}
	<Header {color} {banner} />
{/if}

<Container>
	<Prose color={data.document.color}>
		{@html data.document.html}
	</Prose>
</Container>
