<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let width: number | null = $state(null);
	const height = 80;

	// CSS variable names for colors (same format as BannerCurve)
	const colorVarNames = [
		'--color-viz-yellow',
		'--color-viz-teal',
		'--color-viz-blue',
		'--color-viz-orange',
		'--color-viz-pink'
	];

	let resolvedColors: string[] = $state([]);

	function getComputedColors() {
		if (!browser) return;
		const rootStyles = getComputedStyle(document.documentElement);
		resolvedColors = colorVarNames.map((varName) => {
			const value = rootStyles.getPropertyValue(varName).trim();
			return value || '#000000';
		});
	}

	// Shuffle array using Fisher-Yates
	function shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	const STROKE_WIDTH = 6;
	const NUM_DOTS = 5; // 4 dots = 3 segments

	interface DotData {
		cx: number;
		cy: number;
		fill: string;
	}

	interface SegmentData {
		path: string;
		stroke: string;
	}

	let segments: SegmentData[] = $state([]);
	let dots: DotData[] = $state([]);

	// Calculate point on cubic bezier at parameter t
	function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number): number {
		return (
			Math.pow(1 - t, 3) * p0 +
			3 * Math.pow(1 - t, 2) * t * p1 +
			3 * (1 - t) * Math.pow(t, 2) * p2 +
			Math.pow(t, 3) * p3
		);
	}

	function generateCurve() {
		if (!width || resolvedColors.length === 0) return;

		// Shuffle colors for segments
		const shuffledColors = shuffleArray(resolvedColors);

		// Random start and end Y positions
		const startY = Math.random() * (height - STROKE_WIDTH * 2) + STROKE_WIDTH;
		const endY = Math.random() * (height - STROKE_WIDTH * 2) + STROKE_WIDTH;

		// Create control points for a flowing bezier curve
		const cp1x = width * 0.25 + (Math.random() - 0.5) * width * 0.2;
		const cp1y = Math.random() * height;
		const cp2x = width * 0.75 + (Math.random() - 0.5) * width * 0.2;
		const cp2y = Math.random() * height;

		// Generate dot positions along the curve
		const newDots: DotData[] = [];
		const dotPositions: { x: number; y: number }[] = [];

		for (let i = 0; i < NUM_DOTS; i++) {
			const t = i / (NUM_DOTS - 1); // 0, 0.33, 0.67, 1
			const x = bezierPoint(t, 0, cp1x, cp2x, width);
			const y = bezierPoint(t, startY, cp1y, cp2y, endY);
			dotPositions.push({ x, y });
			newDots.push({ cx: x, cy: y, fill: '#4c4c4c' });
		}

		// Generate segments between dots using quadratic bezier for smooth connection
		const newSegments: SegmentData[] = [];
		for (let i = 0; i < NUM_DOTS - 1; i++) {
			const from = dotPositions[i];
			const to = dotPositions[i + 1];

			// Calculate control point for smooth curve segment
			const midX = (from.x + to.x) / 2;
			const midT = (i + 0.5) / (NUM_DOTS - 1);
			const targetMidY = bezierPoint(midT, startY, cp1y, cp2y, endY);

			// Quadratic bezier control point
			const cpY = 2 * targetMidY - (from.y + to.y) / 2;

			const path = `M ${from.x} ${from.y} Q ${midX} ${cpY}, ${to.x} ${to.y}`;
			newSegments.push({
				path,
				stroke: shuffledColors[i % shuffledColors.length]
			});
		}

		segments = newSegments;
		dots = newDots;
	}

	onMount(() => {
		getComputedColors();
		// Small delay to ensure width is measured and colors resolved
		setTimeout(() => {
			generateCurve();
		}, 10);
	});
</script>

<div class="divider-container my-12 w-full" bind:clientWidth={width}>
	{#if width && segments.length > 0}
		<svg {width} {height} viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
			{#each segments as segment}
				<path
					d={segment.path}
					stroke={segment.stroke}
					stroke-width={STROKE_WIDTH}
					fill="none"
					stroke-linecap="round"
				/>
			{/each}

			{#each dots as dot}
				<circle cx={dot.cx} cy={dot.cy} r="7" fill="white" />
				<circle cx={dot.cx} cy={dot.cy} r="5" fill={dot.fill} />
			{/each}
		</svg>
	{/if}
</div>
