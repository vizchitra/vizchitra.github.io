<script module lang="ts">
	import type { Color } from '$lib/tokens';
	import { getColorHex, colors } from '$lib/tokens';

	// Explicit five main brand colors (module-level, SSR-safe)
	export const BRAND_COLORS: Color[] = ['yellow', 'teal', 'pink', 'blue', 'orange'];
	export const BRAND_HEX: string[] = BRAND_COLORS.map((c) => getColorHex(c));
</script>

<script lang="ts">
	import { Delaunay } from 'd3';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import MousePointer from '$lib/assets/images/MousePointer.svelte';

	interface Props {
		interactive?: boolean;
	}

	let { interactive = false }: Props = $props();

	interface Point {
		x: number;
		y: number;
	}

	function getPointCount() {
		// Legacy fixed counts caused overly large polygons on very large canvases.
		// Scale point count by canvas area while keeping sensible bounds.
		const minPoints = interactive ? 50 : 150;
		const maxPoints = interactive ? 200 : 600;

		if (!width || !height) return minPoints;

		// area per point (px^2) — adjust to tune density
		const areaPerPoint = 5000;
		const calculated = Math.floor((width * height) / areaPerPoint);
		return Math.max(minPoints, Math.min(maxPoints, calculated));
	}

	const CURSOR_SIZE = 24;
	const UPDATE_INTERVAL = 16;

	// Use module-level BRAND_HEX for drawing

	let staticPoints: Point[] = $state([]);

	let canvas: HTMLCanvasElement = $state();
	let ctx: CanvasRenderingContext2D;
	let width = $state(0);
	let height = $state(0);
	let voronoi: any;
	let cursorX = $state(0);
	let cursorY = $state(0);
	let showCursor = $state(false);
	let points: Point[] = [];
	let lastUpdate = 0;
	let animationFrameId: number;

	const getColor = (index: number) => BRAND_HEX[index % BRAND_HEX.length] ?? '#000000';

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

	function handlePointerMove(event: PointerEvent) {
		if (event.buttons && event.pointerType === 'mouse') return;

		// Use client coordinates relative to canvas for consistency
		if (canvas) {
			const rect = canvas.getBoundingClientRect();
			cursorX = event.clientX - rect.left;
			cursorY = event.clientY - rect.top;
		} else {
			cursorX = event.clientX;
			cursorY = event.clientY;
		}

		showCursor = true;

		// Trigger an immediate (throttled) data update so the polygon reacts quickly
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

				ctx.beginPath();
				ctx.moveTo(cell[0][0], cell[0][1]);
				for (let j = 1; j < cell.length; j++) {
					ctx.lineTo(cell[j][0], cell[j][1]);
				}
				ctx.closePath();
				ctx.strokeStyle = getColor(i);
				ctx.globalAlpha = 0.8;
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
				ctx.globalAlpha = 0.8;
				ctx.beginPath();
				ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
				ctx.fillStyle = getColorHex('grey');
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

		// Start animation loop (no networking)

		draw();
	});

	onDestroy(() => {
		// no networking to close
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});

	$effect(() => {
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
	onpointermove={!interactive ? undefined : handlePointerMove}
	onpointerenter={() => (showCursor = true)}
	onpointerleave={() => {
		showCursor = false;
		cursorX = 0;
		cursorY = 0;
	}}
	role="banner"
	class="relative h-full overflow-hidden {!interactive ? '' : 'cursor-none'}"
>
	<canvas bind:this={canvas} {width} {height} class="absolute inset-0 h-full w-full"></canvas>

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
