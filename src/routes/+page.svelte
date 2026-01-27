<script lang="ts">
	import { getPage } from '$lib/loaders/content';
	let { data }: { data?: { slug?: string } } = $props();
	const page = $derived(getPage(data?.slug || 'index'));
</script>

{#if page?.Component}
	<page.Component frontmatter={page.frontmatter} />
{:else}
	<h1>404 - Page Not Found</h1>
{/if}
