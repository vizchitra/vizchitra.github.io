<script lang="ts">
	interface Props {
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		align?: 'left' | 'center' | 'right';
		children?: import('svelte').Snippet;
		class?: string;
	}

	let {
		tag = 'h2',
		align = 'center',
		children,
		class: className = ''
	}: Props = $props();

	const alignClasses = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right'
	};
</script>

<svelte:element
	this={tag}
	class="content-heading mb-4 {alignClasses[align]} {className}"
>
	{@render children?.()}
</svelte:element>
