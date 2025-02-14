<script lang="ts">
	import { scaleLinear, Delaunay } from 'd3';
	import { MousePointer2 } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import PartySocket from 'partysocket';
	import { browser } from '$app/environment';

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

	const POINT_COUNT = 160;
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

	const getColor = (index: number) => colors[index % colors.length];

	const getFlagEmoji = (countryCode: string | null): string | null => {
		if (!countryCode) return null;
		return String.fromCodePoint(
			...countryCode
				.toUpperCase()
				.split('')
				.map((char) => 127397 + char.charCodeAt(0))
		);
	};

	function getLocationLabel(location: LocationInfo): string {
		if (!location?.country) return '';
		// For India, show region only
		if (location.country === 'IN') {
			return location.region?.split(' ')[0] || '';
		}
		// For others, prefer city, fallback to first word of region
		return location.city || location.region?.split(' ')[0] || '';
	}

	const isCursorActive = (cursor: CursorInfo): boolean =>
		!!cursor.lastActive && Date.now() - cursor.lastActive < CURSOR_TIMEOUT;

	function updateDataWithCursors() {
		if (!width || !height || !browser) return;

		points = [
			{ x: cursorX, y: cursorY },
			...Object.values(otherCursors).map((cursor) => ({
				x: cursor.x * width,
				y: cursor.y * height
			})),
			...staticPoints
		];

		const delaunay = Delaunay.from(
			points,
			(d) => d.x,
			(d) => d.y
		);
		voronoi = delaunay.voronoi([0, 0, width, height]);
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
		const vertices = new Map<string, { x: number; y: number }>();

		for (const cell of cells) {
			if (!cell) continue;

			for (const point of cell) {
				const x = Math.round(point[0] * 10) / 10;
				const y = Math.round(point[1] * 10) / 10;
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

			switch (msg.type) {
				case 'sync':
					otherCursors = msg.cursors;
					break;
				case 'update':
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
		if (socket) cancelAnimationFrame(socket);
	});

	$: xScale = scaleLinear()
		.domain([0, 1])
		.range([50, width - 50]);
	$: yScale = scaleLinear()
		.domain([0, 1])
		.range([50, height - 50]);
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
				{#each findIntersections([...voronoi.cellPolygons()]) as point (point.x + ',' + point.y)}
					<circle class="node" cx={point.x} cy={point.y} r="3" />
				{/each}
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
					{#if cursor.location.country}
						<span class="flag">{getFlagEmoji(cursor.location.country)}</span>
					{/if}
					<span class="location">{getLocationLabel(cursor.location)}</span>
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
		opacity: 0.8;
	}

	.cursor-info {
		position: absolute;
		left: 16px;
		top: 0;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		background: rgba(0, 0, 0, 0.8);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		color: white;
		font-size: 0.75rem;
		white-space: nowrap;
		transform: translateY(-50%);
		opacity: 0;
		transition: opacity 0.2s ease-out;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(4px);
	}

	.cursor-info.active {
		opacity: 1;
	}

	.flag {
		font-size: 0.875rem;
	}

	.location {
		opacity: 0.9;
		font-weight: 500;
		font-size: 0.7rem;
		text-transform: capitalize;
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
