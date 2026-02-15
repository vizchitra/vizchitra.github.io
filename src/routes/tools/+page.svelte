<script lang="ts">
	import { Header, Stack, Cluster } from '$lib/components';

	const tools = [
		{
			title: 'Banners',
			href: '/tools/banner',
			description:
				'Interactive and static banner components using Voronoi Polygons, Ridge Curves, Quilt Squares & Physics Blobs'
		},
		{
			title: 'Patterns',
			href: '/tools/pattern',
			description: 'Pattern generation tools for creating unique visual designs'
		},
		{
			title: 'Share Cards',
			href: '/tools/cards',
			description: 'Generate social media share cards and preview images for VizChitra guides'
		},
		{
			title: 'Selfie',
			href: '/tools/selfie',
			description: 'Selfie photo tool for profile pictures'
		},
		{
			title: 'Colors',
			href: '/tools/colors',
			description: 'Complete color palette and usage guidelines including base colors, ramps, and named variants'
		}
	];
</script>

<Header banner="square" color="grey" />

<section class="mx-auto max-w-7xl space-y-10 px-2 py-12">
	<div class="mb-12">
		<h1 class="text-viz-black mb-4 text-4xl font-bold">Tools</h1>
		<p class="text-viz-grey-dark text-lg">
			Explore our collection of design tools and resources for creating visual content.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each tools as tool}
			<a
				href={tool.href}
				class="border-viz-grey-muted bg-viz-white hover:border-viz-grey-dark group block rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg"
			>
				<h2 class="text-viz-black mb-3 text-2xl font-bold group-hover:text-viz-pink">
					{tool.title}
				</h2>
				<p class="text-viz-grey-dark text-base">{tool.description}</p>
			</a>
		{/each}
	</div>
</section>
