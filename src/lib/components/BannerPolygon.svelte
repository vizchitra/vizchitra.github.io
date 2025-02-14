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

	const POINT_COUNT = 100;
	const CURSOR_SIZE = 24;
	const CURSOR_TIMEOUT = 10000;
	const colors = [
		'#ee88b3', // pink
		'#a8bdf0', // light blue
		'#88e0d8', // light green
		'#ffd485', // yellow
		'#f89f72' // light salmon
	];

	const staticPoints: Point[] = Array.from({ length: POINT_COUNT }, () => ({
		x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
		y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
	}));

	let width = 0;
	let height = 0;
	let voronoi: any;
	let cursorX = 0;
	let cursorY = 0;
	let socket: PartySocket;
	let otherCursors: Record<string, CursorInfo> = {};
	let points: Point[] = [...staticPoints];
	let lastUpdate = 0;
	const UPDATE_INTERVAL = 32;

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

	onMount(() => {
		if (!browser) return;

		socket = new PartySocket({
			host: import.meta.env.VITE_PARTYKIT_HOST || 'vizchitra-cursors.genmon.partykit.dev',
			room: 'banner'
		});

		socket.addEventListener('message', (event) => {
			const msg = JSON.parse(event.data);
			console.log('Received message:', msg);

			switch (msg.type) {
				case 'sync':
					console.log('Sync cursors:', msg.cursors);
					otherCursors = msg.cursors;
					break;
				case 'update':
					console.log('Update cursor:', msg.id, msg.location);
					otherCursors = {
						...otherCursors,
						[msg.id]: {
							x: msg.x,
							y: msg.y,
							location: msg.location,
							lastActive: Date.now()
						}
					};
					break;
				case 'remove':
					const { [msg.id]: _, ...rest } = otherCursors;
					otherCursors = rest;
					break;
			}

			updateDataWithCursors();
		});
	});

	onDestroy(() => {
		socket?.close();
	});
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
				{#each points.slice(0, Object.keys(otherCursors).length + 1) as _, i}
					<path
						class="polygon cursor-polygon"
						d={voronoi.renderCell(i)}
						style="stroke: {getColor(i)}"
					/>
				{/each}
				{#each points.slice(Object.keys(otherCursors).length + 1) as _, i (i)}
					<path
						class="polygon static-polygon"
						d={voronoi.renderCell(i + Object.keys(otherCursors).length + 1)}
						style="stroke: {getColor(i)}"
					/>
				{/each}
				{#if Object.keys(otherCursors).length > 0}
					{#each findIntersections([...voronoi.cellPolygons()]) as point (point.x + ',' + point.y)}
						<circle class="node" cx={point.x} cy={point.y} r="3" />
					{/each}
				{/if}
			</g>
		{/if}
	</svg>

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
	svg {
		width: 100%;
		height: 100%;
		display: block;
		-webkit-mask:
			linear-gradient(to right, transparent, white 10%, white 90%, transparent),
			linear-gradient(to bottom, transparent, white 10%, white 90%, transparent);
		mask:
			linear-gradient(to right, transparent, white 10%, white 90%, transparent),
			linear-gradient(to bottom, transparent, white 10%, white 90%, transparent);
		-webkit-mask-composite: intersect;
		mask-composite: intersect;
	}

	.node {
		fill: #5f5f5f;
		stroke: #ffffff;
		stroke-width: 2;
	}

	.polygon {
		fill: none;
		stroke-width: 3;
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
		color: #c4c4c4;
		fill: #f2f2f2;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
	}

	:global(.cursor-icon.other) {
		color: #f3f3f3;
		stroke: #2f2f2f33;
		opacity: 0.8;
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

	.cursor-polygon {
		opacity: 0.8;
	}

	.static-polygon {
		opacity: 0.4;
	}
</style>
