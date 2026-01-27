<script lang="ts">
	import { type Color } from '$lib/utils/colorTokens';

	interface Props {
		href?: string;
		external?: boolean;
		color?: Color;
		variant?: 'solid' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		href,
		external = false,
		color = 'orange',
		variant = 'solid',
		size = 'md',
		class: className = '',
		children
	}: Props = $props();

	// Constrained color map to prevent arbitrary CSS injection
	const colorVars: Record<Color, string> = {
		pink: 'var(--color-pink)',
		blue: 'var(--color-blue)',
		yellow: 'var(--color-yellow)',
		teal: 'var(--color-teal)',
		orange: 'var(--color-orange)'
	};

	const style = $derived(`--btn-color: ${colorVars[color]};`);
</script>

{#if href}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		class="btn not-prose {className}"
		data-variant={variant}
		data-size={size}
		{style}
	>
		{@render children?.()}
		{#if external}
			<span class="btn-external-icon">↗</span>
		{/if}
	</a>
{:else}
	<button
		type="button"
		class="btn not-prose {className}"
		data-variant={variant}
		data-size={size}
		{style}
	>
		{@render children?.()}
	</button>
{/if}

<style>
	.btn {
		/* Base Layout */
		display: inline-flex;
		align-items: center;
		justify-content: center;

		/* Base Appearance */
		border-radius: var(--radius-sm);
		text-align: center;
		font-weight: var(--font-weight-semibold);
		text-decoration: none;
		border: 1px solid transparent; /* Ensure consistent box model */
		cursor: pointer;

		/* Transitions */
		transition-property: transform, box-shadow, background-color, color, border-color;
		transition-duration: 200ms;
		transition-timing-function: ease-in-out;
	}

	/* Size Variants */
	.btn[data-size='sm'] {
		font-size: var(--font-size-sm);
		padding: var(--spacing-xs) var(--spacing-sm);
	}

	.btn[data-size='md'] {
		font-size: var(--font-size-base);
		padding: var(--spacing-sm) var(--spacing-md);
	}

	.btn[data-size='lg'] {
		font-size: var(--font-size-lg);
		padding: var(--spacing-md) var(--spacing-lg);
	}

	/* Interactive States */
	.btn:active {
		transform: translateY(0);
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-black);
		outline-offset: 2px;
	}

	/* SOLID VARIANT */
	.btn[data-variant='solid'] {
		background-color: var(--btn-color);
		color: var(--color-white); /* Fallback */
		color: contrast-color(var(--btn-color));
	}

	.btn[data-variant='solid']:hover {
		/* Darken slightly using relative color syntax */
		background-color: oklch(from var(--btn-color) calc(l - 0.05) c h);
		color: var(--color-white); /* Fallback */
		color: contrast-color(var(--btn-color));
		transform: translateY(-0.125rem);
		box-shadow: var(--shadow-md);
	}

	/* OUTLINE VARIANT */
	.btn[data-variant='outline'] {
		background-color: transparent;
		border-color: var(--btn-color);
		color: var(--btn-color);
	}

	.btn[data-variant='outline']:hover {
		background-color: oklch(from var(--btn-color) l c h / 0.1); /* 10% opacity background */
		transform: translateY(-0.125rem);
		box-shadow: var(--shadow-sm);
	}

	/* GHOST VARIANT */
	.btn[data-variant='ghost'] {
		background-color: transparent;
		color: var(--btn-color);
	}

	.btn[data-variant='ghost']:hover {
		background-color: oklch(from var(--btn-color) l c h / 0.1);
	}

	/*Icon spacing*/
	.btn-external-icon {
		margin-left: var(--spacing-xs);
		font-size: 0.8em;
	}
</style>
