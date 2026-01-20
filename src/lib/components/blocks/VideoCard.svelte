<script lang="ts">
	import { Stack } from '$lib/components';

	interface Props {
		id: string;
		title: string;
		subtitle?: string;
		thumbnail: string;
		speaker?: string;
		hook?: string;
		decoration?: string;
		variant?: 'default' | 'compact';
		onClick?: (id: string) => void;
	}

	let {
		id,
		title,
		subtitle,
		thumbnail,
		speaker,
		hook,
		decoration,
		variant = 'default',
		onClick
	}: Props = $props();

	const handleClick = () => {
		if (onClick) {
			onClick(id);
		} else {
			window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
		}
	};

	const cardHeight = $derived(variant === 'compact' ? '400px' : '500px');
	const titleHeight = $derived(variant === 'compact' ? '80px' : '100px');
	const thumbnailHeight = $derived(variant === 'compact' ? '150px' : '200px');
	const footerHeight = $derived(variant === 'compact' ? '120px' : '160px');
</script>

<div
	class="relative rounded-md border border-black/20 bg-white transition-all duration-300 ease-in-out hover:border-gray-300 hover:shadow-xl"
	style="height: {cardHeight}; display: flex; flex-direction: column;"
>
	{#if decoration}
		<div
			class="pointer-events-none absolute inset-0 z-1 rounded-md opacity-50"
			style="background-image: url({decoration}); background-repeat: no-repeat; background-position: bottom left; background-size: 320px;"
		></div>
	{/if}

	<button
		type="button"
		onclick={handleClick}
		class="relative z-10 h-full w-full cursor-pointer border-none bg-transparent text-left transition outline-none"
	>
		<Stack space="sm" class="h-full w-full rounded-xl">
			<div class="video-title flex-shrink-0 p-sm pb-sm" style="height: {titleHeight};">
				<h3 class="text-viz-orange-dark line-clamp-4 text-xl font-bold leading-tight">
					{title}
					{#if subtitle}
						<span class="text-md font-normal">{subtitle}</span>
					{/if}
				</h3>
			</div>

			<div class="video-thumbnail mx-sm mb-sm flex-shrink-0 overflow-hidden rounded-sm bg-black" style="height: {thumbnailHeight};">
				<img src={thumbnail} alt={title} class="h-full w-full object-cover" />
			</div>

			{#if speaker || hook}
				<div class="video-footer flex-shrink-0 px-md pb-md" style="height: {footerHeight}; display: flex; flex-direction: column; justify-content: space-between;">
					<div class="text-right">
						{#if speaker}
							<div class="text-xl font-bold leading-tight text-balance text-gray-800">
								{speaker}
							</div>
						{/if}
						{#if hook}
							<p class="mt-xs line-clamp-3 text-base font-italic leading-tight text-balance text-gray-600">
								{hook}
							</p>
						{/if}
					</div>
				</div>
			{/if}
		</Stack>
	</button>
</div>
