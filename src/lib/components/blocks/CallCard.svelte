<script lang="ts">
	import { PatternCircle, PatternRiver, PatternStream, PatternWaves } from '$lib/components';
	import { type Color, getColorTokens } from '$lib/utils/colorTokens';

	type Pattern = 'circle' | 'waves' | 'river' | 'stream';

	interface Props {
		title?: string;
		subtitle?: string;
		pattern?: Pattern;
		// Backwards-compatible: accept `tone` or `color`. Prefer `color` when provided.
		tone?: Color;
		color?: Color;
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
		color,
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

	const titlePositionClass = $derived(`absolute ${titlePosition}`);
	const subtitlePositionClass = $derived(`absolute ${subtitlePosition}`);

	const effectiveColor = $derived(color ?? tone);
	const tokens = $derived(getColorTokens(effectiveColor, 'pink'));
	const containerClass = $derived(
		`relative overflow-hidden rounded-lg aspect-[4/5] border-2 ${tokens.border} transition-all duration-200 hover:border-4 active:border-4 no-underline w-full min-w-2xs sm:min-w-xs md:max-w-sm ${className}`
	);
</script>

{#snippet cardContent()}
	<div class={containerClass}>
		<!-- Pattern Background -->
		<div class="absolute inset-0">
			<PatternComponent
				color={effectiveColor}
				{variation}
				width={400}
				height={500}
				class="h-full w-full"
			/>
		</div>

		<!-- Content Overlay with Independent Positioning -->
		<div class="p-lg pointer-events-none relative z-10 h-full">
			<!-- Title Section -->
			{#if title}
				<div class={titlePositionClass}>
					<h3
						class="font-display w-11/12 text-2xl leading-tight font-bold text-black uppercase drop-shadow-lg md:text-3xl"
					>
						{title}
					</h3>
				</div>
			{/if}

			<!-- Subtitle Section -->
			{#if subtitle}
				<div class={subtitlePositionClass}>
					<p
						class="font-body md:text-md max-w-xs text-base leading-tight text-black italic drop-shadow-md"
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
