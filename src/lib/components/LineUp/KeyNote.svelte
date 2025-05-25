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
			time: '27 June | 09:30 - 10:00 am'
		},
		{
			image: anand,
			alt: 'Anand',
			speaker: 'S ANAND',
			job_description: `LLM Psychologist @ Straive
			CEO @ Gramener`,
			title_1: 'Data Design By Dialogue.',
			title_2: 'Visualising Data with LLMs',
			title_color: 'text-viz-orange-dark',
			time: '27 June | 04:15 - 04:45 am'
		}
	];
</script>

<div class="grid grid-cols-1 gap-4 py-8 lg:grid-cols-2">
	{#each speakerInfo as speaker}
		<div class="grid grid-cols-2 items-stretch gap-2">
			<div>
				<img src={speaker.image} alt={speaker.alt} />
			</div>
			<div>
				<h3>
					<i class="text-viz-grey font-[Cairo] text-2xl font-bold">{speaker.speaker}</i>
				</h3>
				<span class="text-sm">{speaker.job_description}</span>
				<h3 class="{speaker.title_color} font-[Cairo] text-lg">
					<span class="font-bold">{speaker.title_1}</span><br />
					<span>{speaker.title_2}</span>
				</h3>
				<p class="p-0 text-xs">{speaker.time}</p>
			</div>
		</div>
	{/each}
</div>
