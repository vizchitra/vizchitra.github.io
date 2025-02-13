<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { createNoise2D } from 'simplex-noise';

	let svg;
	let container;
	let points = [];
	let polygons = [];
	let intersections = [];
	let width;
	let height = 500;
	let mousePosition = { x: 0, y: 0 };

	const POINT_COUNT = 160;
	const PADDING = 50;

	const MOUSE_INFLUENCE = 200;
	const WIND_SPEED = 0.0005;
	const WIND_SCALE = 0.005;
	const MAX_WIND_FORCE = 0.15;

	const colors = [
		'#FF9EAA', // pink
		'#87CEEB', // light blue
		'#98FB98', // light green
		'#FFD700', // yellow
		'#FFA07A' // light salmon
	];

	const getColor = (index) => colors[index % colors.length];

	// Enhanced point structure with velocity and base position
	function createPoints() {
		return Array.from({ length: POINT_COUNT }, () => ({
			x: PADDING + Math.random() * (width - 2 * PADDING),
			y: PADDING + Math.random() * (height - 2 * PADDING),
			baseX: 0,
			baseY: 0,
			vx: 0,
			vy: 0
		}));
	}

	function findIntersections(polygons) {
		const vertices = new Set();

		polygons.forEach((polygon) => {
			if (!polygon || !polygon.path) return;

			const points = polygon.path
				.replace('M', '')
				.replace('Z', '')
				.split('L')
				.map((point) => {
					const [x, y] = point.split(',').map(Number);
					return { x, y };
				});

			points.forEach((point) => {
				const key = `${Math.round(point.x * 100) / 100},${Math.round(point.y * 100) / 100}`;
				vertices.add(key);
			});
		});

		return Array.from(vertices).map((v) => {
			const [x, y] = v.split(',').map(Number);
			return { x, y };
		});
	}

	// Create noise generator
	const noise2D = createNoise2D();

	function updatePoints(timestamp) {
		points = points.map((point, i) => {
			// Replace the wind effect with Perlin noise
			const timeOffset = timestamp * WIND_SPEED;
			const noiseX = noise2D(point.x * WIND_SCALE, timeOffset);
			const noiseY = noise2D(point.y * WIND_SCALE, timeOffset + 1000);

			// Smooth transition for velocity
			point.vx += (noiseX * MAX_WIND_FORCE - point.vx) * 0.1;
			point.vy += (noiseY * MAX_WIND_FORCE - point.vy) * 0.1;

			// Mouse influence remains the same
			const dx = mousePosition.x - point.x;
			const dy = mousePosition.y - point.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < MOUSE_INFLUENCE) {
				const force = (MOUSE_INFLUENCE - distance) / MOUSE_INFLUENCE;
				point.vx -= (dx / distance) * force * 0.5;
				point.vy -= (dy / distance) * force * 0.5;
			}

			// Update position
			point.x += point.vx;
			point.y += point.vy;

			// Boundary checking
			point.x = Math.max(PADDING, Math.min(width - PADDING, point.x));
			point.y = Math.max(PADDING, Math.min(height - PADDING, point.y));

			return point;
		});

		updateVoronoi();
		requestAnimationFrame(updatePoints);
	}

	function updateVoronoi() {
		const pointCoords = points.map((p) => [p.x, p.y]);
		const delaunay = d3.Delaunay.from(pointCoords);
		const voronoi = delaunay.voronoi([0, 0, width, height]);

		polygons = Array.from(pointCoords, (_, i) => {
			const cell = voronoi.cellPolygon(i);
			if (!cell) return null;
			const pathData = `M${cell.join('L')}Z`;
			return { path: pathData };
		}).filter(Boolean);

		intersections = findIntersections(polygons);
	}

	function handleMouseMove(event) {
		const rect = container.getBoundingClientRect();
		mousePosition = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	function generateVisualization() {
		if (!container) return;

		const rect = container.getBoundingClientRect();
		width = rect.width;
		height = rect.height;

		points = createPoints();
		updateVoronoi();
	}

	onMount(() => {
		generateVisualization();
		requestAnimationFrame(updatePoints);

		const handleResize = () => {
			generateVisualization();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<div
	bind:this={container}
	bind:clientWidth={width}
	on:mousemove={handleMouseMove}
	role="banner"
	class="relative h-screen"
>
	<svg bind:this={svg} viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
		<g>
			{#each polygons as polygon, i}
				<path class="polygon" d={polygon.path} style="stroke: {getColor(i)}" />
			{/each}
			{#each intersections as point}
				<circle class="node" cx={point.x} cy={point.y} r="3" />
			{/each}
		</g>
	</svg>
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
</style>
