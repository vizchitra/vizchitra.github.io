<script lang="ts">
	interface Props {
		containerWidth?: null | string;
		content?: import('svelte').Snippet;
	}

	let { containerWidth = null, content }: Props = $props();
</script>

<div
	class="content-container flex w-full flex-col gap-xs {containerWidth === 'full'
		? 'w-full max-w-none'
		: 'w-full max-w-3xl'}"
>
	{@render content?.()}
</div>
