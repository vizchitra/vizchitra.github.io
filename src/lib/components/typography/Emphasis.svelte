<script lang="ts">
	import type { Snippet } from 'svelte';

	type Type = 'strong' | 'em' | 'mark' | 'del';

	interface Props {
		type?: Type;
		color?: string;
		children?: Snippet;
		class?: string;
	}

	let { type = 'strong', color, class: className = '', children }: Props = $props();
</script>

{#if type === 'strong'}
	<strong
		class="emphasis emphasis-strong {className}"
		style:--emphasis-color={color ? `var(--color-${color})` : undefined}
	>
		{@render children?.()}
	</strong>
{:else if type === 'em'}
	<em
		class="emphasis emphasis-em {className}"
		style:--emphasis-color={color ? `var(--color-${color})` : undefined}
	>
		{@render children?.()}
	</em>
{:else if type === 'mark'}
	<mark
		class="emphasis emphasis-mark {className}"
		style:--emphasis-color={color ? `var(--color-${color})` : undefined}
	>
		{@render children?.()}
	</mark>
{:else if type === 'del'}
	<del
		class="emphasis emphasis-del {className}"
		style:--emphasis-color={color ? `var(--color-${color})` : undefined}
	>
		{@render children?.()}
	</del>
{/if}

<style>
	.emphasis {
		--emphasis-color: currentColor;
		color: var(--emphasis-color);
	}

	.emphasis-strong {
		font-weight: var(--font-weight-bold);
	}

	.emphasis-em {
		font-style: italic;
	}

	.emphasis-mark {
		background-color: rgba(var(--color-yellow), 0.3);
		padding: 0.125rem 0.25rem;
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-medium);
	}

	.emphasis-del {
		text-decoration: line-through;
		opacity: 0.7;
	}
</style>
