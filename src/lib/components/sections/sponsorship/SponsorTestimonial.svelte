<script lang="ts">
	import StarRating from './StarRating.svelte';
	import type { Color } from '$lib/tokens';

	let {
		name,
		logo,
		photos = [],
		quote,
		overallRating,
		recommendRating,
		color
	}: {
		name: string;
		logo: string;
		photos?: (string | undefined)[];
		quote: string;
		overallRating: number;
		recommendRating: number;
		color: Color;
	} = $props();
</script>

<article
	class="testimonial"
	style="--accent: var(--color-viz-{color}); --accent-light: var(--color-viz-{color}-light);"
>
	<!-- Logo row -->
	<div class="logo-row">
		<img src={logo} alt="{name} logo" class="sponsor-logo" />
	</div>

	<!-- Photo strip -->
	<div class="photo-strip">
		{#each [0, 1] as pi}
			{#if photos[pi]}
				<img src={photos[pi]} alt="{name} event photo {pi + 1}" class="event-photo" />
			{:else}
				<div class="photo-placeholder" aria-hidden="true"></div>
			{/if}
		{/each}
	</div>

	<!-- Quote + ratings -->
	<div class="content">
		<blockquote class="quote">"{quote}"</blockquote>
		<div class="ratings">
			<div class="rating-row">
				<StarRating rating={overallRating} label="Overall Experience" />
			</div>
			<div class="rating-row">
				<StarRating rating={recommendRating} label="Recommend VizChitra" />
			</div>
		</div>
	</div>
</article>

<style>
	.testimonial {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid #e8e8e8;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		border-top: 3px solid var(--accent);
	}

	/* Logo */
	.logo-row {
		background: white;
		padding: 16px 20px;
		border-bottom: 1px solid #f0f0f0;
		display: flex;
		align-items: center;
		min-height: 64px;
	}

	.sponsor-logo {
		max-height: 40px;
		max-width: 160px;
		object-fit: contain;
		object-position: left center;
	}

	/* Photos */
	.photo-strip {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.event-photo,
	.photo-placeholder {
		aspect-ratio: 4 / 3;
		width: 100%;
		display: block;
	}

	.event-photo {
		object-fit: cover;
	}

	.photo-placeholder {
		background: #f0f0f0;
	}

	/* Content */
	.content {
		background: var(--accent-light);
		padding: 16px 20px;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.quote {
		font-family: var(--font-display);
		font-size: 13px;
		font-style: italic;
		line-height: 1.55;
		color: #333;
		margin: 0;
	}

	.ratings {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: auto;
	}

	.rating-row {
		display: flex;
		align-items: center;
	}
</style>
