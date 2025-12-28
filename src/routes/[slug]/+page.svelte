<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import MarkdocRenderer from '$lib/components/Markdoc/MarkdocRenderer.svelte';
	import Slanted from '$lib/components/Markdoc/Slanted.svelte';

	export let data: any;
	// Reactively update local variables when data changes
	$: ({ frontmatter = {}, html, payloadString } = data);

	const components = {
		Slanted
	};

	// Workaround: Parse the JSON string sent from server
	$: ast = payloadString ? JSON.parse(payloadString) : null;
</script>

<svelte:head>
	{#if frontmatter.title}
		<title>{frontmatter.title} | VizChitra</title>
	{/if}
	{#if frontmatter.description}
		<meta name="description" content={frontmatter.description} />
		<meta property="og:description" content={frontmatter.description} />
	{/if}
	{#if frontmatter.title}
		<meta property="og:title" content={frontmatter.title} />
	{/if}
</svelte:head>

<div class="min-h-screen">
	{#if frontmatter.title}
		<PageHeader title={frontmatter.title} />
	{/if}

	<section
		class="content-container prose prose-lg prose-headings:text-viz-black prose-p:text-viz-black prose-a:text-viz-blue-dark max-w-3xl py-12"
	>
		<MarkdocRenderer node={ast} {components} />
	</section>
</div>
