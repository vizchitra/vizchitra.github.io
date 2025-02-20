<script>
	export let memberData = {};
	console.log('memberData', memberData);

	// 50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%
	let regularPentagonPoints = [
		{ x: 50, y: 0 },
		{ x: 100, y: 38 },
		{ x: 82, y: 100 },
		{ x: 18, y: 100 },
		{ x: 0, y: 38 }
	];

	$: points = computePoints(regularPentagonPoints);

	function computePoints(points) {
		const offset = 5;

		// can write more complicated logic in future
		let adjustedPoints = points.map((point) => {
			return {
				// logic to move the point slighlt inward from the edge
				x: point.x === 50 ? point.x : point.x < 50 ? point.x + offset : point.x - offset,
				y: point.y === 50 ? point.y : point.y < 50 ? point.y + offset : point.y - offset
			};
		});

		console.log(
			'adjustedPoints',
			adjustedPoints.map((point) => `${point.x}% ${point.y}%`).join(', ')
		);

		return adjustedPoints;
	}

	function getImageURL(name) {
		let cleanedName = name.split(' ')[0].toLowerCase();

		return `/images/team/${cleanedName}.jpg`;
	}
</script>

<div>
	<div class="pentagon-container relative h-[200px] w-[200px]">
		<svg class="absolute z-10" width="100%" height="100%">
			{#each points as point, i}
				<line
					class="stroke-viz-orange"
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

		<div class="image-container">
			<img src="/images/team/{memberData.image}" alt={memberData.name} />
		</div>
	</div>

	<div class="member-details max-w-[200px] text-center">
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

		/* clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); */
		clip-path: polygon(50% 5%, 95% 43%, 77% 95%, 23% 95%, 5% 43%);
		overflow: hidden;
	}
</style>
