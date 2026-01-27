<script lang="ts">
	import { Slanted, Cluster, Stack, InlineSvg } from '$lib/components';

	interface Props {
		text?: string;
		tag?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
	}

	let { text, tag = 'span' }: Props = $props();

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
	const showTagline = $derived(text && text !== 'none');
</script>

<div
	class="px-sm pt-xs pb-xs rounded-sm bg-white/0 {showTagline
		? 'md:px-md md:pt-sm md:pb-xs shadow-md'
		: ''}"
>
	{#if showTagline}
		<!-- Responsive composition using primitives -->
		<div class="md:hidden">
			<Stack space="xs" class="items-center">
				<div class="logo">
					<InlineSvg name="viz-logo-animate.svg" />
				</div>
				<div
					class="tagline tagline-width pt-xs border-t text-center leading-tight uppercase {sizeClass}"
					style="border-color: var(--viz-color-grey-light);"
				>
					<Slanted text={text || ''} />
				</div>
			</Stack>
		</div>

		<div class="hidden md:block">
			<Cluster space="sm" align="center">
				<div class="logo">
					<InlineSvg name="viz-logo-animate.svg" />
				</div>
				<div
					class="tagline tagline-width pl-sm border-l-2 text-left leading-tight uppercase {sizeClass}"
					style="border-color: var(--viz-color-grey-light);"
				>
					<Slanted text={text || ''} />
				</div>
			</Cluster>
		</div>
	{:else}
		<div class="logo mx-auto">
			<InlineSvg name="viz-logo-animate.svg" />
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

	.tagline-width {
		max-width: 20ch;
	}

	@media (min-width: 768px) {
		.tagline-width {
			max-width: 22ch;
		}
	}
</style>
