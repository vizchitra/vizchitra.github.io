<script lang="ts">
	import rukmini from '$lib/assets/images/speakers-2025/Rukmini.png';
	import anand from '$lib/assets/images/speakers-2025/Anand.png';
	const speakerInfo = [
		{
			image: rukmini,
			alt: 'Rukmini',
			speaker: 'RUKMINI S',
			job_description: 'Founder and Director, Data For India',
			title_1: 'The Data Is Here.',
			title_2: 'But Whom Is It Serving?',
			title_color: 'text-viz-pink-dark',
			keynote_time: 'Opening keynote',
			time: '27 June | 09:30 - 10:00 am'
		},
		{
			image: anand,
			alt: 'Anand',
			speaker: 'S ANAND',
			job_description: `LLM Psychologist @ Straive and
			CEO @ Gramener`,
			title_1: 'Data Design By Dialogue.',
			title_2: 'Visualising Data with LLMs',
			title_color: 'text-viz-orange-dark',
			keynote_time: 'Closing keynote',
			time: '27 June | 04:15 - 04:45 am'
		}
	];
</script>

<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
	{#each speakerInfo as speaker}
		<div class="grid grid-cols-3 self-center gap-2">
			<div class="col-span-1">
				<img src={speaker.image} alt={speaker.alt} />
			</div>
			<div class="col-span-2">
				<h3 class="text-viz-grey font-[Cairo]">
					{speaker.speaker}
				</h3>
				<span class="text-sm">{speaker.job_description}</span>
				<h3 class="font-[Cairo] font-semibold">
					<span>{speaker.title_1}</span><br />
					<span>{speaker.title_2}</span>
				</h3>
				<p class="p-0 text-xs">{speaker.keynote_time}</p>
			</div>
		</div>
	{/each}
</div>
