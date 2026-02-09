<script lang="ts">
	import Prose from '$lib/components/typography/Prose.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let headerColor = $derived(`text-${data.guideColor}-700`);
</script>

<article class="guide-article">
	<nav class="article-header py-8">
		<h6 class="text-viz-xs font-medium"><a href="/guides">VIZCHITRA GUIDES</a></h6>
		<h3 class="text-viz-2xl m-0 font-bold {headerColor}">
			{data.guideSlug.toUpperCase()}
		</h3>
	</nav>
	{#if data.isDraft}
		<div class="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
			<p class="text-lg text-gray-500">🚧 This section is currently being written.</p>
			<p class="text-sm text-gray-400">Check back soon for updates!</p>
		</div>
	{:else}
		<Prose color={data.guideColor}>
			{@html data.section.html}
		</Prose>
	{/if}
</article>

<nav class="section-nav">
	{#if data.prevSection}
		<a href="/guides/{data.guideSlug}/{data.prevSection.sectionSlug}" class="nav-prev">
			<span class="nav-label">Previous</span>
			<span class="nav-text"
				>← {data.prevSection.sectionSlug.charAt(0).toUpperCase() +
					data.prevSection.sectionSlug.slice(1)}</span
			>
		</a>
	{:else}
		<div></div>
	{/if}

	{#if data.nextSection}
		<a href="/guides/{data.guideSlug}/{data.nextSection.sectionSlug}" class="nav-next">
			<span class="nav-label">Next</span>
			<span class="nav-text"
				>{data.nextSection.sectionSlug.charAt(0).toUpperCase() +
					data.nextSection.sectionSlug.slice(1)} →</span
			>
		</a>
	{/if}
</nav>

<style>
	.guide-article {
		max-width: 48rem;
		margin: 0 auto;
		padding: 0 0rem;
		min-height: 60vh;
	}

	.section-nav {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		max-width: 48rem;
		margin: 0 auto;
		padding: 2rem;
		/* border-top: 1px solid var(--color-gray-200, #e5e7eb); */
	}

	.nav-prev,
	.nav-next {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1rem;
		border-radius: 0.5rem;
		text-decoration: none;
		transition: background-color 0.15s;
		max-width: 45%;
	}

	.nav-prev:hover,
	.nav-next:hover {
		background-color: var(--color-grey-50, #f9fafb);
	}

	.nav-next {
		text-align: right;
		margin-left: auto;
	}

	.nav-label {
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-grey-500, #6b7280);
	}

	.nav-text {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-grey-900, #111827);
	}
</style>
