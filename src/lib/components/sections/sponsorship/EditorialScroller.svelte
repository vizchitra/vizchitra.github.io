<script lang="ts">
	import type { Color } from '$lib/tokens';

	export interface EditorialCard {
		heading: string;
		body: string;
		color: Color;
	}

	let { cards, ariaLabel = 'Cards' }: { cards: EditorialCard[]; ariaLabel?: string } = $props();

	let activeIndex = $state(0);

	function handleScroll(el: HTMLElement) {
		const items = el.querySelectorAll<HTMLElement>('.ed-card');
		if (!items.length) return;
		let best = 0;
		let bestDist = Infinity;
		items.forEach((item, i) => {
			const dist = Math.abs(item.getBoundingClientRect().left - el.getBoundingClientRect().left);
			if (dist < bestDist) {
				bestDist = dist;
				best = i;
			}
		});
		activeIndex = best;
	}
</script>

<div class="ed-root">
	<div class="dots-row" aria-hidden="true">
		{#each cards as _, i}
			<span class="dot" class:dot-active={activeIndex === i}></span>
		{/each}
	</div>

	<div
		class="ed-overflow"
		onscroll={(e) => handleScroll(e.currentTarget as HTMLElement)}
		role="region"
		aria-label={ariaLabel}
	>
		<div class="ed-scroll">
			{#each cards as card, i (card.heading)}
				<div
					class="ed-card"
					role="button"
					tabindex="0"
					onclick={() => (activeIndex = i)}
					onkeydown={(e) => e.key === 'Enter' && (activeIndex = i)}
					style="--accent-bar: var(--color-viz-{card.color}); --accent-dark: var(--color-viz-{card.color}-dark);"
				>
					<div class="ed-inner">
						<p class="ed-heading">{card.heading}</p>
						<p class="ed-body">{card.body}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* ── Root — full-bleed breakout ─────────────────── */
	.ed-root {
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}

	@media (max-width: 64rem) {
		.ed-root {
			width: auto;
			margin-left: calc(-1 * var(--container-padding-x, var(--spacing-viz-lg)));
			margin-right: calc(-1 * var(--container-padding-x, var(--spacing-viz-lg)));
		}
	}

	/* ── Dots ────────────────────────────────────────── */
	.dots-row {
		display: flex;
		justify-content: center;
		gap: 6px;
		padding: 0 0 8px;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-viz-grey-muted);
		flex-shrink: 0;
		transition: background 300ms ease;
	}

	.dot-active {
		background: var(--color-viz-grey-solid);
	}

	/* ── Overflow viewport ───────────────────────────── */
	.ed-overflow {
		overflow-x: auto;
		scrollbar-width: none;
		display: flex;
		justify-content: safe center;
		padding: 12px 2rem 1rem;
	}

	.ed-overflow::-webkit-scrollbar {
		display: none;
	}

	/* ── Scroll track — subgrid aligns heading + body ── */
	.ed-scroll {
		display: grid;
		grid-template-rows: auto 1fr;
		grid-auto-flow: column;
		grid-auto-columns: 280px;
		flex-shrink: 0;
		column-gap: 24px;
	}

	/* ── Card wrapper — positions the slanted accent bar ── */
	.ed-card {
		grid-row: 1 / -1;
		display: grid;
		grid-template-rows: subgrid;
		scroll-snap-align: start;
		cursor: default;
	}

	/* ── Inner — carries the left-bar + padding ────────── */
	.ed-card .ed-inner {
		grid-row: 1 / -1;
		display: grid;
		grid-template-rows: subgrid;
		position: relative;
		padding: 4px 0 4px 22px;
	}

	/* Slanted left border via clip-path parallelogram */
	.ed-card .ed-inner::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 18px;
		height: 100%;
		background: var(--accent-bar);
		clip-path: polygon(0 0, 8px 0, 4px 100%, 0 100%);
	}

	/* ── Heading ─────────────────────────────────────── */
	.ed-heading {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--accent-dark);
		margin: 0 0 8px;
	}

	/* ── Body ────────────────────────────────────────── */
	.ed-body {
		font-family: var(--font-body);
		font-size: 1rem;
		line-height: 1.65;
		color: var(--color-viz-grey-dark);
		margin: 0;
	}

	/* ── Mobile ──────────────────────────────────────── */
	@media (max-width: 64rem) {
		.ed-overflow {
			justify-content: flex-start;
			padding: 0 var(--container-padding-x, var(--spacing-viz-lg)) 1rem;
		}

		.ed-scroll {
			grid-auto-columns: 240px;
		}
	}
</style>
