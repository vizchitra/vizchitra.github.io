<script>
	/**
	 * @typedef {Object} Props
	 * @property {{name: string, category: string, color: string}[]} [items]
	 * @property {'right' | 'left'} [direction]
	 * @property {string} [duration]
	 * @property {number} [repetitions]
	 */

	/** @type {Props} */
	let { items = [], direction = 'right', duration = '40s', repetitions = 4 } = $props();
</script>

<div class="marquee-container">
	<div class="marquee marquee-{direction}" style="--duration: {duration};">
		{#each Array(repetitions).fill(items).flat() as item}
			<div
				class="text-md px-md py-sm flex-shrink-0 border border-gray-200 font-medium whitespace-nowrap"
				style="background-color: {item.color}; clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%);"
			>
				{item.name}
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
		animation-duration: var(--duration);
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

	/* Pause animation for reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.marquee {
			animation-play-state: paused;
		}
	}
</style>
