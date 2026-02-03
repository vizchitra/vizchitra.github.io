<script module lang="ts">
	import type { Color } from '$lib/utils/colors';
	// Default palette for blob banner
	export const DEFAULT_BLOB_COLORS: Color[] = ['yellow', 'teal', 'blue', 'orange', 'pink'];
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import rough from 'roughjs';
	import MousePointer from '$lib/assets/images/MousePointer.svelte';
	import { getColorHex, isValidColor } from '$lib/utils/colors';

	interface Props {
		interactive?: boolean;
		color?: 'all' | 'yellow' | 'teal' | 'blue' | 'orange' | 'pink';
		fillStyle?: 'hachure' | 'cross-hatch' | 'sunburst' | 'dots';
	}

	let { interactive = false, color = 'all', fillStyle = 'sunburst' }: Props = $props();

	const CURSOR_SIZE = 24;
	const MIN_RADIUS = 20; // Minimum circle radius
	const MAX_RADIUS = 60; // Maximum circle radius
	const HOVER_RADIUS = 150; // How far the mouse influence reaches
	const PHYSICS_DAMPING = 0.95; // How quickly movement dampens
	const REPULSION_FORCE = 0.3; // How strong the repulsion from mouse is

	// Resolved hex colors used for drawing; supports `singleColor` for SSR.
	let resolvedColors: string[] = DEFAULT_BLOB_COLORS.map((c) => getColorHex(c));

	$effect(() => {
		if (color && color !== 'all' && isValidColor(color)) {
			const hex = getColorHex(color as Color);
			resolvedColors = DEFAULT_BLOB_COLORS.map(() => hex);
		} else {
			resolvedColors = DEFAULT_BLOB_COLORS.map((c) => getColorHex(c));
		}
	});

	let canvas: HTMLCanvasElement = $state();
	let rc: any;
	let ctx: CanvasRenderingContext2D;

	let width = $state(0);
	let height = $state(0);

	let cursorX = $state(-1000);
	let cursorY = $state(-1000);
	let prevCursorX = $state(-1000);
	let prevCursorY = $state(-1000);
	let showCursor = $state(false);

	let animationFrameId: number;

	// Circle structure with physics
	let circles: {
		x: number;
		y: number;
		baseX: number; // Original position
		baseY: number;
		vx: number; // Velocity X
		vy: number; // Velocity Y
		radius: number;
		colorIndex: number;
		seed: number;
		roughness: number;
		isFilled: boolean;
		fillPattern: string; // Individual fill pattern for each circle
	}[] = [];

	function initCircles() {
		if (!width || !height) return;

		circles = [];
		// More circles for richer interactive display
		const numCircles = Math.floor((width * height) / 8000);

		for (let i = 0; i < numCircles; i++) {
			const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
			const x = radius + Math.random() * (width - 2 * radius);
			const y = radius + Math.random() * (height - 2 * radius);

			// Assign random fill patterns for visual variety
			const patterns = ['hachure', 'cross-hatch', 'sunburst', 'dots'];
			const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

			circles.push({
				x,
				y,
				baseX: x,
				baseY: y,
				vx: 0,
				vy: 0,
				radius,
				colorIndex: Math.floor(Math.random() * 5),
				isFilled: Math.random() > 0.4, // 60% chance of being initially filled
				seed: Math.floor(Math.random() * 10000),
				roughness: 0.8 + Math.random() * 2.0, // Variable roughness for blob effect
				fillPattern: randomPattern
			});
		}
	}

	// Helper to get resolved hex color for an index
	const getColor = (index: number) =>
		resolvedColors[index % resolvedColors.length] ?? getColorHex('grey');

	function handleMouseMove(event: MouseEvent) {
		if (!interactive) return;
		const { layerX, layerY } = event;
		prevCursorX = cursorX;
		prevCursorY = cursorY;
		cursorX = layerX;
		cursorY = layerY;
		showCursor = true;
	}

	function handleTouchMove(event: TouchEvent) {
		if (!interactive) return;
		const touch = event.touches[0];
		if (!touch) return;
		const rect = canvas.getBoundingClientRect();
		prevCursorX = cursorX;
		prevCursorY = cursorY;
		cursorX = touch.clientX - rect.left;
		cursorY = touch.clientY - rect.top;
		showCursor = true;
	}

	function updatePhysics() {
		if (!interactive) return;

		// Process ALL circles for physics but with simpler math
		for (let i = 0; i < circles.length; i++) {
			const circle = circles[i];

			// Fast distance check
			const dx = circle.x - cursorX;
			const dy = circle.y - cursorY;
			const distSquared = dx * dx + dy * dy;
			const hoverRadiusSquared = HOVER_RADIUS * HOVER_RADIUS;

			if (distSquared < hoverRadiusSquared && distSquared > 1) {
				// Simple repulsion - push away from cursor
				const dist = Math.sqrt(distSquared);
				const force = ((HOVER_RADIUS - dist) / HOVER_RADIUS) * REPULSION_FORCE;

				circle.vx += (dx / dist) * force;
				circle.vy += (dy / dist) * force;
			}

			// Apply velocity and damping in one step
			circle.x += circle.vx;
			circle.y += circle.vy;
			circle.vx *= PHYSICS_DAMPING;
			circle.vy *= PHYSICS_DAMPING;

			// Return to base position
			circle.vx += (circle.baseX - circle.x) * 0.02;
			circle.vy += (circle.baseY - circle.y) * 0.02;

			// Bounds check
			if (circle.x < circle.radius) circle.x = circle.radius;
			if (circle.x > width - circle.radius) circle.x = width - circle.radius;
			if (circle.y < circle.radius) circle.y = circle.radius;
			if (circle.y > height - circle.radius) circle.y = height - circle.radius;
		}
	}

	function draw() {
		if (!ctx || !width || !height || !rc) return;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		updatePhysics();

		circles.forEach((circle) => {
			// Calculate distance from cursor
			const dx = circle.x - cursorX;
			const dy = circle.y - cursorY;
			const dist = Math.hypot(dx, dy);

			// Static mode: calculate energy based on mouse proximity
			// Interactive mode: energy is always 0 (physics handles movement)
			const energy = !interactive ? Math.max(0, 1 - dist / HOVER_RADIUS) : 0;

			// Fixed opacity for all circles
			const globalAlpha = 0.8;
			const options: any = {
				seed: circle.seed,
				strokeWidth: 1,
				roughness: 1.5 // Fixed roughness for performance
			};

			ctx.globalAlpha = globalAlpha;

			if (energy > 0.1 || circle.isFilled) {
				// ACTIVE STATE or initially filled
				options.fill = getColor(circle.colorIndex);
				options.stroke = getColor(circle.colorIndex);

				// Use the circle's individual fill pattern
				options.fillStyle = circle.fillPattern;

				// Fixed gap for performance
				options.hachureGap = 6;
				options.fillWeight = 1;

				rc.circle(circle.x, circle.y, circle.radius * 2, options);
			} else {
				// IDLE STATE - faint outline
				options.stroke = getColor(circle.colorIndex);
				options.strokeWidth = 0.5;
				options.roughness = circle.roughness;

				ctx.globalAlpha = globalAlpha * 0.4;
				rc.circle(circle.x, circle.y, circle.radius * 2, options);
			}

			ctx.globalAlpha = 1; // Reset
		});

		// Removed circle spawning - just physics now

		if (interactive) {
			animationFrameId = requestAnimationFrame(draw);
		}
	}

	// Start/stop animation loop when `interactive` changes
	$effect(() => {
		if (interactive) {
			if (!animationFrameId) {
				// kick off the draw loop
				draw();
			}
		} else {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = 0;
			}
		}
	});

	onMount(() => {
		if (!browser) return;

		ctx = canvas.getContext('2d')!;
		rc = rough.canvas(canvas);

		initCircles();

		// Initial draw (static mode) or start loop via $effect when interactive
		draw();
	});

	onDestroy(() => {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = 0;
		}
	});

	// Reactive block to handle resize
	$effect(() => {
		if (width && height && canvas) {
			canvas.width = width;
			canvas.height = height;
			initCircles();
			if (rc) {
				// Call draw for both static and interactive modes
				// Interactive mode will start animation loop, static draws once
				setTimeout(draw, 0);
			}
		}
	});
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	onmousemove={!interactive ? undefined : handleMouseMove}
	ontouchmove={!interactive ? undefined : handleTouchMove}
	ontouchstart={!interactive ? undefined : handleTouchMove}
	onmouseenter={() => (showCursor = true)}
	onmouseleave={() => {
		showCursor = false;
		cursorX = -1000;
		cursorY = -1000;
	}}
	ontouchend={() => {
		showCursor = false;
		cursorX = -1000;
		cursorY = -1000;
	}}
	ontouchcancel={() => {
		showCursor = false;
		cursorX = -1000;
		cursorY = -1000;
	}}
	role="banner"
	class="relative h-full overflow-hidden {!interactive ? '' : 'cursor-none'}"
>
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>

	<div
		class="custom-cursor"
		style="display: {showCursor ? 'block' : 'none'}; transform: translate3d({cursorX -
			CURSOR_SIZE / 2}px, {cursorY - CURSOR_SIZE / 2}px, 0)"
	>
		<MousePointer size={CURSOR_SIZE} />
	</div>
</div>

<style>
	.custom-cursor {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		will-change: transform;
		z-index: 10;
	}

	.relative {
		background-color: transparent;
	}
</style>
