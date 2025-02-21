<script>
	import { formatSlantedText } from '$lib/utils/utils';
	import VizChitraLogoType from '../VizChitraLogoType.svelte';

	export let formData = {};

	let cardWidth = 0;
	let clipPath;
	let points = [
		{ x: 50, y: 0 },
		{ x: 100, y: 38 },
		{ x: 82, y: 100 },
		{ x: 18, y: 100 },
		{ x: 0, y: 38 }
	];

	$: if (formData) {
		points = computePoints(points);
	}

	function computePoints(points) {
		const MIN_VALUE = 40;

		let adjustedPoints = points.slice();

		let data = [
			formData['collection'],
			formData['analysis'],
			formData['coding'],
			formData['designing'],
			formData['narrating']
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
		let xOffset = formData['xOffset'] || 0;
		let yOffset = formData['yOffset'] || 0;
		let scale = formData['scale'] || 1;
		return `translate(${xOffset}px, ${yOffset}px) scale(${scale})`;
	}

	const COLOR_MAPPING = {
		'Collecting data': 'var(--color-viz-yellow)',
		'Analyzing data': 'var(--color-viz-teal)',
		'Coding visualizations': 'var(--color-viz-blue)',
		'Narrating insights': 'var(--color-viz-orange)',
		'Designing visualizations': 'var(--color-viz-pink)',
		none: '#ddd'
	};
</script>

<div
	id="custom-card"
	class="sticky top-[80px] container flex h-full w-full max-w-[550px] flex-col items-center justify-start rounded p-8"
	style="max-height: {cardWidth}px"
	bind:clientWidth={cardWidth}
>
	<div class="pentagon-container relative h-[250px] w-[250px] md:h-[350px] md:w-[350px]">
		<div class="logo-type absolute top-[45%] right-[15px] z-20">
			<VizChitraLogoType classes="text-[28px] md:text-[42px] "></VizChitraLogoType>
		</div>
		<svg class="absolute z-10" width="100%" height="100%">
			{#each points as point, i}
				<line
					stroke={COLOR_MAPPING[formData.strength]}
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

		<!-- 
		<div
			class="image-container"
			style="clip-path: polygon({clipPath}); --strength-color: {COLOR_MAPPING[formData.strength]}"
		><img
				src="/images/team/{formData.image}"
				alt={formData.name}
				style="transform: {computeTransform()} "
			/>
		</div> 
        -->
	</div>

	<div class="member-details w-[250px] max-w-[350px] text-center md:w-[350px]">
		{#if formData.name}
			<p class="font-display align-bottom text-[18px] leading-[1] uppercase md:text-[22px]">
				{#each formatSlantedText(formData.name) as letter}
					<span
						class="slanted-text text-[18px] font-bold md:text-[24px]"
						style="--letter-slant: {letter.slant}"
					>
						{letter.letter}
					</span>
				{/each}
			</p>
		{/if}

		{#if formData.desc}
			<p class="text-[14px] !leading-[1.3] md:text-[18px]">{formData.desc}</p>
		{/if}
	</div>
</div>

<style>
	.container {
		border: 1px solid #ddd;
		box-shadow:
			rgba(0, 0, 0, 0.19) 0px 10px 20px,
			rgba(0, 0, 0, 0.23) 0px 6px 6px;
	}

	.image-container {
		width: 100%;
		height: 100%;
		overflow: hidden;

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
