<script lang="ts">
	import { run } from 'svelte/legacy';

	import { Delaunay } from 'd3';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import MousePointer from '$lib/assets/images/MousePointer.svelte';

	interface Props {
		staticBanner?: boolean;
		fadeDirection?: 'none' | 'top' | 'bottom';
	}

	let { staticBanner = false, fadeDirection = 'none' }: Props = $props();

	interface Point {
		x: number;
		y: number;
	}

	function getPointCount() {
		return staticBanner ? 50 : 150;
	}

	const CURSOR_SIZE = 24;
	const UPDATE_INTERVAL = 16;

	// CSS variable names for the 5 main colors
	const colorVarNames = [
		'--viz-color-yellow',
		'--viz-color-teal',
		'--viz-color-blue',
		'--viz-color-orange',
		'--viz-color-pink'
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

	let staticPoints: Point[] = $state([]);

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;
	let width = $state(0);
	let height = $state(0);
	let voronoi: any;
	let cursorX = $state(0);
	let cursorY = $state(0);
	let points: Point[] = [];
	let lastUpdate = 0;
	let animationFrameId: number;

	const getColor = (index: number) => resolvedColors[index % resolvedColors.length] || '#000000';

	function updateDataWithCursors() {
		if (!width || !height || !browser) return;

		const now = Date.now();
		if (now - lastUpdate < UPDATE_INTERVAL) return;
		lastUpdate = now;

		points = [{ x: cursorX, y: cursorY }, ...staticPoints];

		try {
			const delaunay = Delaunay.from(
				points,
				(d: Point) => d.x,
				(d: Point) => d.y
			);
			voronoi = delaunay.voronoi([0, 0, width, height]);
		} catch (e) {
			console.error('Voronoi calculation failed:', e);
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (event.buttons) return;

		const { layerX, layerY } = event;
		cursorX = layerX;
		cursorY = layerY;
		updateDataWithCursors();
	}

	function handleTouchMove(event: TouchEvent) {
		const touch = event.touches[0];
		if (!touch) return;

		const rect = canvas.getBoundingClientRect();
		const x = touch.clientX - rect.left;
		const y = touch.clientY - rect.top;

		cursorX = x;
		cursorY = y;
		updateDataWithCursors();
	}

	function findIntersections(cells: any[]) {
		const cursorCells = cells.slice(0, 1);
		const vertices = new Map<string, { x: number; y: number }>();

		for (const cell of cursorCells) {
			if (!cell) continue;

			for (const point of cell) {
				const x = Math.round(point[0]);
				const y = Math.round(point[1]);
				const key = `${x},${y}`;

				if (!vertices.has(key)) {
					vertices.set(key, { x, y });
				}
			}
		}

		return Array.from(vertices.values());
	}

	function draw() {
		if (!ctx || !width || !height) return;

		ctx.clearRect(0, 0, width, height);

		updateDataWithCursors();

		if (voronoi) {
			for (let i = 1; i < points.length; i++) {
				const cell = voronoi.cellPolygon(i);
				if (!cell) continue;

				// Calculate opacity based on fade direction and cell center position
				const centerY = cell.reduce((sum: number, p: number[]) => sum + p[1], 0) / cell.length;
				let alpha = 0.8;
				if (fadeDirection === 'bottom') {
					// Fade out toward bottom
					alpha = 0.8 * (1 - centerY / height);
				} else if (fadeDirection === 'top') {
					// Fade out toward top
					alpha = 0.8 * (centerY / height);
				}

				ctx.beginPath();
				ctx.moveTo(cell[0][0], cell[0][1]);
				for (let j = 1; j < cell.length; j++) {
					ctx.lineTo(cell[j][0], cell[j][1]);
				}
				ctx.closePath();
				ctx.strokeStyle = getColor(i);
				ctx.globalAlpha = Math.max(0.05, alpha);
				ctx.lineWidth = 2;
				ctx.stroke();
			}

			const cursorCell = voronoi.cellPolygon(0);
			if (cursorCell) {
				ctx.beginPath();
				ctx.moveTo(cursorCell[0][0], cursorCell[0][1]);
				for (let j = 1; j < cursorCell.length; j++) {
					ctx.lineTo(cursorCell[j][0], cursorCell[j][1]);
				}
				ctx.closePath();
				ctx.strokeStyle = getColor(0);
				ctx.globalAlpha = 0.9;
				ctx.lineWidth = 3;
				ctx.stroke();
			}

			const intersections = findIntersections([...voronoi.cellPolygons()]);
			intersections.forEach((point) => {
				// Calculate opacity based on fade direction
				let alpha = 1;
				if (fadeDirection === 'bottom') {
					alpha = 1 - point.y / height;
				} else if (fadeDirection === 'top') {
					alpha = point.y / height;
				}
				ctx.globalAlpha = Math.max(0.05, alpha);
				ctx.beginPath();
				ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
				ctx.fillStyle = '#5f5f5f';
				ctx.strokeStyle = '#ffffff';
				ctx.lineWidth = 2;
				ctx.fill();
				ctx.stroke();
			});
		}

		animationFrameId = requestAnimationFrame(draw);
	}

	onMount(() => {
		if (!browser) return;

		ctx = canvas.getContext('2d')!;
		getComputedColors();

		// Start animation loop (no networking)

		draw();
	});

	onDestroy(() => {
		// no networking to close
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});

	run(() => {
		if (width && height && canvas) {
			canvas.width = width;
			canvas.height = height;

			// Initialize staticPoints on the client once dimensions are available.
			const needed = getPointCount();
			if (!staticPoints || staticPoints.length !== needed) {
				staticPoints = Array.from({ length: needed }, () => ({
					x: Math.random() * width,
					y: Math.random() * height
				}));
			}

			updateDataWithCursors();
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
	<canvas bind:this={canvas} {width} {height} class="absolute inset-0 h-full w-full"></canvas>

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
	}

	:global(.cursor-icon) {
		color: #c4c4c4;
		fill: #f2f2f2;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
		@media (max-width: 768px) {
			display: none;
		}
	}

	.relative {
		cursor: none;
	}

	@media (max-width: 768px) {
	}
</style>
