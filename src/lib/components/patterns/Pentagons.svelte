<script lang="ts">
	import { getColorHex, colors } from '$lib/tokens';

	interface Props {
		backgroundColor?: string;
		title?: string;
		description?: string;
		seed?: number;
	}

	let {
		backgroundColor = getColorHex('yellow'),
		title = '',
		description = '',
		seed = 1
	}: Props = $props();

	function seededRandom(seed: number): number {
		let x = Math.sin(seed) * 1000;
		return x - Math.floor(x);
	}

	function generateRandomizedPentagon(seed: number, randomness: number = 8) {
		const basePoints = [
			{ x: 50, y: 0 },
			{ x: 100, y: 38 },
			{ x: 82, y: 100 },
			{ x: 18, y: 100 },
			{ x: 0, y: 38 }
		];

		return basePoints.map((point, index) => {
			const pointSeed = seed + index * 13233;

			const offsetX = (seededRandom(pointSeed) - 0.9) * randomness;
			const offsetY = (seededRandom(pointSeed + 10100) - 0.9) * randomness;

			return {
				x: Math.max(0, Math.min(100, point.x + offsetX)),
				y: Math.max(0, Math.min(100, point.y + offsetY))
			};
		});
	}

	let pentagonPoints = $derived(generateRandomizedPentagon(seed));
	let clipPath = $derived(pentagonPoints.map((point) => `${point.x}% ${point.y}%`).join(', '));
</script>

<div class="pentagon-card relative mx-auto h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem]">
	<div
		class="pentagon-background"
		style="clip-path: polygon({clipPath}); background-color: {backgroundColor};"
	></div>

	<div
		class="content absolute inset-5 z-10 flex flex-col items-center justify-center p-4 text-center"
	>
		<h3 class="font-display text-grey-700 mt-10 mb-2 text-xl font-bold md:mb-4 md:text-2xl">
			{title}
		</h3>
		<p class="text-grey-700 mr-4 ml-4 text-sm leading-[1.3] md:text-lg">
			{description}
		</p>
	</div>
</div>

<style>
	.pentagon-background {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
