<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	type Color = 'blue' | 'pink' | 'teal' | 'orange' | 'yellow';

	interface Props {
		color?: Color;
		seed?: number;
		class?: string;
	}

	let { color = 'yellow', seed, class: className = '' }: Props = $props();

	// Instance seed: prefer provided `seed`, otherwise create one on mount
	let instanceSeed: number | undefined;
	$effect(() => {
		void seed; // Track seed changes
		if (seed !== undefined) instanceSeed = seed;
	});

	import { colorMap } from '$lib/utils/color.js';

	// Use shared colorMap (hex values) for format colors
	const formatColors: Record<Color, string[]> = {
		blue: [colorMap.blue.light, colorMap.blue.normal, colorMap.blue.dark],
		teal: [colorMap.teal.light, colorMap.teal.normal, colorMap.teal.dark],
		pink: [colorMap.pink.light, colorMap.pink.normal, colorMap.pink.dark],
		orange: [colorMap.orange.light, colorMap.orange.normal, colorMap.orange.dark],
		yellow: [colorMap.yellow.light, colorMap.yellow.normal, colorMap.yellow.dark]
	};

	const NUM_CURVES = 3;
	const POINTS_PER_CURVE = 60;
	const BASE_AMPLITUDE = 15;

	// Generate random multipliers based on seed
	function seededRandom(s: number): number {
		const x = Math.sin(s * 9999) * 10000;
		return x - Math.floor(x);
	}

	// Create stable random values per instance (computed reactively once seed/instanceSeed available)
	let r1: number, r2: number, r3: number;
	let amplitudeMultipliers: number[] | undefined;
	let phaseOffsets: number[] | undefined;
	let freqMultipliers: number[] | undefined;

	$effect(() => {
		void instanceSeed; // Track instanceSeed changes
		if (instanceSeed !== undefined) {
			r1 = seededRandom(instanceSeed);
			r2 = seededRandom(instanceSeed + 1);
			r3 = seededRandom(instanceSeed + 2);
			amplitudeMultipliers = [0.6 + r1 * 0.6, 0.8 + r2 * 0.6, 0.7 + r3 * 0.5];
			phaseOffsets = [r1 * Math.PI * 2, r2 * Math.PI * 2, r3 * Math.PI * 2];
			freqMultipliers = [1.5 + r1, 2.5 + r2, 4 + r3];
		}
	});

	let resolvedColors: string[] = $state([]);
	let width = $state(1080);
	let height = $state(120);

	function getComputedColors() {
		// Use `formatColors` already populated from `colorMap` (hex values)
		resolvedColors = formatColors[color] || ['#cccccc', '#cccccc', '#cccccc'];
	}

	function generateCurvePath(curveIndex: number): string {
		const points: { x: number; y: number }[] = [];
		const step = width / (POINTS_PER_CURVE - 1);
		const amplitude = BASE_AMPLITUDE * amplitudeMultipliers[curveIndex];
		const phase = phaseOffsets[curveIndex];
		const freq = freqMultipliers[curveIndex];

		for (let i = 0; i < POINTS_PER_CURVE; i++) {
			const x = i * step;
			const xProgress = x / width;

			// Asymmetric diagonal: less on left (near bottom), ~50% height on right
			// Use eased xProgress for smoother diagonal curve
			const easedProgress = xProgress * xProgress; // quadratic ease-in
			const diagonalOffset = easedProgress * (height * 0.5); // up to 50% of height on right

			// Base Y position - curves stack from bottom, rise diagonally to right
			const baseY = height - 10 - curveIndex * 15 - diagonalOffset;

			// Wave functions with randomized phase and frequency
			const wave1 =
				Math.sin(xProgress * Math.PI * freq + phase + curveIndex * 0.8) * amplitude * 0.7;
			const wave2 =
				Math.sin(xProgress * Math.PI * (freq + 1) + phase + curveIndex * 0.5) * amplitude * 0.4;
			const wave3 =
				Math.sin(xProgress * Math.PI * (freq + 2) + phase + curveIndex * 0.3) * amplitude * 0.2;

			const y = baseY - wave1 - wave2 - wave3;
			points.push({ x, y });
		}

		// Build SVG path with smooth curves - fill from curve to bottom
		let path = `M 0 ${height} L ${points[0].x} ${points[0].y}`;

		for (let i = 1; i < points.length - 1; i++) {
			const xc = (points[i].x + points[i + 1].x) / 2;
			const yc = (points[i].y + points[i + 1].y) / 2;
			path += ` Q ${points[i].x} ${points[i].y} ${xc} ${yc}`;
		}

		const last = points[points.length - 1];
		path += ` L ${last.x} ${last.y} L ${width} ${height} Z`;

		return path;
	}

	let paths = $derived(
		amplitudeMultipliers
			? Array.from({ length: NUM_CURVES }, (_, i) => ({
					d: generateCurvePath(i),
					color: resolvedColors[i] || '#cccccc',
					opacity: 1 - i * 0.1
				}))
			: []
	);

	onMount(() => {
		getComputedColors();
	});

	// Re-resolve colors when color changes
	$effect(() => {
		void color; // Track color changes
		getComputedColors();
	});
</script>

<div class="pattern-formats w-full overflow-hidden {className}">
	<svg
		viewBox="0 0 {width} {height}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="none"
		class="h-full w-full"
	>
		{#each paths as { d, color, opacity }, i (i)}
			<path {d} fill={color} fill-opacity={opacity} />
		{/each}
	</svg>
</div>

<style>
	.pattern-formats {
		height: 100px;
	}

	@media (min-width: 768px) {
		.pattern-formats {
			height: 140px;
		}
	}
</style>
