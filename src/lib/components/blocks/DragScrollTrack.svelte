<script lang="ts">
	/**
	 * Generic horizontal drag-to-scroll container with navigation buttons.
	 * Supports mouse and touch drag interactions.
	 */
	import { onMount } from 'svelte';

	interface Props {
		/** Show navigation buttons */
		showButtons?: boolean;
		/** Hint text shown above track */
		hintText?: string;
		/** Scroll amount per button click (in pixels) */
		scrollAmount?: number;
		/** Additional CSS classes for container */
		class?: string;
		/** Content to render inside track */
		children?: import('svelte').Snippet;
	}

	let {
		showButtons = true,
		hintText = '',
		scrollAmount = 420,
		class: className = '',
		children
	}: Props = $props();

	let trackContainer: HTMLDivElement | undefined = undefined;
	let cardTrack: HTMLDivElement | undefined = undefined;
	let isDragging = $state(false);
	let startX = $state(0);
	let scrollLeft = $state(0);
	let atStart = $state(true);
	let atEnd = $state(false);
	let screenWidth = $state(0);

	onMount(() => {
		if (trackContainer) {
			updateScrollPosition();
		}
	});

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		cardTrack.classList.add('dragging');
		startX = event.pageX - cardTrack.offsetLeft;
		scrollLeft = trackContainer.scrollLeft;
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging) return;
		event.preventDefault();
		const dragThreshold = 15;
		const x = event.pageX - cardTrack.offsetLeft;
		const walk = (x - startX) * 1.5;
		if (Math.abs(x - startX) < dragThreshold) return;
		trackContainer.scrollLeft = scrollLeft - walk;
	}

	function scrollTrack(direction: 'left' | 'right') {
		if (trackContainer) {
			trackContainer.scrollBy({
				left: (direction === 'right' ? 1 : -1) * scrollAmount,
				behavior: 'smooth'
			});
		}
	}

	function handleMouseLeave() {
		isDragging = false;
		cardTrack?.classList.remove('dragging');
	}

	function handleMouseUp() {
		isDragging = false;
		cardTrack?.classList.remove('dragging');
	}

	function updateScrollPosition() {
		if (!trackContainer) return;
		const { scrollLeft: sl, scrollWidth, clientWidth } = trackContainer;
		atStart = sl < 20;
		atEnd = sl + clientWidth >= scrollWidth - 20;
	}

	const displayHint = $derived(
		hintText ||
			(screenWidth < 1000 ? 'Tap on the cards to learn more' : 'Click on the cards to learn more')
	);
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if hintText !== null}
	<div class="mb-sm gap-xs flex flex-row items-end">
		<!-- eslint-disable-line better-tailwindcss/no-restricted-classes, better-tailwindcss/no-unknown-classes -->
		<span class="text-grey block pb-px text-lg md:text-lg">
			{displayHint}
		</span>
		<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M15.5299 20.6648C15.6209 20.9255 15.906 21.0631 16.1668 20.9721L20.4155 19.4895C20.6762 19.3985 20.8138 19.1134 20.7228 18.8526C20.6319 18.5919 20.3467 18.4543 20.086 18.5453L16.3094 19.8632L14.9914 16.0866C14.9005 15.8258 14.6154 15.6882 14.3546 15.7792C14.0939 15.8702 13.9563 16.1553 14.0473 16.416L15.5299 20.6648ZM3.9998 5.99999L4.22341 6.4472C8.11498 4.5014 12.6393 4.55262 15.3118 6.70208C17.9167 8.79707 19.0096 13.1178 15.5517 20.2827L16.002 20.5L16.4523 20.7174C19.9924 13.3822 19.0843 8.45288 15.9386 5.92284C12.8605 3.44726 7.88477 3.49847 3.77619 5.55278L3.9998 5.99999Z"
				fill="currentColor"
				class="text-grey"
			/>
		</svg>
	</div>
{/if}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="mb-md relative max-w-full overflow-auto {className}"
	bind:this={trackContainer}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	onmouseup={handleMouseUp}
	onscroll={updateScrollPosition}
>
	<div class="drag-track gap-sm flex flex-row flex-nowrap hover:cursor-grab" bind:this={cardTrack}>
		<!-- eslint-disable-line better-tailwindcss/no-restricted-classes, better-tailwindcss/no-unknown-classes -->
		{@render children?.()}
	</div>
</div>

{#if showButtons && (atStart === false || atEnd === false)}
	<!-- eslint-disable-next-line better-tailwindcss/no-restricted-classes -->
	<div class="track-controls pl-sm sm:gap-sm gap-sm flex items-center self-start">
		<button
			onclick={() => scrollTrack('left')}
			disabled={atStart}
			class="size-xl border-grey bg-pink-light sm:size-2xl p-sm flex cursor-pointer items-center justify-center rounded-full border hover:opacity-70 disabled:bg-white disabled:opacity-60"
			aria-label="scroll left"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15 18L9 12L15 6"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		<button
			onclick={() => scrollTrack('right')}
			disabled={atEnd}
			class="size-xl border-grey bg-pink-light sm:size-2xl p-sm flex cursor-pointer items-center justify-center rounded-full border hover:opacity-70 disabled:bg-white disabled:opacity-60"
			aria-label="scroll right"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9 18L15 12L9 6"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
{/if}

<style>
	:global(.drag-track.dragging) {
		user-select: none;
		cursor: grabbing;
		scroll-behavior: smooth;
	}
</style>
