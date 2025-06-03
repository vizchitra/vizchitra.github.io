<script>
	import SpeakerCard from '../SpeakerCard/SpeakerCard.svelte';
	import sessionsData from '$lib/data/vizchitra-sessions.csv';
	import arrowLeft from '$lib/assets/images/icons/arrow-left.svg?raw';
	import arrowRight from '$lib/assets/images/icons/arrow-right.svg?raw';

	const speakerInfo = sessionsData.filter((s) => s.talkType === 'talk');

	let trackContainer;
	let speakerTrack;
	let isDragging = false;
	let startX;
	let scrollLeft;
	let atStart = true;
	let atEnd = false;

	function handleMouseDown(event) {
		isDragging = true;
		speakerTrack.classList.add('dragging');
		startX = event.pageX - speakerTrack.offsetLeft;
		scrollLeft = trackContainer.scrollLeft;
	}

	function handleMouseMove(event) {
		if (!isDragging) return;
		event.preventDefault();
		const dragThreshold = 15;
		const x = event.pageX - speakerTrack.offsetLeft;
		const walk = (x - startX) * 1.5;
		if (Math.abs(x - startX) < dragThreshold) return;
		trackContainer.scrollLeft = scrollLeft - walk;
	}

	function scrollTrack(direction) {
		if (trackContainer) {
			const scrollAmount = 420;
			trackContainer.scrollBy({
				left: (direction === 'right' ? 1 : -1) * scrollAmount,
				behavior: 'smooth'
			});
		}
	}

	function handleMouseLeave() {
		isDragging = false;
		speakerTrack.classList.remove('dragging');
	}

	function handleMouseUp() {
		isDragging = false;
		speakerTrack.classList.remove('dragging');
	}

	function updateScrollPosition() {
		if (!trackContainer) return;
		const { scrollLeft, scrollWidth, clientWidth } = trackContainer;

		atStart = scrollLeft < 20;
		atEnd = scrollLeft + clientWidth >= scrollWidth - 20;
	}
</script>

<div class="max-w-[100%] overflow-auto">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="mb-6 max-w-[100%] overflow-auto"
		bind:this={trackContainer}
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseleave={handleMouseLeave}
		on:mouseup={handleMouseUp}
		on:scroll={updateScrollPosition}
	>
		<div
			class="speaker-track flex flex-row flex-nowrap gap-4 hover:cursor-grab"
			bind:this={speakerTrack}
		>
			{#each speakerInfo as speaker, index (speaker.name)}
				<SpeakerCard data={speaker}></SpeakerCard>
			{/each}
		</div>
	</div>

	<div class="track-controls flex items-center gap-3 self-start pl-4 sm:gap-4">
		<button
			on:click={() => scrollTrack('left')}
			disabled={atStart}
			class="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border-[1px] border-[#999] bg-[#F5C7C7] p-3 hover:opacity-70 disabled:bg-white disabled:opacity-60 sm:h-[75px] sm:w-[75px]"
			aria-label="scroll left">{@html arrowLeft}</button
		>
		<button
			on:click={() => scrollTrack('right')}
			disabled={atEnd}
			class="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border-[1px] border-[#999] bg-[#F5C7C7] p-3 hover:opacity-70 disabled:bg-white disabled:opacity-60 sm:h-[75px] sm:w-[75px]"
			aria-label="scroll right">{@html arrowRight}</button
		>
	</div>
</div>

<style>
	:global(.speaker-track.dragging) {
		user-select: none;
		cursor: grabbing;
		scroll-behavior: smooth;
	}
</style>
