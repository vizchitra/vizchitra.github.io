<script>
	import { scaleLinear, Delaunay } from 'd3';
	import { MousePointer2 } from 'lucide-svelte';

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

	let width, height;
	let voronoi;
	let cursorX = 0;
	let cursorY = 0;

	// Generate initial random data
	let data = Array.from({ length: POINT_COUNT }).map(() => ({
		a: Math.random(),
		b: Math.random()
	}));

	const getColor = (index) => colors[index % colors.length];

	function handleMouseMove(event) {
		const { layerX, layerY } = event;
		cursorX = layerX;
		cursorY = layerY;

		// Update the first point's position
		const a = xScale.invert(layerX);
		const b = yScale.invert(layerY);
		data[0].a = a;
		data[0].b = b;
		data = data;
	}

	function findIntersections(cells) {
		const vertices = new Set();
		cells.forEach((cell) => {
			if (!cell) return;
			cell.forEach((point) => {
				const key = `${Math.round(point[0] * 100) / 100},${Math.round(point[1] * 100) / 100}`;
				vertices.add(key);
			});
		});

		return Array.from(vertices).map((v) => {
			const [x, y] = v.split(',').map(Number);
			return { x, y };
		});
	}

	$: xScale = scaleLinear()
		.domain([0, 1])
		.range([50, width - 50]);

	$: yScale = scaleLinear()
		.domain([0, 1])
		.range([50, height - 50]);

	$: renderedData = data.map((d) => ({
		x: xScale(d.a),
		y: yScale(d.b)
	}));

	$: if (width && height) {
		const delaunay = Delaunay.from(
			renderedData,
			(d) => d.x,
			(d) => d.y
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

	<div
		class="custom-cursor"
		style="transform: translate({cursorX - CURSOR_SIZE / 2}px, {cursorY - CURSOR_SIZE / 2}px)"
	>
		<MousePointer2 size={CURSOR_SIZE} class="cursor-icon" />
	</div>
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

	.relative {
		cursor: none;
	}
</style>
