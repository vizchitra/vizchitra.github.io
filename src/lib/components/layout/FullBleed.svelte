<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [contained]
	 * @property {string} [innerClass]
	 * @property {string} [containerClass]
	 * @property {string} [outerClass]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		contained = false,
		innerClass = '',
		containerClass = 'content-container',
		outerClass = '',
		children
	} = $props();
</script>

<div class={'full-bleed ' + outerClass}>
	{#if contained}
		<div class={containerClass + (innerClass ? ' ' + innerClass : '')}>
			{@render children?.()}
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>
