<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Icon } from '$lib/components';
	import getBannerColorList from '$lib/utils/color';
	import mousePointer from '$lib/assets/icons/mouse-pointer.svg';

	interface Props {
		staticBanner?: boolean;
		direction?: 'header' | 'footer';
	}

	let { staticBanner = false, direction = 'header' }: Props = $props();

	const CURSOR_SIZE = 24;
	const UPDATE_INTERVAL = 16;
	const NUM_CURVES = 8;
	const POINTS_PER_CURVE = 120;
	const BASE_AMPLITUDE = 70;
	const CURVE_HEIGHT_RATIO = 0.7;

	// Concrete banner color list (8 colors)
	const resolvedColorsList = getBannerColorList(['orange', 'yellow', 'pink', 'teal', 'blue']);

	// Varying amplitude for each curve (more exaggeration)
	const amplitudeMultipliers = [0.6, 0.8, 1.2, 1.5, 1.3, 1.0, 0.9, 0.7];

	// Shuffle array using Fisher-Yates algorithm
	function shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	let resolvedColors: string[] = $state(resolvedColorsList);
	let shuffledColorOrder: number[] = $state(
		shuffleArray([...Array(resolvedColorsList.length).keys()])
	);

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;
	let width = $state(0);
	let height = $state(0);
	let cursorX = $state(0);
	let cursorY = $state(0);
	let lastUpdate = 0;
	let animationFrameId: number;

	interface CurvePoint {
		x: number;
		y: number;
		baseY: number;
	}

	const getColor = (index: number) => {
		const shuffledIndex = shuffledColorOrder[index % shuffledColorOrder.length] ?? index;
		return resolvedColors[shuffledIndex] || '#000000';
	};

	function generateCurvePoints(curveIndex: number, totalCurves: number): CurvePoint[] {
		if (!width || !height) return [];

		const points: CurvePoint[] = [];
		const step = width / (POINTS_PER_CURVE - 1);
		const amplitude = BASE_AMPLITUDE * amplitudeMultipliers[curveIndex];

		for (let i = 0; i < POINTS_PER_CURVE; i++) {
			const x = i * step;
			const xProgress = x / width; // 0 to 1 from left to right

			// Create diagonal effect based on direction
			// header: waves from top-left going down-right (white in bottom-right)
			// footer: waves from bottom-right going up-left (white in top-left)
			const diagonalOffset =
				direction === 'header'
					? xProgress * height * 0.4 // Goes down toward right
					: (1 - xProgress) * height * 0.4; // Goes down toward left

			const baseY =
				direction === 'header'
					? (curveIndex / totalCurves) * height * CURVE_HEIGHT_RATIO + diagonalOffset
					: height - (curveIndex / totalCurves) * height * CURVE_HEIGHT_RATIO - diagonalOffset;

			// Create static flowing waves with varying amplitude
			const wave1 = Math.sin(xProgress * Math.PI * 2 + curveIndex * 0.5) * amplitude * 0.7;
			const wave2 = Math.sin(xProgress * Math.PI * 3 + curveIndex * 0.3) * amplitude * 0.4;
			const wave3 = Math.sin(xProgress * Math.PI * 5 + curveIndex * 0.2) * amplitude * 0.2;

			let y = baseY + wave1 + wave2 + wave3;

			// Add mouse interaction if not static
			if (!staticBanner && cursorX > 0 && cursorY > 0) {
				const dx = x - cursorX;
				const dy = y - cursorY;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const influence = Math.max(0, 1 - distance / 200);

				// Pull curves toward cursor with wave-like motion
				// Use (curveIndex + 1) to ensure first curve also moves
				const pull = influence * 50 * Math.sin(curveIndex + 1);
				y += pull;
			}

			points.push({ x, y, baseY });
		}

		return points;
	}

	function drawFilledCurve(
		points: CurvePoint[],
		prevPoints: CurvePoint[] | null,
		color: string,
		alpha: number,
		isFirst: boolean
	) {
		if (!ctx || points.length < 2) return;

		ctx.beginPath();

		if (isFirst) {
			if (direction === 'header') {
				// First curve - start from top-left corner
				ctx.moveTo(0, 0);
				ctx.lineTo(width, 0);
				ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
			} else {
				// Footer: start from bottom-left corner
				ctx.moveTo(0, height);
				ctx.lineTo(width, height);
				ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
			}
		} else if (prevPoints && prevPoints.length > 0) {
			// Start from the previous curve (going forward)
			ctx.moveTo(prevPoints[0].x, prevPoints[0].y);
			for (let i = 1; i < prevPoints.length - 1; i++) {
				const xc = (prevPoints[i].x + prevPoints[i + 1].x) / 2;
				const yc = (prevPoints[i].y + prevPoints[i + 1].y) / 2;
				ctx.quadraticCurveTo(prevPoints[i].x, prevPoints[i].y, xc, yc);
			}
			const lastPrev = prevPoints[prevPoints.length - 1];
			const secondLastPrev = prevPoints[prevPoints.length - 2];
			ctx.quadraticCurveTo(secondLastPrev.x, secondLastPrev.y, lastPrev.x, lastPrev.y);
		}

		// Draw current curve going backwards (right to left)
		for (let i = points.length - 1; i > 0; i--) {
			const xc = (points[i].x + points[i - 1].x) / 2;
			const yc = (points[i].y + points[i - 1].y) / 2;
			ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}
		ctx.lineTo(points[0].x, points[0].y);

		ctx.closePath();

		// Fill the area
		ctx.globalAlpha = alpha;
		ctx.fillStyle = color;
		ctx.fill();

		// Add a stroke on bottom edge (current curve)
		const lastPoint = points[points.length - 1];
		const secondLastPoint = points[points.length - 2];
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length - 1; i++) {
			const xc = (points[i].x + points[i + 1].x) / 2;
			const yc = (points[i].y + points[i + 1].y) / 2;
			ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}
		ctx.quadraticCurveTo(secondLastPoint.x, secondLastPoint.y, lastPoint.x, lastPoint.y);
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.globalAlpha = Math.min(1, alpha + 0.1);
		ctx.stroke();
	}

	function draw() {
		if (!ctx || !width || !height) return;

		// Fill background with white
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, width, height);

		// Generate all curve points first
		const allCurvePoints: CurvePoint[][] = [];
		for (let i = 0; i < NUM_CURVES; i++) {
			allCurvePoints.push(generateCurvePoints(i, NUM_CURVES));
		}

		// Draw curves from top (index 0) to bottom - each fills from previous curve down to current
		// Apply fading alpha to later curves so they blend naturally into background
		for (let i = 0; i < NUM_CURVES; i++) {
			const points = allCurvePoints[i];
			const prevPoints = i > 0 ? allCurvePoints[i - 1] : null;
			const color = getColor(i);

			// Fade out the last few curves for a natural blend
			// For header: later curves (higher index) are at bottom, fade them
			// For footer: later curves (higher index) are at top, fade them
			const fadeStart = NUM_CURVES - 3; // Start fading from 3rd-to-last curve
			let alpha = 0.95;
			if (i >= fadeStart) {
				const fadeProgress = (i - fadeStart + 1) / (NUM_CURVES - fadeStart);
				alpha = 0.95 * (1 - fadeProgress * 0.8); // Fade to ~20% opacity
			}

			drawFilledCurve(points, prevPoints, color, alpha, i === 0);
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (event.buttons) return;
		cursorX = event.layerX;
		cursorY = event.layerY;
		draw();
	}

	function handleTouchMove(event: TouchEvent) {
		const touch = event.touches[0];
		if (!touch) return;

		const rect = canvas.getBoundingClientRect();
		cursorX = touch.clientX - rect.left;
		cursorY = touch.clientY - rect.top;
		draw();
	}

	onMount(() => {
		if (!browser) return;
		ctx = canvas.getContext('2d')!;
		// Give a tick for reactive updates
		setTimeout(() => {
			if (width > 0 && height > 0) {
				// console.log('Initial draw', { width, height, colors: resolvedColors.length });
				draw();
			}
		}, 0);
	});

	onDestroy(() => {
		// No animation loop to clean up
	});

	$effect(() => {
		if (width && height && canvas) {
			canvas.width = width;
			canvas.height = height;
			if (!ctx) ctx = canvas.getContext('2d')!;
			draw();
		}
	});
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	onmousemove={staticBanner ? undefined : handleMouseMove}
	ontouchmove={staticBanner ? undefined : handleTouchMove}
	ontouchstart={staticBanner ? undefined : handleTouchMove}
	onmouseleave={() => {
		if (!staticBanner) {
			cursorX = 0;
			cursorY = 0;
		}
	}}
	role="banner"
	class="relative h-full overflow-hidden {staticBanner ? '' : 'cursor-none'}"
>
	<canvas bind:this={canvas} {width} {height} class="absolute inset-0 h-full w-full"></canvas>

	{#if !staticBanner}
		<div
			class="custom-cursor"
			style="transform: translate3d({cursorX - CURSOR_SIZE / 2}px, {cursorY -
				CURSOR_SIZE / 2}px, 0)"
		>
			<Icon src={mousePointer} alt="cursor" size="md" />
		</div>
	{/if}
</div>

<style>
	.custom-cursor {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		will-change: transform;
	}

	:global(.cursor-icon) {
		color: #c4c4c4;
		fill: #f2f2f2;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
		@media (max-width: 768px) {
			display: none;
		}
	}
</style>
