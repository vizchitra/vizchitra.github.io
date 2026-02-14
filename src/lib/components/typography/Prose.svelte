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
	style:--prose-accent-base={theme.base}
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
		--base-color: var(--prose-accent-base, var(--viz-color-grey-base));
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

		/* E. Blockquote spacing: Override lock rule for balanced spacing */
		& h1 + blockquote,
		& h2 + blockquote,
		& h3 + blockquote {
			margin-top: var(--space-flow-1);
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

		& blockquote {
			margin-block: var(--space-flow-1);
			margin-left: 0;
			margin-right: 0;

			max-width: 50ch; /* narrower book measure */
			padding-left: var(--space-flow-0); /* indent from the left */
			border-left: 2px solid var(--dark-color); /* book-style vertical line */

			font-size: var(--text-flow-0);
			line-height: 1.6;
			font-style: italic;

			color: var(--dark-color);
			text-align: left;
		}

		/* --- 3. SUB, SUP, & SMALL TEXT --- */

		& strong {
			font-weight: 450;
			font-style: italic;
			color: var(--dark-color);
		}

		& a {
			/* color: var(--dark-color); */
			text-decoration: underline;
			text-decoration-color: var(--muted-color);
			text-decoration-thickness: 2px;
			text-underline-offset: 0.35em;
			text-decoration-skip-ink: auto;
		}

		& a:hover {
			text-decoration-color: var(--dark-color);
			padding: 0.35em 0;
			background-color: var(--subtle-color);
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
			--list-track-ul: 1.5rem;
			--list-track-ol: 2.5rem;
			--list-font-weight: 350; /* Lightweight marker */

			list-style: none;
			padding-left: 0;
			margin-top: var(--space-flow--1);

			& li {
				position: relative;
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

			/* & li + li {
				margin-top: var(--space-flow--3);
			} */
		}

		/* --- 5a. UNORDERED: Thin Dash --- */
		& ul {
			& li {
				padding-left: var(--list-track-ul);
			}

			& li::before {
				content: '–'; /* En-dash for a light minimalist look */
			}
		}

		/* --- 5b. ORDERED: Tabular 01 --- */
		& ol {
			counter-reset: prose-counter;

			& li {
				counter-increment: prose-counter;
				padding-left: var(--list-track-ol);
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
			/* margin-top: var(--space-flow--2); */
			margin-top: 0;
			margin-bottom: 0;

			& li {
				padding-left: 2.3rem; /* Tighter track for nested items */
			}
		}

		& table {
			width: 100%;
			table-layout: fixed; /* 🔑 Required */
			border-collapse: collapse;
			margin-block: var(--space-flow-1);
			font-size: var(--text-flow--1);
			line-height: 1.25;
			border-bottom: 1px solid var(--muted-color);
			overflow-x: auto;
		}

		/* Cells */
		& table th,
		& table td {
			overflow-wrap: normal;
			word-break: normal;
		}

		/* First column narrow */
		& table th:first-child,
		& table td:first-child {
			width: 16%; /* adjust 12–22% */

			@media (width < 20rem) {
				width: 20%;
			}
		}

		/* Remaining columns equal */
		& table th:not(:first-child),
		& table td:not(:first-child) {
			width: auto; /* 🔑 ensures equal distribution */
		}

		& table thead th {
			padding: var(--space-flow--2) var(--space-flow--3);
			text-align: left;
			font-weight: 450;
			border-bottom: 1px solid var(--muted-color); /* The single separator line */
		}

		& table tbody td {
			padding: var(--space-flow--2) var(--space-flow--3); /* Tighter vertical padding */
			border-bottom: none; /* Removed for a cleaner look */
			vertical-align: top;
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
