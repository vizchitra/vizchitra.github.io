<script lang="ts">
	import VizchitraLogo from '$lib/assets/images/logos/viz-logo-animate.svg?raw';
	import Slanted from './Slanted.svelte';

	interface Props {
		textContent?: string;
		tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
	}

	let { textContent, tag = 'span' }: Props = $props();

	// Map tag to appropriate text size classes
	const tagSizeClasses: Record<string, string> = {
		h1: 'text-lg md:text-2xl',
		h2: 'text-base md:text-xl',
		h3: 'text-sm md:text-lg',
		h4: 'text-xs md:text-base',
		span: 'text-xs md:text-sm',
		p: 'text-xs md:text-sm'
	};

	const sizeClass = $derived(tagSizeClasses[tag] || tagSizeClasses.span);
	const showTagline = $derived(textContent && textContent !== 'none');
</script>

<div
	class="pointer-events-none flex flex-col items-center gap-0 rounded-sm bg-white/0 px-4 pt-2 pb-2 {showTagline
		? 'shadow-md md:flex-row md:gap-4 md:px-6 md:pt-3 md:pb-1'
		: ''}"
>
	<div class="logo flex-shrink-0">
		{@html VizchitraLogo}
	</div>

	{#if showTagline}
		<div
			class="tagline max-w-[20ch] flex-shrink-0 border-t pt-2 text-center leading-tight uppercase {sizeClass} md:max-w-[22ch] md:border-t-0 md:border-l-2 md:pt-0 md:pl-4 md:text-left"
			style="border-color: var(--viz-color-grey-light);"
		>
			<Slanted {tag} color="pink" textContent={textContent || ''} />
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
