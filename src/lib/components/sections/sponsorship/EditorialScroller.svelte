<script lang="ts">
	import type { Color } from '$lib/tokens';

	export interface EditorialCard {
		heading: string;
		body: string;
		color: Color;
	}

	let { cards, ariaLabel = 'Cards' }: { cards: EditorialCard[]; ariaLabel?: string } = $props();

	let scrollProgress = $state(0); // 0 to 1
	let isOverflowing = $state(false);

	function handleScroll(el: HTMLElement) {
		const maxScroll = el.scrollWidth - el.clientWidth;
		isOverflowing = maxScroll > 10;
		scrollProgress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
	}

	function checkOverflow(el: HTMLElement) {
		isOverflowing = el.scrollWidth > el.clientWidth + 10;
	}

	// Drag to scroll
	function initDrag(node: HTMLElement) {
		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;
		let hasDragged = false;

		node.addEventListener('mousedown', (e) => {
			isDown = true;
			hasDragged = false;
			node.style.cursor = 'grabbing';
			startX = e.pageX;
			scrollLeft = node.scrollLeft;
			e.preventDefault();
		});
		node.addEventListener('mouseleave', () => {
			isDown = false;
			node.style.cursor = '';
		});
		node.addEventListener('mouseup', () => {
			isDown = false;
			node.style.cursor = '';
		});
		node.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const walk = (e.pageX - startX) * 1.5;
			if (Math.abs(walk) > 5) hasDragged = true;
			node.scrollLeft = scrollLeft - walk;
		});
		node.addEventListener(
			'click',
			(e) => {
				if (hasDragged) {
					e.preventDefault();
					e.stopPropagation();
					hasDragged = false;
				}
			},
			true
		);

		// Check overflow on mount and resize
		checkOverflow(node);
		const ro = new ResizeObserver(() => checkOverflow(node));
		ro.observe(node);
		return {
			destroy() {
				ro.disconnect();
			}
		};
	}
</script>

<div class="ed-root">
	{#if isOverflowing}
		<div class="progress-track" aria-hidden="true">
			<div class="progress-thumb" style="left: {scrollProgress * 70}%; width: 30%"></div>
		</div>
	{/if}

	<div
		class="ed-overflow"
		class:ed-draggable={isOverflowing}
		onscroll={(e) => handleScroll(e.currentTarget as HTMLElement)}
		use:initDrag
		role="region"
		aria-label={ariaLabel}
	>
		<div class="ed-scroll">
			{#each cards as card (card.heading)}
				<div
					class="ed-card"
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

	/* ── Progress bar ───────────────────────────────── */
	.progress-track {
		position: relative;
		height: 8px;
		background: #e0e0e0;
		border-radius: 999px;
		margin: 0 auto 8px;
		max-width: 200px;
	}

	.progress-thumb {
		position: absolute;
		top: 0;
		height: 100%;
		background: #444;
		border-radius: 999px;
		transition: left 300ms ease;
	}

	.ed-draggable {
		cursor: grab;
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
