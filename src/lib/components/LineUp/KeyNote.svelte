<script lang="ts">
	import rukmini from '$lib/assets/images/speakers-2025/Rukmini.png';
	import anand from '$lib/assets/images/speakers-2025/Anand.png';
	import expand from '$lib/assets/images/icons/expand.png';
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
			time: '27 June | 09:30 - 10:00 am',
			talk_info: `The last ten years have seen a dramatic improvement in access to Indian data, allowing journalists to tell richer stories, analysts to get a better sense of Indian realities, and designers to have much more to work with. Improvements are now happening faster than ever, more so with the adoption of machine learning and large language models. How do we use this moment to do better than we had imagined? By asking the important questions. <br>
			We talk too little about what goes into the making of data, who has access to information and who doesn’t, and who is able to work with it or make sense of it and not, and how we are using this data and to what end. In this talk, I hope to share some data that grounds my insights, and encourage us to engage with these questions.`,
			location: 'Bangalore International Centre, Bengaluru',
			link: 'https://hasgeek.com/VizChitra/2025/sub/the-data-is-here-but-whom-is-it-serving-T8JzpVLF6VruwBTE6rP8zR#tickets'
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
			time: '27 June | 04:15 - 04:45 am',
			talk_info: `In this live session, we'll walk through how to go from a bare prompt to a polished, shareable chart—entirely by conversing with an LLM. Along the way, you'll see real demos, such as this Web Features explorer, Elimination Game, LLM mental math evaluation, etc. and learn to:<br>
			&#9679; Use ChatGPT instead of Jupyter Notebooks, Figma, or D3 as the canvas for data storytelling <br>
			&#9679; Engineer prompts that generate valid data analyses and visualizations <br>
			&#9679; Iteratively refine axis scales, colors and annotations without writing a single line of code <br>
			&#9679; Automate interpretation: ask the model for captions, tooltips, and data insights <br>
			&#9679; Spotlight future trends: what generative data art looks like in six months`,
			location: 'Bangalore International Centre, Bengaluru',
			link: 'https://hasgeek.com/VizChitra/2025/sub/data-design-by-dialogue-visualizing-data-with-llms-EX3YtVF1mqSqnxY5LAtuRE#tickets'
		}
	];

	let selectedIndex: number | null = null;
</script>

<div class="mt-4 grid auto-rows-min grid-cols-1 lg:grid-cols-2">
	{#each speakerInfo as speaker, index}
		<!-- speaker grid start -->
		<div
			tabindex="0"
			role="button"
			on:click={() => (selectedIndex = selectedIndex === index ? null : index)}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					selectedIndex = index;
					e.preventDefault();
				}
			}}
			class="cursor-pointer {selectedIndex === index
				? 'bg-viz-grey'
				: 'white'} p-4 transition hover:shadow-sm"
		>
			<div class="grid grid-cols-3 gap-2 self-center">
				<div class="col-span-1">
					<img src={speaker.image} alt={speaker.alt} />
				</div>
				<div class="col-span-2">
					<div class="flex justify-between">
						<h3 class="{selectedIndex === index ? 'text-white' : 'text-viz-grey'} font-[Cairo]">
							{speaker.speaker}
						</h3>
						<img class="inline-block self-center" width="12" src={expand} alt="icon" />
					</div>
					<span class="text-sm {selectedIndex === index ? 'text-white' : 'text-viz-grey'}"
						>{speaker.job_description}</span
					>
					<h3
						class="font-[Cairo] font-semibold {selectedIndex === index
							? 'text-white'
							: 'text-viz-grey'}"
					>
						<span>{speaker.title_1}</span><br />
						<span>{speaker.title_2}</span>
					</h3>
					<p class="p-0 text-xs {selectedIndex === index ? 'text-white' : 'text-viz-grey'}">
						{speaker.keynote_time}
					</p>
				</div>
			</div>
		</div>
		<!-- speaker grid start -->

		<!-- on click div info start -->
		{#if selectedIndex === index}
			<div class="border-viz-grey col-span-1 mb-2 block border-2 bg-white p-4 lg:hidden">
				<div>{@html speakerInfo[selectedIndex].talk_info}</div>
				<br />
				<div>
					<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].time}</p>
					<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].location}</p>
					<br />
					<a href={speakerInfo[selectedIndex].link} target="_blank">
						<button class="text-viz-pink-dark cursor-pointer font-semibold">Buy Tickets ↗</button>
					</a>
				</div>
			</div>
		{/if}
		<!-- mobile version: shows directly below clicked item -->
		{#if index % 2 === 1}
			{#if selectedIndex === index || selectedIndex === index - 1}
				<div
					class="border-viz-grey col-span-2 mb-2 hidden grid-cols-1 gap-2 border-2 bg-white p-4 lg:grid"
				>
					<div>{@html speakerInfo[selectedIndex].talk_info}</div>
					<br />
					<div>
						<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].time}</p>
						<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].location}</p>
						<br />
						<a href={speakerInfo[selectedIndex].link} target="_blank">
							<button class="text-viz-pink-dark cursor-pointer font-semibold">Buy Tickets ↗</button
							>
						</a>
					</div>
				</div>
			{/if}
		{/if}

		<!-- on click div info end -->
	{/each}
</div>
