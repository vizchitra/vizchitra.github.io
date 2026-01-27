<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		striped?: boolean;
		bordered?: boolean;
		hover?: boolean;
		class?: string;
		children?: Snippet;
	}

	let {
		striped = true,
		bordered = false,
		hover = true,
		class: className = '',
		children
	}: Props = $props();
</script>

<div class="table-wrapper">
	<table
		class="table {className}"
		class:table-striped={striped}
		class:table-bordered={bordered}
		class:table-hover={hover}
	>
		{@render children?.()}
	</table>
</div>

<style>
	.table-wrapper {
		overflow-x: auto;
		margin: var(--spacing-lg) 0;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-body);
		line-height: var(--leading-normal);
	}

	.table :global(th) {
		background-color: var(--color-grey-100);
		padding: var(--spacing-sm) var(--spacing-md);
		text-align: left;
		font-weight: var(--font-weight-semibold);
		border-bottom: 2px solid var(--color-grey-300);
	}

	.table :global(td) {
		padding: var(--spacing-sm) var(--spacing-md);
		border-bottom: 1px solid var(--color-grey-200);
	}

	.table :global(tr):last-child :global(td) {
		border-bottom: none;
	}

	.table-striped :global(tbody tr:nth-child(odd)) {
		background-color: var(--color-grey-100);
	}

	.table-bordered {
		border: 1px solid var(--color-grey);
	}

	.table-bordered :global(th),
	.table-bordered :global(td) {
		border: 1px solid var(--color-grey-200);
	}

	.table-hover :global(tbody tr):hover {
		background-color: var(--color-grey-200);
	}
</style>
