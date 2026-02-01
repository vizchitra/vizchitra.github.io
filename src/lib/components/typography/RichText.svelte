<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		trimEdges?: boolean;
		class?: ClassValue;
		children?: Snippet;
	}

	let { trimEdges = false, class: className = '', children, ...rest }: Props = $props();
</script>

<div {...rest} class={['richtext', className]} data-reset-margins={trimEdges}>
	{@render children?.()}
</div>

<style>
	.richtext {
		/* Base Font & Color */
		font-size: var(--font-size-md);
		line-height: 1.6;
		color: var(--viz-color-black);
		display: flex;
		flex-direction: column;

		/* Layout Constraints */
		max-width: var(--width-prose, 70ch);
		margin-inline: auto;
	}

	/* --- 1. THE STACK PATTERN (Fluid Vertical Rhythm) --- */

	/* Default spacing between all top-level elements */
	.richtext :global(> * + *) {
		margin-top: var(--spacing-md);
	}

	/* Extra breathing room before headings to denote new sections */
	.richtext :global(> * + :is(h1, h2, h3, h4)) {
		margin-top: var(--spacing-xl);
	}

	/* Tighter spacing for repeated small elements */
	.richtext :global(:where(li) + :where(li)),
	.richtext :global(:where(figcaption)) {
		margin-top: var(--spacing-xs);
	}

	/* Margin Reset Logic */
	.richtext[data-reset-margins='true'] :global(> *:first-child) {
		margin-top: 0;
	}
	.richtext[data-reset-margins='true'] :global(> *:last-child) {
		margin-bottom: 0;
	}

	/* --- 2. TYPOGRAPHY & LEAD PARAGRAPH --- */

	.richtext :global(:where(h1, h2, h3, h4, h5, h6)) {
		font-weight: 700;
		line-height: 1.2;
		text-wrap: balance;
		color: var(--viz-color-black);
	}

	/* Heading Scale Mapping */
	.richtext :global(:where(h1)) {
		font-size: var(--font-size-4xl);
	}
	.richtext :global(:where(h2)) {
		font-size: var(--font-size-3xl);
	}
	.richtext :global(:where(h3)) {
		font-size: var(--font-size-2xl);
	}
	.richtext :global(:where(h4)) {
		font-size: var(--font-size-xl);
	}
	.richtext :global(:where(h5)) {
		font-size: var(--font-size-lg);
	}
	.richtext :global(:where(h6)) {
		font-size: var(--font-size-md);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* The "Lead" Paragraph: Automatically styles the paragraph immediately following an H1 */
	.richtext :global(:where(h1) + :where(p)) {
		font-size: var(--font-size-lg);
		line-height: 1.5;
		color: var(--viz-color-grey-dark);
	}

	/* --- 3. SUB, SUP, & SMALL TEXT --- */

	/* Maintain line-height while using scripts */
	.richtext :global(:where(sub, sup)) {
		font-size: 0.75em;
		line-height: 0;
		position: relative;
		vertical-align: baseline;
	}

	.richtext :global(:where(sup)) {
		top: -0.5em;
	}
	.richtext :global(:where(sub)) {
		bottom: -0.25em;
	}

	.richtext :global(:where(figcaption)) {
		font-size: var(--font-size-sm);
		color: var(--viz-color-grey-dark);
		font-style: italic;
	}

	/* --- 4. MEDIA & CODE --- */

	.richtext :global(:where(img)) {
		max-width: 100%;
		height: auto;
		border-radius: var(--spacing-xs);
		display: block;
	}

	.richtext :global(:where(figure)) {
		margin-block: var(--spacing-lg);
	}

	/* Inline Code */
	.richtext :global(:where(code)) {
		font-family: var(--font-body-mono, monospace);
		font-size: 0.9em;
		color: var(--viz-color-pink-dark);
		background-color: rgba(0, 0, 0, 0.05);
		padding: 0.2em 0.4em;
		border-radius: 4px;
		word-break: break-word;
	}

	/* Code Blocks */
	.richtext :global(:where(pre)) {
		background-color: #f8f9fa; /* Or your viz-color-grey-light */
		border: 1px solid rgba(0, 0, 0, 0.05);
		border-radius: 8px;
		padding: var(--spacing-md);
		overflow-x: auto;
		margin-block: var(--spacing-lg);
	}

	.richtext :global(:where(pre) :where(code)) {
		background-color: transparent;
		padding: 0;
		color: inherit;
		font-size: var(--font-size-sm);
	}

	/* --- 5. LISTS & TABLES --- */

	.richtext :global(:where(ul, ol)) {
		padding-left: var(--spacing-lg);
	}

	.richtext :global(:where(li)::marker) {
		color: var(--viz-color-grey-dark);
		font-weight: 600;
	}

	.richtext :global(:where(table)) {
		width: 100%;
		border-collapse: collapse;
		margin-block: var(--spacing-lg);
		font-size: var(--font-size-sm);
		line-height: 1.4;
	}

	.richtext :global(:where(thead) :where(th)) {
		padding: var(--spacing-sm);
		text-align: left;
		background-color: rgba(0, 0, 0, 0.02);
		border-bottom: 2px solid var(--viz-color-grey);
	}

	.richtext :global(:where(tbody) :where(td)) {
		padding: var(--spacing-sm);
		border-bottom: 1px solid var(--viz-color-grey-light);
	}
</style>
