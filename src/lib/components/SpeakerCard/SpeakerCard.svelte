<script>
	import rukmini from '$lib/assets/images/speakers-2025/Rukmini.png';
	import SpeakerPentagon from './SpeakerPentagon.svelte';
	import CalendarIcon from '$lib/assets/images/icons/calendar.svg?raw';
	import LocationIcon from '$lib/assets/images/icons/location.svg?raw';

	export let data = {};

	const colorMapping = {
		keynote: {
			primary: 'var(--color-viz-pink)',
			patternGradient: ['#F68669', '#E6327E'],
			bannerColor: '#F3ACCA'
		},
		talk: {
			primary: 'var(--color-viz-orange)',
			patternGradient: ['#F68669', '#E6327E'],
			// patternGradient: ['#FFD485', '#F89F72'],
			bannerColor: '#FBBC9D'
		},
		workshop: {
			primary: 'var(--color-viz-blue-dark)',
			patternGradient: ['#F68669', '#E6327E'],
			// patternGradient: ['#A4D8E1', '#68B9B2'],
			bannerColor: '#9CAEDF'
		}
	};

	$: isKeynote = data.talkType === 'keynote';
</script>

{#if data}
	<div
		style:max-width={!isKeynote ? '350px' : '550px'}
		class="speaker-card relative w-full overflow-hidden rounded-lg border-[1px] border-[#ccc] p-4 shadow-md sm:p-8 sm:pt-8 md:min-w-[400px] lg:max-w-[550px] {isKeynote
			? 'pb-12 sm:pb-24'
			: 'min-w-[350px] pb-6'}"
	>
		<div
			class="title-section flex {isKeynote
				? 'h-[325px]'
				: 'h-[250px]'}  flex-row items-center items-start"
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
