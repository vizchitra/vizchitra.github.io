<script>
	import SpeakerPentagon from './SpeakerPentagon.svelte';
	import SpeakerDetailsModal from './SpeakerDetailsModal.svelte';

	import CalendarIcon from '$lib/assets/images/icons/calendar.svg?raw';
	import LocationIcon from '$lib/assets/images/icons/location.svg?raw';

	export let data = {};
	export let dragParams = {};

	const colorMapping = {
		keynote: {
			primary: 'var(--color-viz-pink)',
			patternGradient: ['#F68669B3', '#E6327EB3'],
			bannerColor: '#F3ACCA'
		},
		'standard talk': {
			primary: 'var(--color-viz-orange)',
			// patternGradient: ['#F68669B3', '#E6327EB3'],
			patternGradient: ['#FFD485', '#F3844C'],
			bannerColor: '#FBBC9D'
		},
		'sponsored talk': {
			primary: 'var(--color-viz-orange)',
			// patternGradient: ['#F68669B3', '#E6327EB3'],
			patternGradient: ['#FFD485', '#F3844C'],
			bannerColor: '#FBBC9D'
		},
		'lightning talk': {
			primary: 'var(--color-viz-orange)',
			// patternGradient: ['#F68669B3', '#E6327EB3'],
			patternGradient: ['#FFD485', '#F3844C'],
			bannerColor: '#FBBC9D'
		},
		alternate: {
			primary: 'var(--color-viz-orange)',
			patternGradient: ['#F68669B3', '#E6327EB3'],
			bannerColor: '#FBBC9D'
		},
		bof: {
			primary: 'var(--color-viz-orange)',
			patternGradient: ['#F68669B3', '#E6327EB3'],
			bannerColor: '#FBBC9D'
		},
		workshop: {
			primary: 'var(--color-viz-blue-dark)',
			patternGradient: ['#FACCE5', '#659ABC'],
			bannerColor: '#9CAEDF'
		}
	};

	$: isKeynote = data.talkType === 'keynote';
	let modalOpen = false;
	let cardElement;

	function handleCardClick(event) {
		const dragThreshold = 15;
		const x = event.pageX - dragParams?.offsetLeft;

		if (Math.abs(x - dragParams.startX) > dragThreshold) return;

		if (data.talkInfo) {
			modalOpen = true;
		} else {
			console.warn('No talk info available for this speaker.');
		}
	}
</script>

{#if data}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={cardElement}
		on:click={handleCardClick}
		on:touchStart={handleCardClick}
		style:max-width={!isKeynote ? '350px' : '550px'}
		class="speaker-card relative w-full overflow-hidden rounded-lg border-[1px] border-[#ccc] p-4 shadow-md sm:p-8 sm:pt-8 md:min-w-[400px] lg:max-w-[550px] {isKeynote
			? 'pb-12 sm:pb-24'
			: 'min-w-[350px] pb-6'}"
	>
		<div
			class="title-section flex {isKeynote
				? 'h-[325px]'
				: 'h-[265px]'}  flex-row items-center items-start"
		>
			{#if isKeynote}
				<div class="title-text {isKeynote ? 'max-w-[50%]' : 'max-w-unset'} min-w-[240px]">
					<h3
						class="font-display mb-1 text-left align-bottom {isKeynote
							? 'text-[2rem]  xl:text-[2.5rem]'
							: 'text-[1.75rem] lg:text-[1.75rem] xl:text-[2rem]'}  leading-[1] font-bold uppercase"
					>
						{data.name}
					</h3>
					<p class="text-left text-[1rem] !leading-[1.2] sm:text-[1.25rem]">
						{data.role}
					</p>
				</div>
			{/if}
		</div>

		<div class="details-section">
			{#if isKeynote === false}
				<div class="title-text 'max-w-unset' mb-6 min-w-[240px]">
					<h3
						style="text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;"
						class="font-display mb-1 text-left align-bottom {isKeynote
							? 'text-[2rem]  xl:text-[2.5rem]'
							: 'text-[1.75rem] lg:text-[1.75rem] xl:text-[2rem]'}  leading-[1] font-bold uppercase"
					>
						{data.name}
					</h3>
					<p
						style="text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;"
						class="text-left text-[1rem] !leading-[1.2] sm:text-[1.25rem]"
					>
						{data.role}
					</p>
				</div>
			{/if}
			<div class="title mb-8">
				{#if data.kickerText}
					<p class="kicker-text mb-1 !font-medium uppercase">
						{data.kickerText}
					</p>
				{/if}

				<h3
					style="color: {colorMapping[data.talkType]?.primary}"
					class="talk-title {isKeynote
						? 'text-[1.5rem] md:text-[2rem] xl:text-[2.5rem]'
						: 'text-[1.25rem] md:text-[1.75rem] xl:text-[1.8rem]'} text-shadow mb-2 !leading-[1.1] font-bold"
				>
					{data.title}
				</h3>

				{#if data.subtitle}
					<p
						style="color: {colorMapping[data.talkType]?.primary}"
						class="talk-subtitle {isKeynote
							? 'text-[1.25rem] md:text-[1.75rem] xl:text-[2rem]'
							: 'text-[1.25rem] md:text-[1.4rem] xl:text-[1.4rem]'} text-shadow !leading-[1.1]"
					>
						{data.subtitle}
					</p>
				{/if}
			</div>

			<div class="details flex flex-col gap-2">
				{#if data.time}
					<div class="detail flex items-center gap-3">
						<div class="icon-container w-5">
							{@html CalendarIcon.replaceAll('#68B9B2', colorMapping[data.talkType]?.primary)}
						</div>
						<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.time}</p>
					</div>
				{/if}

				{#if data.location}
					<div class="detail flex items-center gap-3">
						<div class="icon-container w-5">
							{@html LocationIcon.replaceAll('#68B9B2', colorMapping[data.talkType]?.primary)}
						</div>
						<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.location}</p>
					</div>
				{/if}
			</div>
		</div>

		<div class="background-container absolute inset-0 z-[-1]">
			<SpeakerPentagon {colorMapping} memberData={data}></SpeakerPentagon>
		</div>
	</div>

	<SpeakerDetailsModal {data} {colorMapping} {cardElement} bind:modalOpen></SpeakerDetailsModal>
{/if}

<style>
	.text-shadow {
		text-shadow:
			-1px -1px 0 white,
			1px -1px 0 white,
			-1px 1px 0 white,
			1px 1px 0 white;
	}
</style>
