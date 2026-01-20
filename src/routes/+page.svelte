<script lang="ts">
	import { getContentModules } from '$lib/loaders/content';

	let { data = { slug: '', frontmatter: {} } }: { data?: any } = $props();

	const pages = getContentModules();

	// Home page: match /content/index.md exactly (not /2025/index.md etc.)
	let Component = $derived((() => {
		const pageKey = Object.keys(pages).find((p) => p.endsWith('/content/index.md'));
		return pageKey ? (pages as any)[pageKey].default : null;
	})());
</script>

{#key data.slug}
	{#if Component}
		<svelte:component this={Component} frontmatter={data.frontmatter} />
	{:else}
		<div class="prose mx-auto max-w-7xl px-4 py-8">
			<h1>404 - Page Not Found</h1>
			<p>The page <code>{data.slug || 'home'}</code> could not be found.</p>
		</div>
	{/if}
{/key}
