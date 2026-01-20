<script lang="ts">
	import { PatternFormats } from '$lib/components';
	import { type Color, getColorTokens } from '$lib/utils/colorTokens';

	interface Props {
		color?: Color;
		title: string;
		duration: string;
		bestFor: string;
		points: string[];
		class?: string;
	}

	let { color = 'blue', title, duration, bestFor, points, class: className = '' }: Props = $props();

	const tokens = $derived(getColorTokens(color, 'blue'));
</script>

<article
	class="format-card not-prose gap-sm grid overflow-hidden rounded-lg border-2 bg-white shadow-md transition-shadow hover:shadow-lg {tokens.border} {className}"
>
	<!-- Row 1: Title (left) + Duration (right) -->
	<div class="mb-sm px-sm pt-sm pb-xs grid grid-cols-2 items-baseline gap-xs">
		<h3 class="font-display text-xl font-black tracking-wide uppercase {tokens.text}">
			{title}
		</h3>
		<span class="text-grey text-right text-lg font-medium">
			{duration}
		</span>
	</div>

	<!-- Row 2: Best For (Caption) -->
	<p class="not-prose px-sm text-lg leading-snug font-bold text-black italic">
		{bestFor}
	</p>

	<!-- Row 3: Bullet Points with Pattern Background -->
	<div class="pb-lg relative">
		<!-- Pattern Background -->
		<div class="pointer-events-none absolute inset-0 overflow-hidden">
			<PatternFormats {color} class="absolute inset-x-0 bottom-0 h-full opacity-60" />
		</div>

		<!-- Bullet Points -->
		<ul class="px-sm pb-sm relative z-10 space-y-xs.5 text-base leading-relaxed text-black">
			{#each points as point}
				<li class="flex items-start gap-xs">
					<span class="mt-xs.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current"></span>
					<span>{point}</span>
				</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.format-card {
		min-height: 150px;
		grid-template-rows: auto auto 1fr;
	}

	/* Enable subgrid alignment when inside a grid parent */
	@supports (grid-template-rows: subgrid) {
		.format-card {
			grid-row: span 3;
			grid-template-rows: subgrid;
		}
	}
</style>
