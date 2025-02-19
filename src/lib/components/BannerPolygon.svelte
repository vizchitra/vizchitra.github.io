<script lang="ts">
	import { scaleLinear, Delaunay } from 'd3';
	import { MousePointer2 } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import PartySocket from 'partysocket';
	import { browser } from '$app/environment';
	import { getFlagEmoji, getLocationLabel } from '$lib/utils/utils';

	interface Point {
		x: number;
		y: number;
	}

	interface LocationInfo {
		country: string | null;
		region: string | null;
		city: string | null;
	}

	interface CursorInfo {
		x: number;
		y: number;
		location: LocationInfo;
		lastActive?: number;
	}

	const POINT_COUNT = 150;

	const CURSOR_SIZE = 24;
	const CURSOR_TIMEOUT = 10000;
	const UPDATE_INTERVAL = 16;

	const colors = ['#ffd485', '#97e4dd', '#a8bdf0', '#f89f72', '#ee88b3'];

	const staticPoints: Point[] = Array.from({ length: POINT_COUNT }, () => ({
		x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
		y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
	}));

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let width = 0;
	let height = 0;
	let voronoi: any;
	let cursorX = 0;
	let cursorY = 0;
	let socket: PartySocket;
	let otherCursors: Record<string, CursorInfo> = {};
	let points: Point[] = [...staticPoints];
	let lastUpdate = 0;
	let animationFrameId: number;

	const getColor = (index: number) => colors[index % colors.length];

	const isCursorActive = (cursor: CursorInfo): boolean =>
		!!cursor.lastActive && Date.now() - cursor.lastActive < CURSOR_TIMEOUT;

	function updateDataWithCursors() {
		if (!width || !height || !browser) return;

		const now = Date.now();
		if (now - lastUpdate < UPDATE_INTERVAL) return;
		lastUpdate = now;

		points = [
			{ x: cursorX, y: cursorY },
			...Object.values(otherCursors).map((cursor) => ({
				x: cursor.x * width,
				y: cursor.y * height
			})),
			...staticPoints
		];

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
		// Only handle mouse moves if not scrolling/dragging
		if (event.buttons) return; // Skip if any mouse button is pressed

		const { layerX, layerY } = event;
		cursorX = layerX;
		cursorY = layerY;

		if (socket?.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					x: layerX / width,
					y: layerY / height
				})
			);
		}

		updateDataWithCursors();
	}

	function handleTouchMove(event: TouchEvent) {
		// Don't prevent default behavior anymore to allow scrolling
		const touch = event.touches[0];
		if (!touch) return;

		const rect = canvas.getBoundingClientRect();
		const x = touch.clientX - rect.left;
		const y = touch.clientY - rect.top;

		cursorX = x;
		cursorY = y;

		if (socket?.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					x: x / width,
					y: y / height
				})
			);
		}

		updateDataWithCursors();
	}

	function findIntersections(cells: any[]) {
		const cursorCells = cells.slice(0, Object.keys(otherCursors).length + 1);
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

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Update data if needed
		updateDataWithCursors();

		// Draw Voronoi cells
		if (voronoi) {
			// Draw static polygons first (background)
			for (let i = Object.keys(otherCursors).length + 1; i < points.length; i++) {
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

			// Draw cursor polygons (foreground)
			for (let i = 0; i <= Object.keys(otherCursors).length; i++) {
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
				ctx.lineWidth = 3;
				ctx.stroke();
			}

			// Draw intersection points
			const intersections = findIntersections([...voronoi.cellPolygons()]);
			ctx.globalAlpha = 1;
			intersections.forEach((point) => {
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

		socket = new PartySocket({
			host: import.meta.env.VITE_PARTYKIT_HOST || 'vizchitra-cursors.genmon.partykit.dev',
			room: 'banner'
		});

		socket.addEventListener('message', (event) => {
			const msg = JSON.parse(event.data);

			switch (msg.type) {
				case 'sync':
					// Filter out any cursors without positions
					otherCursors = Object.fromEntries(
						Object.entries(msg.cursors).filter(
							([_, cursor]) => cursor.x !== undefined && cursor.y !== undefined
						)
					);
					break;
				case 'update':
					if (msg.x !== undefined && msg.y !== undefined) {
						otherCursors = {
							...otherCursors,
							[msg.id]: {
								x: msg.x,
								y: msg.y,
								location: msg.location,
								lastActive: Date.now()
							}
						};
					}
					break;
				case 'remove':
					const { [msg.id]: _, ...rest } = otherCursors;
					otherCursors = rest;
					break;
			}

			updateDataWithCursors();
		});

		// Start animation loop
		draw();
	});

	onDestroy(() => {
		socket?.close();
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	});

	$: if (width && height && canvas) {
		// Handle resize
		canvas.width = width;
		canvas.height = height;
		// Update static points positions
		staticPoints.forEach((point) => {
			point.x = Math.random() * width;
			point.y = Math.random() * height;
		});
		updateDataWithCursors();
	}
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	on:mousemove={handleMouseMove}
	on:touchmove={handleTouchMove}
	on:touchstart={handleTouchMove}
	role="banner"
	class="relative h-full cursor-none"
>
	<canvas bind:this={canvas} {width} {height} class="absolute inset-0 h-full w-full" />

	<!-- Main cursor -->
	<div
		class="custom-cursor"
		style="transform: translate3d({cursorX - CURSOR_SIZE / 2}px, {cursorY - CURSOR_SIZE / 2}px, 0)"
	>
		<MousePointer2 size={CURSOR_SIZE} class="cursor-icon" />
	</div>

	<!-- Other cursors -->
	{#each Object.entries(otherCursors) as [id, cursor]}
		<div
			class="custom-cursor"
			style="transform: translate3d({cursor.x * width - CURSOR_SIZE / 2}px, {cursor.y * height -
				CURSOR_SIZE / 2}px, 0)"
		>
			<MousePointer2 size={CURSOR_SIZE / 1.5} class="cursor-icon other" />
			{#if isCursorActive(cursor) && cursor.location}
				<div class="cursor-info" class:active={isCursorActive(cursor)}>
					{#if cursor.location?.country}
						<span class="flag">{getFlagEmoji(cursor.location.country)}</span>
					{/if}
					<span class="location text-[10px]">{getLocationLabel(cursor.location)}</span>
				</div>
			{/if}
		</div>
	{/each}
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

	.cursor-info {
		position: absolute;
		left: 16px;
		top: 0;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		background: rgba(255, 255, 255, 0.1);
		padding: 0.05rem 0.25rem;
		border-radius: 4px;
		color: rgb(33, 33, 33);
		white-space: nowrap;
		transform: translateY(-50%);
		opacity: 0;
		font-family: monospace;
		transition: opacity 0.2s ease-out;
		backdrop-filter: blur(8px);
		border: 1px solid #2f2f2f33;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.cursor-info.active {
		opacity: 1;
	}

	.flag {
		font-size: 0.875rem;
		filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
	}

	.location {
		opacity: 0.95;
		font-weight: 400;
		font-size: 0.6rem;
		text-transform: capitalize;
		letter-spacing: 0.02em;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}

	.relative {
		cursor: none;
	}

	@media (max-width: 768px) {
		.cursor-info {
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			background: rgba(255, 255, 255, 0.8);
			padding: 0.15rem 0.35rem;
			border-radius: 20px;
		}

		.flag {
			font-size: 0.875rem;
		}

		.location {
			font-size: 0.7rem;
			font-weight: 500;
		}
	}
</style>
