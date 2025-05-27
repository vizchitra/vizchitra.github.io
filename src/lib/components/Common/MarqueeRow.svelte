<script>
	/** @type {string[]} */
	export let items = [];
	/** @type {'right' | 'left'} */
	export let direction = 'right';
	/** @type {string} */
	export let duration = '40s';
	/** @type {number} */
	export let repetitions = 4;
</script>

<div class="marquee-container">
	<div class="marquee marquee-{direction}">
		{#each Array(repetitions).fill(items).flat() as item}
			<div
				class="text-md flex-shrink-0 rounded-sm border border-gray-200 bg-gray-50 px-6 py-3 font-medium whitespace-nowrap text-gray-700"
			>
				{item}
			</div>
		{/each}
	</div>
</div>

<style>
	.marquee-container {
		width: 100%;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.marquee {
		display: flex;
		gap: 1rem;
		width: fit-content;
		animation-duration: var(--duration, 40s);
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	.marquee-right {
		animation-name: scroll-right;
	}

	.marquee-left {
		animation-name: scroll-left;
	}

	@keyframes scroll-right {
		0% {
			transform: translateX(-25%);
		}
		100% {
			transform: translateX(0%);
		}
	}

	@keyframes scroll-left {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-25%);
		}
	}

	/* Pause animation on hover */
	.marquee:hover {
		animation-play-state: paused;
	}
</style>
