<script lang="ts">
	import { scaleLinear, Delaunay } from 'd3';
	import { MousePointer2 } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import PartySocket from 'partysocket';

	// Types
	type Point = {
		a: number;
		b: number;
	};

	type RenderedPoint = {
		x: number;
		y: number;
	};

	// Constants
	const POINT_COUNT = 160;
	const CURSOR_SIZE = 24;
	const colors = [
		'#FF9EAA', // pink
		'#87CEEB', // light blue
		'#98FB98', // light green
		'#FFD700', // yellow
		'#FFA07A' // light salmon
	];

	let width: number;
	let height: number;
	let voronoi: any;
	let cursorX = 0;
	let cursorY = 0;
	let socket: PartySocket;
	let otherCursors: { [key: string]: { x: number; y: number } } = {};

	// Generate static random background points
	const staticPoints: Point[] = Array.from({ length: POINT_COUNT }).map(() => ({
		a: Math.random(),
		b: Math.random()
	}));

	// Current data points (will include cursors + static points)
	let data: Point[] = [...staticPoints];

	const getColor = (index: number) => colors[index % colors.length];

	onMount(() => {
		socket = new PartySocket({
			host: 'localhost:1999', // Change this in production
			room: 'banner'
		});

		socket.addEventListener('message', (event) => {
			const msg = JSON.parse(event.data);

			switch (msg.type) {
				case 'sync':
					otherCursors = msg.cursors;
					break;
				case 'update':
					otherCursors = {
						...otherCursors,
						[msg.id]: { x: msg.x, y: msg.y }
					};
					break;
				case 'remove':
					const { [msg.id]: removed, ...rest } = otherCursors;
					otherCursors = rest;
					break;
			}

			// Update data points with cursor positions
			updateDataWithCursors();
		});
	});

	onDestroy(() => {
		if (socket) {
			socket.close();
		}
	});

	function updateDataWithCursors() {
		// Combine cursor points with static points
		data = [
			// Current cursor
			{ a: xScale.invert(cursorX), b: yScale.invert(cursorY) },
			// Other cursors
			...Object.values(otherCursors).map((cursor) => ({
				a: xScale.invert(cursor.x * width),
				b: yScale.invert(cursor.y * height)
			})),
			// Static background points
			...staticPoints
		];
	}

	function handleMouseMove(event: MouseEvent) {
		const { layerX, layerY } = event;
		cursorX = layerX;
		cursorY = layerY;

		// Send cursor position to server
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					x: layerX / width,
					y: layerY / height
				})
			);
		}

		updateDataWithCursors();
	}

	function findIntersections(cells: any[]) {
		const vertices = new Set();
		cells.forEach((cell) => {
			if (!cell) return;
			cell.forEach((point: number[]) => {
				const key = `${Math.round(point[0] * 100) / 100},${Math.round(point[1] * 100) / 100}`;
				vertices.add(key);
			});
		});

		return Array.from(vertices).map((v) => {
			const [x, y] = (v as string).split(',').map(Number);
			return { x, y };
		});
	}

	$: xScale = scaleLinear()
		.domain([0, 1])
		.range([50, width - 50]);

	$: yScale = scaleLinear()
		.domain([0, 1])
		.range([50, height - 50]);

	$: renderedData = data.map(
		(d: Point): RenderedPoint => ({
			x: xScale(d.a),
			y: yScale(d.b)
		})
	);

	$: if (width && height) {
		const delaunay = Delaunay.from(
			renderedData,
			(d: RenderedPoint) => d.x,
			(d: RenderedPoint) => d.y
		);
		voronoi = delaunay.voronoi([0, 0, width, height]);
	}
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	on:mousemove={handleMouseMove}
	role="banner"
	class="relative h-screen cursor-none"
>
	<svg viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
		{#if voronoi}
			<g>
				{#each renderedData as _, i}
					<path class="polygon" d={voronoi.renderCell(i)} style="stroke: {getColor(i)}" />
				{/each}
				{#each findIntersections([...voronoi.cellPolygons()]) as point}
					<circle class="node" cx={point.x} cy={point.y} r="3" />
				{/each}
			</g>
		{/if}
	</svg>

	<!-- Main cursor -->
	<div
		class="custom-cursor"
		style="transform: translate({cursorX - CURSOR_SIZE / 2}px, {cursorY - CURSOR_SIZE / 2}px)"
	>
		<MousePointer2 size={CURSOR_SIZE} class="cursor-icon" />
	</div>

	<!-- Other cursors -->
	{#each Object.entries(otherCursors) as [id, cursor]}
		<div
			class="custom-cursor"
			style="transform: translate({cursor.x * width - CURSOR_SIZE / 2}px, {cursor.y * height -
				CURSOR_SIZE / 2}px)"
		>
			<MousePointer2 size={CURSOR_SIZE} class="cursor-icon other" />
		</div>
	{/each}
</div>

<style>
	svg {
		width: 100%;
		height: 100%;
		display: block;
		-webkit-mask:
			linear-gradient(to right, transparent, white 20%, white 80%, transparent),
			linear-gradient(to bottom, transparent, white 20%, white 80%, transparent);
		mask:
			linear-gradient(to right, transparent, white 20%, white 80%, transparent),
			linear-gradient(to bottom, transparent, white 20%, white 80%, transparent);
		-webkit-mask-composite: intersect;
		mask-composite: intersect;
	}

	.node {
		fill: #333;
		stroke: #ffffff;
		stroke-width: 2;
	}

	.polygon {
		fill: none;
		stroke-width: 2;
		vector-effect: non-scaling-stroke;
	}

	.custom-cursor {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		will-change: transform;
	}

	:global(.cursor-icon) {
		color: white;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
	}

	:global(.cursor-icon.other) {
		color: #ff9eaa;
		opacity: 0.8;
	}

	.relative {
		cursor: none;
	}
</style>
