<script>
	/** @type {{name: string, category: string, color: string}[]} */
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
				class="text-md flex-shrink-0 border border-gray-200 px-6 py-3 font-medium whitespace-nowrap"
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
