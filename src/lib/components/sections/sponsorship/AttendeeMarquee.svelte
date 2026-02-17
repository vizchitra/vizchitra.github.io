<script lang="ts">
	import { MarqueeRow } from '$lib/components/interface';
	import orgs from '$lib/data/orgs.csv';

	// Define a mapping from categories to colors
	const categoryColors = {
		'Academia, Education & Research': 'var(--color-viz-yellow)',
		'Data & AI, Consulting & Services': 'var(--color-viz-teal)',
		'Design, Media & Communication': 'var(--color-viz-blue)',
		'Domain Specific Visualisation': 'var(--color-viz-orange)',
		'Tool Builders & Creators': 'var(--color-viz-pink)'
	};

	// Map the orgs data to an array of company objects including category and color
	const companies = orgs.map((org: { name: string; category: string }) => ({
		name: org.name,
		category: org.category,
		color: categoryColors[org.category as keyof typeof categoryColors]
	}));

	// Calculate category counts
	const categoryCounts = companies.reduce(
		(acc, company) => {
			acc[company.category] = (acc[company.category] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>
	);

	// Prepare legend data
	const legendItems = Object.keys(categoryColors).map((category) => ({
		category,
		count: categoryCounts[category] || 0,
		color: categoryColors[category as keyof typeof categoryColors]
	}));

	// Split companies into rows for marquee
	type MarqueeCompany = { name: string; category: string; color: string };
	type MarqueeRow = { items: MarqueeCompany[]; direction: 'right' | 'left'; duration: string };
	const marqueeRows: MarqueeRow[] = [
		{ items: companies.slice(0, 20), direction: 'right', duration: '80s' },
		{ items: companies.slice(20, 40), direction: 'left', duration: '80s' },
		{ items: companies.slice(40, 60), direction: 'right', duration: '80s' }
	];
</script>

<!-- Companies Marquee Section -->
<section class="full-bleed my-12 overflow-hidden py-12">
	{#each marqueeRows as row}
		<MarqueeRow items={row.items} direction={row.direction} duration={row.duration} />
	{/each}
	<div class="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
		{#each legendItems.sort((a, b) => b.count - a.count) as item}
			<div class="flex items-center gap-2 text-xs">
				<div
					class="flex size-6 items-center justify-center rounded-full"
					style="background-color: {item.color};"
				>
					<span class="text-xs font-bold">{item.count}</span>
				</div>
				<span>{item.category} </span>
			</div>
		{/each}
	</div>
</section>

<!-- Legend Section -->

<style>
	.full-bleed {
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}
</style>
