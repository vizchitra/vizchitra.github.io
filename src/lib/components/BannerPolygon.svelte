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

	type LocationInfo = {
		country: string | null;
		region: string | null;
		city: string | null;
	};

	type CursorInfo = {
		x: number;
		y: number;
		location: LocationInfo;
		lastActive?: number;
	};

	// Constants
	const POINT_COUNT = 160;
	const CURSOR_SIZE = 24;
	const CURSOR_TIMEOUT = 10000; // 10 seconds
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
	let otherCursors: { [key: string]: CursorInfo } = {};

	// Generate static random background points
	const staticPoints: Point[] = Array.from({ length: POINT_COUNT }).map(() => ({
		a: Math.random(),
		b: Math.random()
	}));

	// Current data points (will include cursors + static points)
	let data: Point[] = [...staticPoints];

	const getColor = (index: number) => colors[index % colors.length];

	function getFlagEmoji(countryCode: string | null): string {
		if (!countryCode) return '🌐';
		const codePoints = countryCode
			.toUpperCase()
			.split('')
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}

	function getLocationLabel(location: LocationInfo): string {
		if (!location.country) return '';
		if (location.country === 'IN') {
			return location.region || location.city || '';
		}
		return location.city || location.region || location.country;
	}

	function isCursorActive(cursor: CursorInfo): boolean {
		return cursor.lastActive ? Date.now() - cursor.lastActive < CURSOR_TIMEOUT : false;
	}

	let updateTimeout: ReturnType<typeof setTimeout>;

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
						[msg.id]: {
							x: msg.x,
							y: msg.y,
							location: msg.location,
							lastActive: Date.now()
						}
					};
					break;
				case 'remove':
					const { [msg.id]: removed, ...rest } = otherCursors;
					otherCursors = rest;
					break;
			}

			// Debounce the data update
			clearTimeout(updateTimeout);
			updateTimeout = setTimeout(updateDataWithCursors, 16); // ~60fps
		});
	});

	onDestroy(() => {
		if (socket) {
			socket.close();
		}
		clearTimeout(updateTimeout);
	});

	function updateDataWithCursors() {
		data = [
			{ a: xScale.invert(cursorX), b: yScale.invert(cursorY) },
			...Object.values(otherCursors).map((cursor) => ({
				a: xScale.invert(cursor.x * width),
				b: yScale.invert(cursor.y * height)
			})),
			...staticPoints
		];
	}

	let moveTimeout: ReturnType<typeof setTimeout>;

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

		// Debounce the data update
		clearTimeout(moveTimeout);
		moveTimeout = setTimeout(updateDataWithCursors, 16); // ~60fps
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
			<MousePointer2 size={CURSOR_SIZE} class="cursor-icon other" />
			{#if isCursorActive(cursor)}
				<div class="cursor-info" class:active={isCursorActive(cursor)}>
					<span class="flag">{getFlagEmoji(cursor.location.country)}</span>
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

	.cursor-info {
		position: absolute;
		left: 24px;
		top: 0;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		background: rgba(0, 0, 0, 0.75);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		color: white;
		font-size: 0.75rem;
		white-space: nowrap;
		transform: translateY(-50%);
		opacity: 0;
		transition: opacity 0.3s ease-out;
	}

	.cursor-info.active {
		opacity: 1;
	}

	.flag {
		font-size: 1rem;
	}

	.location {
		opacity: 0.9;
		font-weight: 500;
	}

	.relative {
		cursor: none;
	}
</style>
