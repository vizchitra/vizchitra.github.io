<script>
	import rukmini from '$lib/assets/images/speakers-2025/Rukmini.png';
	import SpeakerPentagon from './SpeakerPentagon.svelte';
	import CalendarIcon from '$lib/assets/images/icons/calendar.svg?raw';
	import LocationIcon from '$lib/assets/images/icons/location.svg?raw';

	export let data = {
		image: 'rukmini.jpg',
		name: 'Rukmini S',
		role: 'Founder and Director, Data For India',
		title: 'The Data Is Here.',
		subtitle: 'But Whom Is It Serving?',
		titleColor: 'var(--color-viz-orange)',
		kickerText: 'Opening keynote',
		time: '27 June | 09:30 - 10:00 am',
		talk_info: `The last ten years have seen a dramatic improvement in access to Indian data, allowing journalists to tell richer stories, analysts to get a better sense of Indian realities, and designers to have much more to work with. Improvements are now happening faster than ever, more so with the adoption of machine learning and large language models. How do we use this moment to do better than we had imagined? By asking the important questions. <br>
			We talk too little about what goes into the making of data, who has access to information and who doesn’t, and who is able to work with it or make sense of it and not, and how we are using this data and to what end. In this talk, I hope to share some data that grounds my insights, and encourage us to engage with these questions.`,
		location: 'Bangalore International Centre, Bengaluru',
		link: 'https://hasgeek.com/VizChitra/2025/sub/the-data-is-here-but-whom-is-it-serving-T8JzpVLF6VruwBTE6rP8zR#tickets',
		collection: 2,
		analysis: 5,
		coding: 3,
		designing: 4,
		narrating: 5,
		strength: 'Narrating insights'
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
			<p class="max-w-[20ch] text-left text-[1.25rem] !leading-[1.2] sm:text-[1.5rem]">
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
				style="color: {data.titleColor}"
				class="talk-title text-[1.5rem] leading-none font-bold sm:text-[2.5rem]"
			>
				{data.title}
			</h3>
			<p
				style="color: {data.titleColor}"
				class="talk-subtitle text-[1.25rem] leading-none sm:text-[2rem]"
			>
				{data.subtitle}
			</p>
		</div>

		<div class="details flex flex-col gap-2">
			<div class="detail flex items-center gap-3">
				<div class="icon-container w-5">
					{@html CalendarIcon.replaceAll('#68B9B2', data.titleColor)}
				</div>
				<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.time}</p>
			</div>

			<div class="detail flex items-center gap-3">
				<div class="icon-container w-5">
					{@html LocationIcon.replaceAll('#68B9B2', data.titleColor)}
				</div>
				<p class="text-[1rem] leading-none sm:text-[1.25rem]">{data.location}</p>
			</div>
		</div>
	</div>

	<div class="background-container absolute inset-0 z-[-1]">
		<SpeakerPentagon memberData={data}></SpeakerPentagon>
	</div>
</div>
