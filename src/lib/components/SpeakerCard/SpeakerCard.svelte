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
			patternGradient: ['#FFD485', '#F89F72'],
			bannerColor: '#FBBC9D'
		},
		workshop: {
			primary: 'var(--color-viz-blue-dark)',
			patternGradient: ['#A4D8E1', '#68B9B2'],
			bannerColor: '#9CAEDF'
		}
	};
</script>

<div
	class="speaker-card relative w-full overflow-hidden rounded-lg border-[1px] border-[#ccc] p-4 pb-12 shadow-md sm:p-8 sm:pb-24"
>
	<div class="title-section flex h-[350px] flex-row items-center items-start">
		<div class="title-text max-w-[50%] min-w-[240px]">
			<h3
				class="font-display mb-1 text-left align-bottom text-[2rem] leading-[1] font-bold sm:text-[2.5rem]"
			>
				{data.name}
			</h3>
			<p class="text-left text-[1.25rem] !leading-[1.2] sm:text-[1.5rem]">
				{data.role}
			</p>
		</div>
	</div>

	<div class="details-section">
		<div class="title mb-8">
			<p class="kicker-text mb-1 text-[1.25rem] !font-medium uppercase">
				{data.kickerText}
			</p>
			<h3
				style="color: {colorMapping[data.talkType].primary}"
				class="talk-title text-[1.5rem] leading-none font-bold sm:text-[2.5rem]"
			>
				{data.title}
			</h3>
			<p
				style="color: {colorMapping[data.talkType].primary}"
				class="talk-subtitle text-[1.25rem] leading-none sm:text-[2rem]"
			>
				{data.subtitle}
			</p>
		</div>

		<div class="details flex flex-col gap-2">
			<div class="detail flex items-center gap-3">
				<div class="icon-container w-5">
					{@html CalendarIcon.replaceAll('#68B9B2', colorMapping[data.talkType].primary)}
				</div>
				<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.time}</p>
			</div>

			<div class="detail flex items-center gap-3">
				<div class="icon-container w-5">
					{@html LocationIcon.replaceAll('#68B9B2', colorMapping[data.talkType].primary)}
				</div>
				<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.location}</p>
			</div>
		</div>
	</div>

	<div class="background-container absolute inset-0 z-[-1]">
		<SpeakerPentagon {colorMapping} memberData={data}></SpeakerPentagon>
	</div>
</div>
