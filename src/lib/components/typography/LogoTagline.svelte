<script lang="ts">
	import VizchitraLogo from '$lib/assets/images/logos/viz-logo-animate.svg?raw';
	import Slanted from './Slanted.svelte';

	interface Props {
		textContent?: string;
	}

	let { textContent }: Props = $props();

	const showTagline = $derived(textContent && textContent !== 'none');
</script>

<div
	class="pointer-events-none flex flex-col items-center gap-0 rounded-sm bg-white/0 px-4 pt-2 pb-2 {showTagline
		? 'shadow-md md:flex-row md:gap-4 md:px-6 md:pt-3 md:pb-1'
		: ''}"
>
	<div class="logo shrink-0">
		{@html VizchitraLogo}
	</div>

	{#if showTagline}
		<div
			class="tagline max-w-[20ch] shrink-0 border-t pt-2 text-center leading-tight uppercase md:max-w-[22ch] md:border-t-0 md:border-l-2 md:pt-0 md:pl-4 md:text-left"
			style="border-color: var(--viz-color-grey-light);"
		>
			<h2>
				<Slanted color="pink" textContent={textContent || ''} />
			</h2>
		</div>
	{/if}
</div>

<style>
	.logo {
		width: 240px;
		height: auto;
		flex-shrink: 0;
	}

	@media (min-width: 768px) {
		.logo {
			width: 240px;
		}
	}
</style>
