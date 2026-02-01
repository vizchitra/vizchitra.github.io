<script lang="ts">
	import { run } from 'svelte/legacy';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import rough from 'roughjs';
	import MousePointer from '$lib/assets/images/MousePointer.svelte';
	import { getColorHex, colors } from '$lib/utils/colors';

	interface Props {
		staticBanner?: boolean;
		singleColor?: 'none' | 'yellow' | 'teal' | 'blue' | 'orange' | 'pink';
		fadeDirection?: 'none' | 'top' | 'bottom';
		fillStyle?: 'hachure' | 'cross-hatch' | 'zigzag' | 'dots' | 'dashed' | 'zigzag-line';
	}

	let {
		staticBanner = false,
		singleColor = 'none',
		fadeDirection = 'none',
		fillStyle = 'zigzag'
	}: Props = $props();

	const CURSOR_SIZE = 24;
	const MIN_CELL_SIZE = 30; // Minimum cell size
	const MAX_CELL_SIZE = 90; // Maximum cell size
	const HOVER_RADIUS = 200; // How far the mouse influence reaches

	let canvas: HTMLCanvasElement = $state();
	// We use rough.js canvas wrapper instead of raw context
	let rc: any;
	let ctx: CanvasRenderingContext2D;

	let width = $state(0);
	let height = $state(0);

	let cursorX = $state(-1000);
	let cursorY = $state(-1000);

	let animationFrameId: number;

	// Cache grid cells so we don't recalculate positions every frame
	let cells: {
		x: number;
		y: number;
		size: number;
		colorIndex: number;
		seed: number;
		isFilled: boolean;
	}[] = [];

	function initGrid() {
		if (!width || !height) return;

		cells = [];
		let x = 0;
		let y = 0;

		// Create a grid with random sized cells
		while (y < height) {
			x = 0;
			while (x < width) {
				const size = MIN_CELL_SIZE + Math.random() * (MAX_CELL_SIZE - MIN_CELL_SIZE);
				cells.push({
					x,
					y,
					size: Math.floor(size),
					colorIndex: Math.floor(Math.random() * 5),
					isFilled: Math.random() > 0.6, // 40% chance of being initially filled
					// Assign a random seed so the "roughness" shape doesn't jitter on every redraw
					seed: Math.floor(Math.random() * 10000)
				});
				x += size;
			}
			y += MIN_CELL_SIZE + Math.random() * (MAX_CELL_SIZE - MIN_CELL_SIZE);
		}
	}

	// Helper to get color based on mode
	const getColor = (index: number, isFill: boolean) => {
		if (singleColor !== 'none') {
			return getColorHex(singleColor);
		}
		// Multi-color look
		const colorNames = ['yellow', 'teal', 'blue', 'orange', 'pink'] as const;
		return getColorHex(colorNames[index % colorNames.length]);
	};

	function handleMouseMove(event: MouseEvent) {
		if (staticBanner) return;
		const { layerX, layerY } = event;
		cursorX = layerX;
		cursorY = layerY;
	}

	function handleTouchMove(event: TouchEvent) {
		if (staticBanner) return;
		const touch = event.touches[0];
		if (!touch) return;
		const rect = canvas.getBoundingClientRect();
		cursorX = touch.clientX - rect.left;
		cursorY = touch.clientY - rect.top;
	}

	function draw() {
		if (!ctx || !width || !height || !rc) return;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		cells.forEach((cell) => {
			// Calculate distance from cursor
			const centerX = cell.x + cell.size / 2;
			const centerY = cell.y + cell.size / 2;
			const dist = Math.hypot(centerX - cursorX, centerY - cursorY);

			// Determine "Energy" of the cell based on mouse proximity
			// If static, energy is 0 (or random if you want a static messy look)
			const energy = staticBanner ? 0 : Math.max(0, 1 - dist / HOVER_RADIUS);

			// --- Fade Logic (Global Opacity) ---
			let globalAlpha = 1;
			if (fadeDirection === 'bottom') {
				globalAlpha = 1 - centerY / height;
			} else if (fadeDirection === 'top') {
				globalAlpha = centerY / height;
			}
			// Keep a minimum visibility
			globalAlpha = Math.max(0.1, globalAlpha);

			// --- Drawing Logic ---

			const options: any = {
				seed: cell.seed, // Keep the shape consistent!
				strokeWidth: 1,
				roughness: 1.5
			};

			// Modified: Make initial squares reactive to mouse movement
			if (energy > 0.1 || (cell.isFilled && energy > 0.05)) {
				// ACTIVE STATE (Near Mouse) or initially filled that's getting energy
				// High energy = Dense cross-hatch fill
				options.fill = getColor(cell.colorIndex, true);
				options.stroke = getColor(cell.colorIndex, false);
				options.fillStyle = energy > 0.6 ? fillStyle : 'hachure';
				options.hachureGap = Math.max(2, 8 - energy * 4); // Closer mouse = tighter lines
				options.fillWeight = 1 + energy;

				// Jitter the box slightly based on energy for dynamic feel
				const jitter = energy * 4;
				const jX = (Math.random() - 0.5) * jitter;
				const jY = (Math.random() - 0.5) * jitter;

				// To animate the "roughness" (make it boil), we ignore the seed when active
				// delete options.seed;
				// ^ UNCOMMENT above line if you want the active cells to "vibrate" constantly

				// Apply global alpha for fade effect
				ctx.globalAlpha = globalAlpha;

				// Draw the filled box
				rc.rectangle(cell.x + jX, cell.y + jY, cell.size, cell.size, options);

				ctx.globalAlpha = 1; // Reset
			} else if (cell.isFilled) {
				// Static filled cells (when not near mouse or in static mode)
				options.fill = getColor(cell.colorIndex, true);
				options.stroke = getColor(cell.colorIndex, false);
				options.fillStyle = fillStyle;
				options.hachureGap = 6;
				options.fillWeight = 1;

				ctx.globalAlpha = globalAlpha * 0.7; // Make them slightly less prominent when not energized
				rc.rectangle(cell.x, cell.y, cell.size, cell.size, options);
				ctx.globalAlpha = 1; // Reset
			} else {
				// IDLE STATE
				// Just a faint colorful outline
				options.stroke = getColor(cell.colorIndex, false);
				options.strokeWidth = 0.5;
				options.roughness = 1.0;

				// Apply Fade
				// Rough.js doesn't support globalAlpha easily on individual shapes in the same batch,
				// so we manipulate the stroke color alpha if needed, or just rely on context.
				ctx.globalAlpha = globalAlpha * 0.3; // Make idle cells faint
				rc.rectangle(cell.x, cell.y, cell.size, cell.size, options);
				ctx.globalAlpha = 1; // Reset
			}
		});

		if (!staticBanner) {
			animationFrameId = requestAnimationFrame(draw);
		}
	}

	onMount(() => {
		if (!browser) return;

		ctx = canvas.getContext('2d')!;
		// Initialize Rough.js
		rc = rough.canvas(canvas);

		initGrid();

		draw();
	});

	onDestroy(() => {
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});

	// Reactive block to handle resize
	run(() => {
		if (width && height && canvas) {
			canvas.width = width;
			canvas.height = height;
			initGrid(); // Re-calculate grid if window resizes
			if (staticBanner && rc) {
				// If static, we need to manually trigger a redraw on resize
				// slightly delayed to ensure colors are ready
				setTimeout(draw, 0);
			}
		}
	});
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	onmousemove={staticBanner ? undefined : handleMouseMove}
	ontouchmove={staticBanner ? undefined : handleTouchMove}
	ontouchstart={staticBanner ? undefined : handleTouchMove}
	role="banner"
	class="relative h-full overflow-hidden {staticBanner ? '' : 'cursor-none'}"
>
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>

	{#if !staticBanner}
		<div
			class="custom-cursor"
			style="transform: translate3d({cursorX - CURSOR_SIZE / 2}px, {cursorY -
				CURSOR_SIZE / 2}px, 0)"
		>
			<MousePointer size={CURSOR_SIZE} />
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
		z-index: 10;
	}

	.relative {
		/* Ensure background behind canvas is suitable for the blend */
		background-color: transparent;
	}
</style>
