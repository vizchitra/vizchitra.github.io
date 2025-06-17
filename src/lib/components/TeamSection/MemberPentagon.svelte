<script>
	export let memberData = {};

	// 50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%
	let regularPentagonPoints = [
		{ x: 50, y: 0 },
		{ x: 100, y: 38 },
		{ x: 82, y: 100 },
		{ x: 18, y: 100 },
		{ x: 0, y: 38 }
	];

	$: points = computePoints(regularPentagonPoints);
	let clipPath;

	function computePoints(points) {
		const MIN_VALUE = 55;

		let adjustedPoints = points.slice();

		let data = [
			memberData['collection'],
			memberData['analysis'],
			memberData['coding'],
			memberData['designing'],
			memberData['narrating']
		];

		for (let i = 0; i < 5; i++) {
			let angle = (2 * Math.PI) / 5;
			let x1 =
				50 +
				((Math.cos(-i * angle - Math.PI / 2) *
					(MIN_VALUE + ((100 - MIN_VALUE - 5) * data[i]) / 5)) /
					100) *
					50;
			let y1 =
				50 +
				((Math.sin(-i * angle - Math.PI / 2) *
					(MIN_VALUE + ((100 - MIN_VALUE - 5) * data[i]) / 5)) /
					100) *
					50;
			adjustedPoints[i].x = x1;
			adjustedPoints[i].y = y1;
		}

		clipPath = adjustedPoints.map((point) => `${point.x}% ${point.y}%`).join(', ');
		return adjustedPoints;
	}

	function computeTransform() {
		let xOffset = memberData['xOffset'] || 0;
		let yOffset = memberData['yOffset'] || 0;
		let scale = memberData['scale'] || 1;

		return `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
	}

	const COLOR_MAPPING = {
		'Collecting data': 'var(--color-viz-yellow)',
		'Analyzing data': 'var(--color-viz-teal)',
		'Coding visualizations': 'var(--color-viz-blue)',
		'Narrating insights': 'var(--color-viz-orange)',
		'Designing visualizations': 'var(--color-viz-pink)'
	};
</script>

<div>
	<div class="pentagon-container relative h-[150px] w-[150px] md:h-[200px] md:w-[200px] xl:h-[250px] xl:w-[250px]">
		<svg class="absolute z-10" width="100%" height="100%">
			{#each points as point, i}
				<line
					stroke={COLOR_MAPPING[memberData.strength]}
					x1="{point.x}%"
					y1="{point.y}%"
					x2="{i === points.length - 1 ? points[0].x : points[i + 1].x}%"
					y2="{i === points.length - 1 ? points[0].y : points[i + 1].y}%"
					stroke-width="6"
				/>
			{/each}
			{#each points as point, i}
				<circle cx="{point.x}%" cy="{point.y}%" r="9" fill="white" />
				<circle cx="{point.x}%" cy="{point.y}%" r="5" fill="#4c4c4c" />
			{/each}
		</svg>

		<div
			class="image-container"
			style="clip-path: polygon({clipPath}); --strength-color: {COLOR_MAPPING[memberData.strength]}"
		>
			<img
				src="/images/team/{memberData.image}"
				alt={memberData.name}
				style="transform: {computeTransform()} "
			/>
		</div>
	</div>

	<div class="member-details w-[150px] max-w-[200px] text-center md:w-[200px] xl:w-[250px] xl:max-w-[250px]">
		<div class="mb-2 flex h-[45px] flex-col items-center justify-end">
			<h3 class="font-display align-bottom text-[18px] leading-[1] font-bold md:text-[22px]">
				{memberData.name}
			</h3>
		</div>
		<p class="text-[16px] !leading-[1.3] md:text-[18px]">{memberData.role}</p>
	</div>
</div>

<style>
	.image-container {
		width: 100%;
		height: 100%;
		overflow: hidden;

		img {
			filter: grayscale(100%);
		}

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: var(--strength-color);
			opacity: 0.4;

			mix-blend-mode: hard-light;
		}
	}
</style>
