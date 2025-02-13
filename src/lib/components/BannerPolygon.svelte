<script>
	import { scaleLinear, Delaunay } from 'd3';
	import { onMount } from 'svelte';
	import { createNoise2D } from 'simplex-noise';

	// Constants
	const POINT_COUNT = 160;
	const NOISE_SCALE = 0.008; // Controls how smooth the noise is
	const MOVEMENT_SPEED = 0.00005; // Controls how fast points move
	const colors = [
		'#FF9EAA', // pink
		'#87CEEB', // light blue
		'#98FB98', // light green
		'#FFD700', // yellow
		'#FFA07A' // light salmon
	];

	let width, height;
	let voronoi;
	let intersections = [];
	let time = 0;
	const noise2D = createNoise2D();

	// Add a store for animation state
	let animationFrame;

	// Generate initial random data with position and noise offset
	let data = Array.from({ length: POINT_COUNT }).map(() => ({
		a: Math.random(),
		b: Math.random(),
		offsetX: Math.random() * 1000,
		offsetY: Math.random() * 1000
	}));

	const getColor = (index) => colors[index % colors.length];

	function handleMouseMove(event) {
		const { layerX, layerY } = event;
		// Convert screen coordinates back to our data space
		const a = xScale.invert(layerX);
		const b = yScale.invert(layerY);

		// Update the first point's position
		data[0].a = a;
		data[0].b = b;

		// Force reactivity
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

	// Animate points using noise
	function animate() {
		time += 1;

		data.forEach((point, i) => {
			if (i === 0) return; // Skip the first point (mouse-controlled)

			// Apply noise-based movement
			const noiseX = noise2D(point.offsetX + time * NOISE_SCALE, 0) * MOVEMENT_SPEED;
			const noiseY = noise2D(0, point.offsetY + time * NOISE_SCALE) * MOVEMENT_SPEED;

			point.a = (point.a + noiseX + 1) % 1;
			point.b = (point.b + noiseY + 1) % 1;
		});

		// Force a reactive update by reassigning data
		data = data;

		animationFrame = requestAnimationFrame(animate);
	}

	onMount(() => {
		animate();
		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	$: xScale = scaleLinear()
		.domain([0, 1])
		.range([50, width - 50]); // Adding padding

	$: yScale = scaleLinear()
		.domain([0, 1])
		.range([50, height - 50]); // Adding padding

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
		// Update intersections whenever voronoi updates
		intersections = findIntersections([...voronoi.cellPolygons()]);
	}
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	on:mousemove={handleMouseMove}
	role="banner"
	class="relative h-screen"
>
	<svg viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
		{#if voronoi}
			<g>
				{#each renderedData as _, i}
					<path class="polygon" d={voronoi.renderCell(i)} style="stroke: {getColor(i)}" />
				{/each}
				{#each intersections as point}
					<circle class="node" cx={point.x} cy={point.y} r="3" />
				{/each}
			</g>
		{/if}
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
