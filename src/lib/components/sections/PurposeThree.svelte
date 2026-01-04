<script lang="ts">
	import Pentagons from '$lib/components/structure/Pentagons.svelte';

	// Localized purpose items (moved from page) — keeps the component self-contained
	const items: Array<{ title: string; description: string; backgroundColor: string }> = [
		{
			title: 'Explore & Play',
			description: 'On practices of data exploration, interface & dashboard design for dataviz.',
			backgroundColor: 'var(--color-viz-teal-light)'
		},
		{
			title: 'Explain & Learn',
			description: 'Centered on fundamentals of process, design & communication for dataviz.',
			backgroundColor: 'var(--color-viz-yellow-light)'
		},
		{
			title: 'Imagine & Innovate',
			description:
				'Use of new mediums, approaches, AI & tech to shape how we do dataviz in future.',
			backgroundColor: 'var(--color-viz-blue-light)'
		}
	];
</script>

<div class="mt-6 flex flex-wrap gap-4">
	{#each items as item, i}
		<Pentagons
			title={item.title}
			description={item.description}
			backgroundColor={item.backgroundColor}
			seed={Math.floor(Math.random() * 10)}
		/>
	{/each}
</div>
