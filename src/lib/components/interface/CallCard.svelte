<script lang="ts">
	import { PatternCircle, PatternWaves, PatternRiver, PatternStream } from '$lib/components';

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

	let internalVariation = $state(0);

	// Reset internal variation when prop changes
	$effect(() => {
		internalVariation = variation;
	});

	function handlePointerMove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
		const y = e.clientY - rect.top;
		// Determine variation based on vertical positions (0 at top, 1 at bottom)
		// Quantize to steps of 20 (0, 0.5, 0.10, ..., 0.95, 1.0)
		const rawVariation = Math.max(0, Math.min(1, y / rect.height));
		internalVariation = Math.round(rawVariation * 20) / 20;
	}

	function handlePointerLeave() {
		internalVariation = variation;
	}

	const patterns = {
		circle: PatternCircle,
		waves: PatternWaves,
		river: PatternRiver,
		stream: PatternStream
	};

	const PatternComponent = $derived(patterns[pattern]);

	const borderColors: Record<Tone, string> = {
		blue: 'outline-viz-blue-muted',
		teal: 'outline-viz-teal-muted',
		orange: 'outline-viz-orange-muted',
		pink: 'outline-viz-pink-muted',
		yellow: 'outline-viz-yellow-muted'
	};

	const titlePositionClass = $derived(`absolute ${titlePosition}`);
	const subtitlePositionClass = $derived(`absolute ${subtitlePosition}`);

	const textColors: Record<Tone, string> = {
		blue: 'text-viz-white',
		teal: 'text-viz-black',
		orange: 'text-viz-black',
		pink: 'text-viz-black',
		yellow: 'text-viz-black'
	};

	const containerClass = $derived(
		`relative overflow-hidden rounded-lg aspect-[4/5] outline-2 ${borderColors[tone]} transition-all duration-200 hover:outline-4 active:outline-4 no-underline w-full min-w-[280px] sm:min-w-[320px] md:max-w-sm ${className}`
	);
</script>

{#snippet cardContent()}
	<div
		class={containerClass}
		role="img"
		onpointermove={handlePointerMove}
		onpointerleave={handlePointerLeave}
	>
		<!-- Pattern Background -->
		<div class="absolute inset-0">
			<PatternComponent
				{tone}
				variation={internalVariation}
				width={400}
				height={500}
				class="h-full w-full"
			/>
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
						class="font-body text-viz-sm max-w-[25ch] text-base leading-[1.1] italic drop-shadow-md {textColors[
							tone
						]}"
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
