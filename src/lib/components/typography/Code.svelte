<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		lang?: string;
		inline?: boolean;
		children?: Snippet;
		class?: string;
	}

	let { lang, inline = false, children, class: className = '' }: Props = $props();
</script>

{#if inline}
	<code class="code-inline {className}">
		{@render children?.()}
	</code>
{:else}
	<pre class="code-block code-lang-{lang || 'plain'} {className}"><code class="code-content"
			>{@render children?.()}</code
		></pre>
{/if}

<style>
	.code-inline {
		font-family: var(--font-mono);
		background-color: var(--color-grey-light);
		color: var(--color-black);
		padding: 0.125rem 0.5rem;
		border-radius: var(--radius-md);
		font-size: 0.9em;
		white-space: nowrap;
		overflow-x: auto;
	}

	.code-block {
		font-family: var(--font-mono);
		background-color: var(--color-grey-light);
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		overflow-x: auto;
		margin: var(--spacing-lg) 0;
		font-size: 0.875em;
		line-height: 1.5;
		color: var(--color-black);
		border-left: 4px solid var(--color-blue);
	}

	.code-content {
		display: block;
		color: inherit;
	}

	/* Language-specific syntax highlighting (basic) */
	.code-lang-js :global(strong),
	.code-lang-javascript :global(strong),
	.code-lang-svelte :global(strong) {
		color: var(--color-pink-dark);
		font-weight: var(--font-weight-semibold);
	}

	.code-lang-python :global(strong) {
		color: var(--color-blue-dark);
		font-weight: var(--font-weight-semibold);
	}

	/* Scrollbar styling for code blocks */
	.code-block::-webkit-scrollbar {
		height: 6px;
	}

	.code-block::-webkit-scrollbar-track {
		background: transparent;
	}

	.code-block::-webkit-scrollbar-thumb {
		background: var(--color-grey);
		border-radius: 3px;
	}

	.code-block::-webkit-scrollbar-thumb:hover {
		background: var(--color-grey-dark);
	}
</style>
