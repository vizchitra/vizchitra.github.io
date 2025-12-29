<script lang="ts">
	export let containerWidth: null | string = null;
</script>

<div
	class="content-container flex w-full flex-col gap-2 {containerWidth === 'full'
		? 'w-full !max-w-[unset]'
		: 'w-full !max-w-[750px]'}"
>
	<slot name="content"></slot>
</div>
