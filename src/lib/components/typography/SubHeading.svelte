<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<p class="content-text mx-auto max-w-2xl text-center {className}">
	{@render children?.()}
</p>
