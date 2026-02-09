<script lang="ts">
	import { onMount } from 'svelte';
	import { getColorHex, colors } from '$lib/tokens';

	let width = $state(null);
	let height = 80;

	export const className: string = '';

	const brandColors = colors.filter((c) => c !== 'grey');

	const NUM_POINTS = 3;

	let points = $state([]);
	let lines = $state([]);

	onMount(() => {
		for (let i = 0; i < NUM_POINTS; i++) {
			const r = 5;
			let cx = Math.floor(Math.random() * (width - 2 * r)) + r;
			let cy = Math.floor(Math.random() * (height - 2 * r)) + r;
			let fill = getColorHex('grey');

			points.push({ cx, cy, r, fill });
		}

		points = points.sort((a, b) => a.cx - b.cx);

		for (let i = 0; i < NUM_POINTS + 1; i++) {
			let [x1, y1, x2, y2] = [0, 0, 0, 0];
			const stroke = getColorHex(brandColors[Math.floor(Math.random() * brandColors.length)]);
			const strokeWidth = 8;

			if (i == 0) {
				x1 = 0;
				y1 = Math.random() * (height - 2 * strokeWidth);
				x2 = points[0].cx;
				y2 = points[0].cy;
			} else if (i == NUM_POINTS) {
				x1 = points[NUM_POINTS - 1].cx;
				y1 = points[NUM_POINTS - 1].cy;
				x2 = width;
				y2 = Math.random() * (height - 2 * strokeWidth);
			} else {
				x1 = points[i - 1].cx;
				y1 = points[i - 1].cy;
				x2 = points[i].cx;
				y2 = points[i].cy;
			}
			lines.push({ x1, x2, y1, y2, stroke, strokeWidth });
		}

		lines = lines;
	});
</script>

<div class="divider-container my-12 w-full" bind:clientWidth={width}>
	<svg
		{width}
		{height}
		viewBox="0 0 {width ?? 0} {height ?? 0}"
		preserveAspectRatio="xMidYMid meet"
	>
		{#each lines as line}
			<line
				x1={line.x1}
				y1={line.y1}
				x2={line.x2}
				y2={line.y2}
				stroke={line.stroke}
				stroke-width={line.strokeWidth}
			></line>
		{/each}

		{#each points as point}
			<circle cx={point.cx} cy={point.cy} r={point.r + 4} fill={'white'}></circle>
			<circle cx={point.cx} cy={point.cy} r={point.r} fill={point.fill}></circle>
		{/each}
	</svg>
</div>
