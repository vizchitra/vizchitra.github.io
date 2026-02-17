<script lang="ts">
	interface Props {
		containerWidth?: null | string;
		content?: import('svelte').Snippet;
	}

	let { containerWidth = null, content }: Props = $props();
</script>

<div
	class="content-container flex w-full flex-col gap-2 {containerWidth === 'full'
		? 'w-full !max-w-[unset]'
		: 'w-full !max-w-[750px]'}"
>
	{@render content?.()}
</div>
