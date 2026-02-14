<script lang="ts">
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	/**
	 * ColorSwatch - Displays a color swatch with optional label
	 *
	 * @prop color - CSS color value (var, hex, etc.)
	 * @prop label - Optional label to display below the swatch
	 * @prop size - Size variant ('small' | 'medium' | 'large')
	 */
	interface Props extends HTMLAttributes<HTMLDivElement> {
		color: string;
		label?: string;
		size?: 'small' | 'medium' | 'large';
		class?: ClassValue;
	}

	let { color, label, size = 'medium', class: className = '', ...rest }: Props = $props();
</script>

<div {...rest} class={['swatch', className]} data-size={size}>
	<div class="swatch-box" style:background-color={color}></div>
	{#if label}
		<div class="swatch-label">{label}</div>
	{/if}
</div>

<style>
	.swatch {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.swatch-box {
		border-radius: 0.5rem;
		border: 1px solid var(--color-grey-300);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.swatch[data-size='small'] .swatch-box {
		width: 3rem;
		height: 3rem;
	}

	.swatch[data-size='medium'] .swatch-box {
		width: 8rem;
		height: 4rem;
	}

	.swatch[data-size='large'] .swatch-box {
		width: 10rem;
		height: 6rem;
	}

	.swatch-label {
		font-family: var(--font-mono);
		font-size: var(--text-flow--2);
		color: var(--color-grey-800);
		text-align: center;
	}
</style>
