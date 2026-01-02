<script lang="ts">
	import { Header, BannerPolygon, BannerCurve } from '$lib/components/structure';

	export let data: any;
	$: ({ frontmatter = {} } = data);

	// Banner options from frontmatter
	// banner: 'polygon' | 'curve' (default: 'polygon')
	// interactive: boolean (default: false, only applies to header)
	// size: 'default' | 'large' (default: 'default')
	$: banner = frontmatter.banner ?? 'polygon';
	$: interactive = frontmatter.interactive ?? false;
	$: size = frontmatter.size ?? 'default';

	// Load mdsvex-compiled Svelte components from the content folder at build time.
	// Eager so components are available during SSR/prerender.
	const pages = import.meta.glob('../../../content/**/*.md', { eager: true });

	let Component: any = null;
	// Try exact match first, then try with /index suffix for directory index pages
	let pageKey = Object.keys(pages).find((p) => p.endsWith(`/${data.slug}.md`));
	if (!pageKey) {
		pageKey = Object.keys(pages).find((p) => p.endsWith(`/${data.slug}/index.md`));
	}
	if (pageKey) {
		// default export is the compiled Svelte component
		Component = (pages as any)[pageKey].default;
	}
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
		<Header title={frontmatter.title} {banner} {interactive} {size} />
	{/if}

	<section
		class="content-container prose prose-lg prose-headings:text-center prose-headings:text-viz-black prose-p:text-viz-black prose-a:text-viz-blue-dark prose-li:marker:text-viz-grey-dark prose-li:my-1 max-w-3xl py-12"
	>
		{#if Component}
			<svelte:component this={Component} />
		{:else}
			<p>Content not found.</p>
		{/if}
	</section>
</div>
