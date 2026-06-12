<script lang="ts">
	const href = 'https://tickets.vizchitra.com';
	const text = 'VizChitra 2026 ◦ Tickets open ◦ July 3–4 ◦ Get yours →';
	const repetitions = 6;

	const tileColors = [
		'var(--color-viz-yellow)',
		'var(--color-viz-teal)',
		'var(--color-viz-blue)',
		'var(--color-viz-orange)',
		'var(--color-viz-pink)'
	];

	const textColors = [
		'var(--color-viz-yellow-dark)',
		'var(--color-viz-teal-dark)',
		'var(--color-viz-blue-dark)',
		'var(--color-viz-orange-dark)',
		'var(--color-viz-pink-dark)'
	];
</script>

<a
	class="bar"
	{href}
	target="_blank"
	rel="noopener"
	aria-label="VizChitra 2026 tickets — in person or online"
>
	<div class="track" aria-hidden="true">
		{#each Array(repetitions) as _, i}
			<span class="sep-tile" style="--tile-color: {tileColors[i % tileColors.length]};"></span>
			<span class="seg-text" style="--text-color: {textColors[i % textColors.length]};">{text}</span
			>
		{/each}
	</div>
</a>

<style>
	.bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 60;
		height: var(--announcement-bar-height, 32px);
		background: var(--color-bg);
		overflow: hidden;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--color-viz-grey-light);
		text-decoration: none;
		cursor: pointer;
	}

	.track {
		display: flex;
		align-items: center;
		width: fit-content;
		white-space: nowrap;
		animation: scroll-left 70s linear infinite;
	}

	.bar:hover .track {
		animation-play-state: paused;
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation-play-state: paused;
		}
	}

	@keyframes scroll-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-16.666%);
		}
	}

	.sep-tile {
		display: inline-block;
		flex-shrink: 0;
		width: 80px;
		height: var(--announcement-bar-height, 32px);
		background-color: transparent;
		background-image:
			repeating-linear-gradient(
				0deg,
				var(--tile-color) 0px,
				var(--tile-color) 1px,
				transparent 1px,
				transparent 7px
			),
			repeating-linear-gradient(
				90deg,
				var(--tile-color) 0px,
				var(--tile-color) 1px,
				transparent 1px,
				transparent 7px
			);
		opacity: 0.5;
	}

	.seg-text {
		font-family: var(--font-display);
		font-size: var(--text-viz-sm);
		font-weight: 550;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-color, var(--color-viz-black));
		padding: 0 20px;
	}

	@media (max-width: 768px) {
		.sep-tile {
			width: 48px;
		}
		.seg-text {
			font-size: var(--text-viz-xs);
		}
	}
</style>
