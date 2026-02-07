<script lang="ts">
	interface Props {
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		align?: 'left' | 'center' | 'right';
		children?: import('svelte').Snippet;
		class?: string;
		href?: string;
		target?: string;
	}

	let {
		tag = 'h2',
		align = 'left',
		children,
		class: className = '',
		href,
		target = '_self'
	}: Props = $props();

	const rel = $derived(target === '_blank' ? 'noopener noreferrer' : undefined);

	const alignClasses = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};
</script>

<svelte:element this={tag} class="content-heading mb-4 {alignClasses[align]} {className}">
	{#if href}
		<a {href} {target} {rel} class="inline-flex items-center font-medium">
			{@render children?.()}
		</a>
	{:else}
		{@render children?.()}
	{/if}
</svelte:element>
