<script>
	export let contained = false;
	export let innerClass = '';
	export let containerClass = 'content-container';
	export let outerClass = '';
</script>

<div class={"full-bleed " + outerClass}>
	{#if contained}
		<div class={containerClass + (innerClass ? ' ' + innerClass : '')}>
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</div>
