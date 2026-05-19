<script lang="ts">
	import type { Color } from '$lib/tokens';

	let {
		rating,
		max = 5,
		label,
		color = 'orange'
	}: { rating: number; max?: number; label?: string; color?: Color } = $props();
</script>

<span
	class="star-rating"
	aria-label="{label ? label + ': ' : ''}{rating} out of {max} stars"
	style="--star-color: var(--color-viz-{color});"
>
	{#each { length: max } as _, i}
		<span class="star" class:star-filled={i < rating}>{i < rating ? '★' : '☆'}</span>
	{/each}
	{#if label}
		<span class="star-label">{label}</span>
	{/if}
</span>

<style>
	.star-rating {
		display: inline-flex;
		align-items: center;
		gap: 2px;
	}

	.star {
		font-size: 14px;
		color: color-mix(in oklch, var(--star-color) 35%, transparent);
		line-height: 1;
	}

	.star-filled {
		color: var(--star-color);
	}

	.star-label {
		font-family: var(--font-body);
		font-size: 12px;
		color: var(--color-viz-grey-dark);
		margin-left: 6px;
	}
</style>
