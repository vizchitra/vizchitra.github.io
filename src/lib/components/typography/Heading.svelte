<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<h2 class="content-heading mb-4 text-center !text-[2rem] {className}">
	{@render children?.()}
</h2>
