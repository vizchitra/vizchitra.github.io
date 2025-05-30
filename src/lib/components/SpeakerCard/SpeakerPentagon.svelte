<script>
	import { svg } from 'd3';
	import SpeakerCardPattern1 from '$lib/assets/images/speakers-2025/speaker-card-pattern-1.svg?raw';
	import SpeakerCardPattern2 from '$lib/assets/images/speakers-2025/speaker-card-pattern-2.svg?raw';

	export let memberData = {};
	export let colorMapping = {};

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
			adjustedPoints[i].x = (x1 * pentagonSize) / 100;
			adjustedPoints[i].y = (y1 * pentagonSize) / 100;
		}

		clipPath = adjustedPoints
			.map((point) => `${(point.x * 100) / pentagonSize}% ${(point.y * 100) / pentagonSize}%`)
			.join(', ');
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

	const pentagonSize = memberData.talkType === 'keynote' ? 425 : 275;
	const pentagonXOffset = memberData.talkType === 'keynote' ? 120 : 20; // Adjust as needed for positioning
	const pentagonYOffset = memberData.talkType === 'keynote' ? 0 : 20; // Adjust as needed for positioning
	let svgWidth = 800;
	let svgHeight = 800;
	let screenWidth = 800;

	$: isKeynote = memberData.talkType === 'keynote';
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if colorMapping}
	<div class="flex h-full w-full flex-row items-start justify-between gap-4 md:gap-8">
		<div class="pentagon-container relative h-full w-full">
			<div
				class="pattern-container absolute z-[-1] opacity-70"
				style="transform: translate({-50}px, {points[1].y +
					pentagonYOffset +
					(isKeynote && screenWidth > 550 ? 0 : -50)}px); transform-origin: top right;"
			>
				{@html SpeakerCardPattern1.replaceAll(
					'#FFD485',
					colorMapping[memberData.talkType]?.patternGradient[0]
				).replaceAll('#F89F72', colorMapping[memberData.talkType]?.patternGradient[1])}
			</div>
			<div
				class="pattern-container absolute right-0 bottom-0 z-[-1] opacity-70"
				style="transform: translate({0}px, {isKeynote && screenWidth > 550 ? 0 : 75}px); "
			>
				{@html SpeakerCardPattern2.replaceAll(
					'#FFD485',
					colorMapping[memberData.talkType]?.patternGradient[0]
				).replaceAll('#F89F72', colorMapping[memberData.talkType]?.patternGradient[1])}
			</div>

			<!-- svelte-ignore component_name_lowercase -->
			<svg
				class="absolute z-10 overflow-hidden"
				width="100%"
				height="100%"
				bind:clientWidth={svgWidth}
				bind:clientHeight={svgHeight}
			>
				<path
					transform="translate({svgWidth - pentagonSize + pentagonXOffset},{0})"
					d="M {-(svgWidth - pentagonSize + pentagonXOffset)},0 
				L {svgWidth},0 
				L {svgWidth},{points[1].y + pentagonYOffset} 
				L {points[4].x},{points[4].y + pentagonYOffset} 
				L {points[0].x},{points[0].y + pentagonYOffset}  
				L {points[1].x},{points[1].y + pentagonYOffset}  
				L {-(svgWidth - pentagonSize + pentagonXOffset)},{points[1].y + pentagonYOffset} Z"
					fill={colorMapping[memberData.talkType]?.bannerColor}
				></path>

				<line
					stroke={'white'}
					x1={0}
					y1={points[1].y + pentagonYOffset}
					x2={points[1].x + svgWidth - pentagonSize + pentagonXOffset}
					y2={points[1].y + pentagonYOffset}
					stroke-width="16"
				/>
				<line
					stroke={colorMapping[memberData.talkType]?.primary}
					x1={0}
					y1={points[1].y + pentagonYOffset}
					x2={points[1].x + svgWidth - pentagonSize + pentagonXOffset}
					y2={points[1].y + pentagonYOffset}
					stroke-width="6"
				/>

				<g
					class="pentagon"
					transform="translate({svgWidth - pentagonSize + pentagonXOffset},{pentagonYOffset})"
				>
					{#each points as point, i}
						<line
							stroke={'white'}
							x1={point.x}
							y1={point.y}
							x2={i === points.length - 1 ? points[0].x : points[i + 1].x}
							y2={i === points.length - 1 ? points[0].y : points[i + 1].y}
							stroke-width="16"
						/>
						<line
							stroke={colorMapping[memberData.talkType]?.primary}
							x1={point.x}
							y1={point.y}
							x2={i === points.length - 1 ? points[0].x : points[i + 1].x}
							y2={i === points.length - 1 ? points[0].y : points[i + 1].y}
							stroke-width="6"
						/>
					{/each}

					{#each points as point, i}
						<circle cx={point.x} cy={point.y} r="9" fill="white" />
						<circle cx={point.x} cy={point.y} r="5" fill="#4c4c4c" />
					{/each}
				</g>
			</svg>

			<div
				class="image-container relative"
				style="clip-path: polygon({clipPath}); --strength-color: {colorMapping[memberData.talkType]
					?.primary};width: {pentagonSize}px; height: {pentagonSize}px; transform: translate({svgWidth -
					pentagonSize +
					pentagonXOffset}px, {pentagonYOffset}px);"
			>
				<img
					src={memberData.image}
					alt={memberData.name}
					class="bg-white"
					style="transform: {computeTransform()} "
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	.image-container {
		width: 100%;
		height: 100%;

		img {
			/* filter: grayscale(100%); */
		}

		&::after {
			/* content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: var(--strength-color);
			opacity: 0.4;

			mix-blend-mode: hard-light; */
		}
	}
</style>
