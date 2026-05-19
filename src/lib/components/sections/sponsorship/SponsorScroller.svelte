<script lang="ts">
	import StarRating from './StarRating.svelte';
	import type { Color } from '$lib/tokens';

	export interface Sponsor {
		name: string;
		logo: string;
		photos?: (string | undefined)[];
		quote: string;
		overallRating: number;
		recommendRating: number;
		color: Color;
	}

	let { sponsors }: { sponsors: Sponsor[] } = $props();

	let activeIndex = $state(0);

	function handleScroll(el: HTMLElement) {
		const cards = el.querySelectorAll<HTMLElement>('.sp-card');
		if (!cards.length) return;
		let best = 0;
		let bestDist = Infinity;
		cards.forEach((card, i) => {
			const dist = Math.abs(card.getBoundingClientRect().left - el.getBoundingClientRect().left);
			if (dist < bestDist) {
				bestDist = dist;
				best = i;
			}
		});
		activeIndex = best;
	}
</script>

<div class="sp-root">
	<div class="dots-row" aria-hidden="true">
		{#each sponsors as _, i}
			<span class="dot" class:dot-active={activeIndex === i}></span>
		{/each}
	</div>

	<div
		class="sp-overflow"
		onscroll={(e) => handleScroll(e.currentTarget as HTMLElement)}
		role="region"
		aria-label="Sponsor testimonials"
	>
		<div class="sp-scroll">
			{#each sponsors as s, i (s.name)}
				<div
					class="sp-card"
					role="button"
					tabindex="0"
					onclick={() => (activeIndex = i)}
					onkeydown={(e) => e.key === 'Enter' && (activeIndex = i)}
					style="--accent: var(--color-viz-{s.color}); --accent-light: var(--color-viz-{s.color}-light); --accent-muted: var(--color-viz-{s.color}-muted);"
				>
					<!-- Logo row -->
					<div class="sp-logo-row">
						<img src={s.logo} alt="{s.name} logo" class="sp-logo" />
					</div>

					<!-- Photo strip -->
					<div class="sp-photos">
						{#each [0, 1] as pi}
							{#if s.photos?.[pi]}
								<img src={s.photos[pi]} alt="{s.name} event photo {pi + 1}" class="sp-photo" />
							{:else}
								<div class="sp-photo-placeholder" aria-hidden="true"></div>
							{/if}
						{/each}
					</div>

					<!-- Quote -->
					<div class="sp-quote-row">
						<p class="sp-quote">"{s.quote}"</p>
					</div>

					<!-- Ratings -->
					<div class="sp-ratings">
						<div class="sp-rating-row">
							<StarRating rating={s.overallRating} label="Overall Experience" color={s.color} />
						</div>
						<div class="sp-rating-row">
							<StarRating rating={s.recommendRating} label="Recommend VizChitra" color={s.color} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* ── Root — full-bleed breakout ─────────────────── */
	.sp-root {
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}

	@media (max-width: 64rem) {
		.sp-root {
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
	.sp-overflow {
		overflow-x: auto;
		scrollbar-width: none;
		display: flex;
		justify-content: safe center;
		padding: 0 2rem 1rem;
	}

	.sp-overflow::-webkit-scrollbar {
		display: none;
	}

	/* ── Scroll track — subgrid for row alignment ────── */
	/*
	 * 4 row tracks: logo · photos · quote · ratings
	 * grid-auto-flow: column puts each card in its own column
	 * subgrid lets equivalent rows share height across cards
	 */
	.sp-scroll {
		display: grid;
		grid-template-rows:
			/* logo   */
			auto
			/* photos */ auto
			/* quote  */ 1fr
			/* ratings*/ auto;
		grid-auto-flow: column;
		grid-auto-columns: 260px;
		flex-shrink: 0;
		column-gap: 12px;
	}

	/* ── Card ────────────────────────────────────────── */
	.sp-card {
		grid-row: 1 / -1;
		display: grid;
		grid-template-rows: subgrid;

		border-radius: 10px;
		overflow: hidden;
		border: 1px solid var(--color-viz-grey-muted);
		border-top: 3px solid var(--accent);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		scroll-snap-align: start;
		cursor: default;
	}

	/* ── Logo row ────────────────────────────────────── */
	.sp-logo-row {
		background: var(--color-bg);
		padding: 14px 16px;
		border-bottom: 1px solid var(--color-viz-grey-light);
		display: flex;
		align-items: center;
		min-height: 60px;
	}

	.sp-logo {
		max-height: 36px;
		max-width: 140px;
		object-fit: contain;
		object-position: left center;
	}

	/* ── Photos ──────────────────────────────────────── */
	.sp-photos {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.sp-photo,
	.sp-photo-placeholder {
		aspect-ratio: 4 / 3;
		width: 100%;
		display: block;
	}

	.sp-photo {
		object-fit: cover;
	}

	.sp-photo-placeholder {
		background: var(--color-viz-grey-subtle);
	}

	/* ── Quote ───────────────────────────────────────── */
	.sp-quote-row {
		background: var(--accent-light);
		padding: 12px 16px;
		border-top: 1px solid var(--accent-muted);
	}

	.sp-quote {
		font-family: var(--font-display);
		font-size: 12px;
		font-style: italic;
		line-height: 1.55;
		color: var(--color-fg);
		margin: 0;
	}

	/* ── Ratings ─────────────────────────────────────── */
	.sp-ratings {
		background: var(--accent-light);
		padding: 8px 16px 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		border-top: 1px solid var(--accent-muted);
	}

	.sp-rating-row {
		display: flex;
		align-items: center;
	}

	/* ── Mobile ──────────────────────────────────────── */
	@media (max-width: 64rem) {
		.sp-overflow {
			justify-content: flex-start;
			padding: 0 var(--container-padding-x, var(--spacing-viz-lg)) 1rem;
		}

		.sp-scroll {
			grid-auto-columns: 220px;
		}
	}
</style>
