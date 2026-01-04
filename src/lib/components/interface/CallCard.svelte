<script lang="ts">
	import PatternCircle from '$lib/components/structure/PatternCircle.svelte';
	import PatternWaves from '$lib/components/structure/PatternWaves.svelte';
	import PatternRiver from '$lib/components/structure/PatternRiver.svelte';
	import PatternStream from '$lib/components/structure/PatternStream.svelte';

	type Pattern = 'circle' | 'waves' | 'river' | 'stream';
	type Tone = 'blue' | 'teal' | 'orange' | 'pink' | 'yellow';

	interface Props {
		title?: string;
		subtitle?: string;
		pattern?: Pattern;
		tone?: Tone;
		variation?: number;
		titlePosition?: string;
		subtitlePosition?: string;
		href?: string;
		external?: boolean;
		class?: string;
	}

	let {
		title = '',
		subtitle = '',
		pattern = 'circle',
		tone = 'pink',
		variation = 0.5,
		titlePosition = 'top-0 left-0',
		subtitlePosition = 'bottom-0 left-0',
		href,
		external = false,
		class: className = ''
	}: Props = $props();

	const patterns = {
		circle: PatternCircle,
		waves: PatternWaves,
		river: PatternRiver,
		stream: PatternStream
	};

	const PatternComponent = $derived(patterns[pattern]);

	const borderColors: Record<Tone, string> = {
		blue: 'border-viz-blue',
		teal: 'border-viz-teal',
		orange: 'border-viz-orange',
		pink: 'border-viz-pink',
		yellow: 'border-viz-yellow'
	};

	const titlePositionClass = $derived(`absolute ${titlePosition}`);
	const subtitlePositionClass = $derived(`absolute ${subtitlePosition}`);

	const containerClass = $derived(
		`relative overflow-hidden rounded-lg aspect-[4/5] border-2 ${borderColors[tone]} transition-all duration-200 hover:border-4 active:border-4 no-underline w-full min-w-[280px] sm:min-w-[320px] md:max-w-sm ${className}`
	);
</script>

{#snippet cardContent()}
	<div class={containerClass}>
		<!-- Pattern Background -->
		<div class="absolute inset-0">
			<PatternComponent {tone} {variation} width={400} height={500} class="h-full w-full" />
		</div>

		<!-- Content Overlay with Independent Positioning -->
		<div class="pointer-events-none relative z-10 h-full p-8">
			<!-- Title Section -->
			{#if title}
				<div class={titlePositionClass}>
					<h3
						class="font-display text-viz-black max-w-[90%] text-2xl leading-tight font-bold uppercase drop-shadow-lg md:text-3xl"
					>
						{title}
					</h3>
				</div>
			{/if}

			<!-- Subtitle Section -->
			{#if subtitle}
				<div class={subtitlePositionClass}>
					<p
						class="font-body text-viz-black md:text-md max-w-[25ch] text-base leading-[1.1] italic drop-shadow-md"
					>
						{subtitle}
					</p>
				</div>
			{/if}
		</div>
	</div>
{/snippet}

{#if href}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		class="block no-underline"
	>
		{@render cardContent()}
	</a>
{:else}
	{@render cardContent()}
{/if}
