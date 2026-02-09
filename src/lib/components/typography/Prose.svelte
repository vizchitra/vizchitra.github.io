<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, ClassValue } from 'svelte/elements';
	import { getTheme, type Color } from '$lib/tokens';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: ClassValue;
		color?: Color;
		children?: Snippet;
	}

	let { class: className = '', color = 'grey', children, ...rest }: Props = $props();

	const theme = $derived(getTheme(color));
</script>

<div
	{...rest}
	class={['prose', className]}
	style:--prose-accent-dark={theme.dark}
	style:--prose-accent-light={theme.light}
	style:--prose-accent-muted={theme.muted}
	style:--prose-accent-subtle={theme.subtle}
>
	{@render children?.()}
</div>

<style>
	.prose :global {
		/* Scoped variables  */
		--light-color: var(--prose-accent-light, var(--viz-color-grey-light));
		--dark-color: var(--prose-accent-dark, var(--color-viz-grey-dark));
		--muted-color: var(--prose-accent-muted, var(--color-viz-grey-muted));
		--subtle-color: var(--prose-accent-subtle, var(--color-viz-grey-subtle));

		/* Base Font & Color */
		font-family: var(--font-plex);
		font-size: var(--text-flow-0);
		line-height: 1.75;
		color: var(--color-viz-black);

		/* Layout Constraints */
		display: block;
		width: 100%;
		max-width: 65ch;
		margin-inline-start: 0;
		margin-inline-end: auto;
		text-align: left;

		/* --- 1. VERTICAL RHYTHM & STACKING --- */

		/* A. The General Stack: Apply to everything first */
		& > * + * {
			margin-top: var(--space-flow-0);
		}

		/* B. The Entry: Extra room BEFORE headings */
		/* We target the heading itself when it follows any element */
		& > * + :is(h1, h2, h3, h4) {
			margin-top: var(--space-flow-3);
		}

		& > * + :is(h5, h6) {
			margin-top: var(--space-flow-2);
		}

		/* C. The Lock: Tighten the gap AFTER headings */
		/* By using the adjacent sibling selector (+) on the element AFTER the heading, 
   we override the general stack rule naturally through source order. */
		& h1 + *,
		& h2 + *,
		& h3 + * {
			margin-top: var(--space-flow--1);
		}

		/* D. The Lead Lock: Even tighter for the H1-to-Lead relationship */
		/* This specific selector wins over the general rule above */
		& h1 + p {
			margin-top: var(--space-flow--2);
			font-size: var(--text-flow-1);
			line-height: 1.45;
			color: var(--color-viz-grey-dark);
		}

		/* --- 2. TYPOGRAPHY & LEAD PARAGRAPH --- */

		/* Headings */
		& h1,
		& h2,
		& h3,
		& h4,
		& h5,
		& h6 {
			font-family: var(--font-cairo);
			line-height: 1.25;
			/* letter-spacing: -0.01em; */
			text-wrap: balance;
			color: var(--dark-color);
		}

		/* Heading Scale Mapping */
		& h1 {
			font-size: var(--text-flow-5);
			font-weight: 350;
			letter-spacing: -0.01em;
		}
		& h2 {
			font-size: var(--text-flow-3);
			font-weight: 350;
		}
		& h3 {
			font-size: var(--text-flow-2);
			font-weight: 350;
		}
		& h4 {
			font-size: var(--text-flow-1);
			font-weight: 550;
		}
		& h5 {
			font-size: var(--text-flow-0);
			font-weight: 650;
			letter-spacing: 0.05em;
		}
		& h6 {
			font-size: var(--text-flow--1);
			font-weight: 750;
			text-transform: uppercase;
			letter-spacing: 0.1em;
		}

		& p {
			font-size: var(--text-flow-0);
			font-weight: 400;
			line-height: 1.6;
			letter-spacing: -0.005em;
		}

		/* --- 3. SUB, SUP, & SMALL TEXT --- */

		& strong {
			font-weight: 550;
			font-style: italic;
			color: var(--dark-color);
		}

		/* Maintain line-height while using scripts */
		& sub,
		& sup {
			font-size: 0.75em;
			line-height: 0;
			position: relative;
			vertical-align: baseline;
		}

		& sup {
			top: -0.5em;
		}
		& sub {
			bottom: -0.25em;
		}

		& figcaption {
			font-size: var(--text-flow--1);
			color: var(--dark-color);
			font-style: italic;
			margin-top: var(--space-flow--1);
		}

		/* --- 4. MEDIA & CODE --- */

		& img {
			max-width: 100%;
			height: auto;
			border-radius: var(--space-flow--2);
			display: block;
		}

		& figure {
			margin-block: var(--space-flow-1);
		}

		/* Inline Code */
		& code {
			font-family: var(--font-fira);
			font-size: 0.875em;
			color: var(--dark-color);
			word-break: break-word;
			letter-spacing: -0.02em;
			line-height: 1;
			vertical-align: baseline;
			position: relative;

			/* The Finish */
			top: -0.05em; /* Lifts it slightly to visually center with lowercase x-height */
			padding: 0.1em 0.3em;
			background-color: var(--light-color); /* or a 5% opacity black */
			border-radius: 0.25rem;
		}

		/* Code Blocks */
		& pre {
			background-color: #f8f9fa;
			border: 1px solid rgba(0, 0, 0, 0.05);
			border-radius: 8px;
			padding: var(--space-flow-0);
			overflow-x: auto;
			margin-block: var(--space-flow-1);

			& code {
				background-color: transparent;
				padding: 0;
				color: inherit;
				font-size: var(--text-flow--1);
			}
		}

		/* --- 5. LISTS & TABLES --- */

		/* --- 5. LISTS (UNIVERSAL) --- */

		& ul,
		& ol {
			/* ── Component-scoped tokens ── */
			--list-track: 2.5rem;
			--list-font-weight: 350; /* Lightweight marker */

			list-style: none;
			padding-left: 0;
			margin-top: var(--space-flow--1);

			& li {
				position: relative;
				padding-left: var(--list-track);
				font-family: var(--font-plex); /* Copy font */
			}

			/* & li strong {
				color: var(--dark-color);
			} */

			& li::before {
				position: absolute;
				left: 0;
				font-weight: var(--list-font-weight);
				color: var(--dark-color);
			}

			& li + li {
				margin-top: var(--space-flow--2);
			}
		}

		/* --- 5a. UNORDERED: Thin Dash --- */
		& ul {
			& li::before {
				content: '–'; /* En-dash for a light minimalist look */
			}
		}

		/* --- 5b. ORDERED: Tabular 01 --- */
		& ol {
			counter-reset: prose-counter;

			& li {
				counter-increment: prose-counter;
			}

			& li::before {
				/* decimal-leading-zero creates the "01" effect */
				content: counter(prose-counter, decimal-leading-zero) '.';

				/* Forces numbers to occupy equal width for perfect vertical alignment */
				font-variant-numeric: tabular-nums;

				/* Optical alignment: aligns the number's baseline with the text */
				top: 0;
			}
		}

		/* --- 5c. NESTING --- */
		& :is(ul, ol) :is(ul, ol) {
			margin-top: var(--space-flow--2);
			margin-bottom: 0;

			& li {
				padding-left: 2.3rem; /* Tighter track for nested items */
			}
		}

		& table {
			width: 100%;
			border-collapse: collapse;
			margin-block: var(--space-flow-1);
			font-size: var(--text-flow--1);
			line-height: 1.1;
			border-bottom: 1px solid var(--prose-accent-muted, var(--color-viz-grey-muted));

			& thead th {
				padding: var(--space-flow--1) 0;
				text-align: left;
				font-weight: 700;
				border-bottom: 1px solid var(--color-viz-black); /* The single separator line */
			}

			& tbody td {
				padding: var(--space-flow--2) 0; /* Tighter vertical padding */
				border-bottom: none; /* Removed for a cleaner look */
				vertical-align: top;
			}
		}

		/* --- 6. DIRECTIVE STYLES --- */

		/* Notice container - uses theme color from CSS variables */
		& .notice {
			padding: var(--space-flow-0);
			border-radius: var(--space-flow--2);
			margin-block: var(--space-flow-1);
			background-color: var(--subtle-color);
			border-left: 4px solid var(--dark-color);
			--notice-size: var(--text-flow--1);
			font-size: var(--notice-size);
		}

		.notice * {
			font-size: var(--notice-size);
			margin-bottom: var(--space-flow--1);
		}

		/* HR separator - uses theme color */
		& .hr {
			border: none;
			height: 2px;
			margin-block: var(--space-flow-2);
			background-color: var(--dark-color);
		}

		/* Spacer - fixed size (no attribute needed) */
		& .spacer {
			height: var(--space-flow-2); /* default md size */
			width: 100%;
		}

		/* Slanted text - uses theme color and slanted.ts for per-letter variation */
		& .slanted {
			display: inline-block;
			font-family: var(--font-cairo);
			font-weight: 350;
			color: var(--dark-color);
			white-space: pre-wrap; /* Preserve spaces between words */

			/* Per-letter slant from slanted.ts */
			& .slanted-text {
				display: inline-block;
				font-variation-settings: 'slnt' var(--letter-slant);
				white-space: pre; /* Preserve spaces within each span */
			}
		}

		/* Color text - ONLY directive with data-color attribute */
		& .color {
			font-weight: 550;

			/* Specific color overrides */
			&[data-color='grey'] {
				color: var(--color-viz-grey-dark);
			}
			&[data-color='pink'] {
				color: var(--color-viz-pink-dark);
			}
			&[data-color='blue'] {
				color: var(--color-viz-blue-dark);
			}
			&[data-color='teal'] {
				color: var(--color-viz-teal-dark);
			}
			&[data-color='yellow'] {
				color: var(--color-viz-yellow-dark);
			}
			&[data-color='orange'] {
				color: var(--color-viz-orange-dark);
			}
		}
	}
</style>
