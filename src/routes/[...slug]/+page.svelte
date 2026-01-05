<script lang="ts">
	export let data: any;
	$: ({ frontmatter = {} } = data);

	// Load mdsvex-compiled Svelte components from the content folder at build time.
	// Eager so components are available during SSR/prerender.
	const pages = import.meta.glob('../../../content/**/*.md', { eager: true });

	// Make Component reactive so it updates when data.slug changes
	$: Component = (() => {
		// Try exact match first, then try with /index suffix for directory index pages
		let pageKey = Object.keys(pages).find((p) => p.endsWith(`/${data.slug}.md`));
		if (!pageKey) {
			pageKey = Object.keys(pages).find((p) => p.endsWith(`/${data.slug}/index.md`));
		}
		return pageKey ? (pages as any)[pageKey].default : null;
	})();
</script>

<svelte:head>
	{#if frontmatter.title}
		<title>{frontmatter.title}</title>
	{/if}
	{#if frontmatter.description}
		<meta name="description" content={frontmatter.description} />
		<meta property="og:description" content={frontmatter.description} />
		<meta name="twitter:description" content={frontmatter.description} />
	{/if}
	{#if frontmatter.title}
		<meta property="og:title" content={`${frontmatter.title} | VizChitra`} />
		<meta name="twitter:title" content={`${frontmatter.title} | VizChitra`} />
	{/if}
	{#if frontmatter.image}
		<meta property="og:image" content={frontmatter.image} />
		<meta name="twitter:image" content={frontmatter.image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	<meta property="og:type" content="website" />
</svelte:head>

{#key data.slug}
	<div class="min-h-screen">
		<section class="content-container prose prose-lg prose-viz max-w-3xl pb-12">
			{#if Component}
				<svelte:component this={Component} />
			{:else}
				<p>Content not found.</p>
			{/if}
		</section>
	</div>
{/key}
