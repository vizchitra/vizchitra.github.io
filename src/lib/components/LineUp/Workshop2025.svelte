<script lang="ts">
	import anand from '$lib/assets/images/speakers-2025/Anand.png';
	import arvind from '$lib/assets/images/speakers-2025/arvind.jpg';
	import samarth from '$lib/assets/images/speakers-2025/samarth.jpg';
	import arundathi from '$lib/assets/images/speakers-2025/arundathi.jpg';
	import pulaha from '$lib/assets/images/speakers-2025/pulaha.jpg';
	import krishna from '$lib/assets/images/speakers-2025/krishna.jpg';
	import sarath from '$lib/assets/images/speakers-2025/sarath.jpg';

	const workshopInfo = [
		{
			image: anand,
			alt: 'Anand',
			speaker: 'S ANAND',
			title_1: 'Prompt-to-Plot:',
			title_2: 'Crafting Visual Stories with LLMs',
			title_color: 'text-viz-orange-dark',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Samagata Space, Church St',
			workshop_info:
				"In this hands-on workshop, you'll go from zero to a live data visualization using only natural-language prompts (plus a dash of copy-&-paste). Turn raw data into a compelling narrative—all by chatting with an LLM. No coding knowledge is required (but it’ll help a lot.) No API key required but you’re welcome to bring your own. This will be an end-to-end workflow that designers, developers and data enthusiasts can follow verbatim.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/prompt-to-plot-crafting-visual-stories-with-llms-NgKP2m1BeYMTJsdY2gcepz'
		},
		{
			image: arvind,
			alt: 'arvind',
			speaker: 'ARVIND V',
			title_1: 'Dancing with the Stars:',
			title_2: 'No-Code Data Analysis & Visualisation',
			title_color: 'text-viz-orange-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Samagata Space, Church St',
			workshop_info: `A brief foray into Data, Data Viz, and a wee bit of stats. What we might cover:<br> • Throwing it All Away with Brad Pitt: Data Summaries<br> • Geometry and the culture of Data Viz Charts with Katy Ledecky<br> • Constructing Alternate Worlds: Statistical Testing, Inference, and p-values with Gabbar Singh`,
			link: 'https://hasgeek.com/VizChitra/2025/sub/data-dataviz-and-stats-with-stars-SAmnne94KTNjBNdyFz7WN4'
		},
		{
			image: arundathi,
			alt: 'arundathi',
			speaker: 'ARUNDATHI RAJAN',
			title_1: 'Democratising Data:',
			title_2: 'Stories using everyday objects',
			title_color: 'text-viz-grey',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Underline Center, 2nd Floor, Indiranagar',
			workshop_info: 'What power structures can be dismantled when the power to speak the language of data becomes accessible to everyone? The Daily Data Project is a workshop designed to engage in a discourse on creating data visualizations using everyday household objects. The workshop introduces a toolkit developed as a part of my graduation project, which acts as a vertical to simplify the visualization process. While the toolkit offers structure and encourages participants to experiment and explore freely, the key purpose of the workshop is to develop visualizations on a particular city’s transport system and services. And for a city like Bangalore, the results would be quite interesting to observe.',
			link: 'https://hasgeek.com/VizChitra/2025/sub/democratising-data-stories-using-everyday-objects-Hzpvjihbd8BytrnqDhUjyS'
		},
		{
			image: samarth,
			alt: 'samarth',
			speaker: 'SAMARTH GULATI',
			title_1: 'The Sonic Signature:',
			title_2: "Plotting Your Name's Audio Landscape",
			title_color: 'text-viz-blue-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Underline Center, 2nd Floor, Indiranagar',
			workshop_info: 'Ever wondered what the unique sound of your name looks like? In this hands-on workshop, we’ll embark on an exciting journey to capture your “sonic signature” and translate it into a striking visual landscape. We’ll begin by generating the audio waveform of your name using text-to-speech. We\'ll then delve into audio analysis, extracting meaningful data from the audio output. This data will form the foundation for our visualization. Next, we’ll explore data visualization, learning how to sculpt this processed audio data into a compelling visual representation inspired by the iconic and stark aesthetic of Joy Division’s album artwork. By the end of this exercise, participants will have the opportunity to plot their visual representation, and take home as a physical artwork.',
			link: 'https://hasgeek.com/VizChitra/2025/sub/the-sonic-signature-plotting-your-names-audio-land-338GFKxc1WGoTnpQywGEMs'
		},
		{
			image: pulaha,
			alt: 'pulaha',
			speaker: 'PULAHA ROY',
			title_1: "Let's Get Mapping!",
			title_2: '(QGIS)',
			title_color: 'text-viz-pink-dark',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Underline Center, 3rd Floor, Indiranagar',
			workshop_info: 'Of all the data visualisation forms available, maps have always fascinated me the most - it deals with data that is about us, the space we inhabit, and they just look wow. While there are many mapping softwares available, the one we will be focussing on is Quantum GIS or QGIS. Why QGIS? Because it\'s open source and a one-stop-solution for everything spatial.',
			link: 'https://hasgeek.com/VizChitra/2025/sub/lets-get-mapping-with-qgis-tHTXRBChT1y4DtC89dqua'
		},
		{
			image1: sarath,
			alt1: 'sarath',
			image2: krishna,
			alt2: 'krishna',
			speaker: 'SARATH GUTTIKUNDA and DAMMALAPATI SAI KRISHNA',
			title_1: 'Chitra-Lekha:',
			title_2: 'Engaging with environmental storytelling through the lens of air pollution data',
			title_color: 'text-viz-teal-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Underline Center, 3rd Floor, Indiranagar',
			workshop_info: 'Schools taught us, “We cannot see air, only feel it.” But sadly now, we don\'t just feel it deep inside our lungs but also see it with our red, itchy eyes. But there is more than what our irritable eye can see. This session is about learning to see air using data from monitoring stations, modeling results, and satellites. Building a city\'s pollution storyline using visual aids, without missing the scientific rigor.',
			link: 'https://hasgeek.com/VizChitra/2025/sub/chitra-lekha-narrating-air-pollution-data-AshpXZxTBkjAKpZzAxfjFg'
		}
	];

	// let selectedIndex: number | null = null;
	let selectedIndex: number | null = null;

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (!node.contains(event.target as Node)) {
				node.dispatchEvent(new CustomEvent('outclick'));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<!-- Parent grid -->
<div class="grid grid-cols-1 gap-4 py-8 lg:grid-cols-2">
	{#each workshopInfo as speaker, index}
		{#if selectedIndex === index}
			<!-- FULL-WIDTH WRAPPER for clicked card + more info -->
			<div
				class="bg-viz-grey/5 col-span-1 space-y-3 rounded-sm p-4 transition-all duration-200 lg:col-span-2"
			>
				<!-- The clicked card content -->
				<div class="grid grid-cols-3 items-stretch gap-2">
					<div class="col-span-1 bg-transparent">
						{#if index === 5}
							<img src={speaker.image1} alt={speaker.alt1} />
							<img src={speaker.image2} alt={speaker.alt2} />
						{:else}
							<img src={speaker.image} alt={speaker.alt} />
						{/if}
					</div>
					<div class="col-span-2">
						<h3 class="text-viz-grey font-[Cairo] text-2xl font-bold">{speaker.speaker}</h3>
						<h3 class="{speaker.title_color} font-[Cairo] text-lg">
							<span class="font-bold">{speaker.title_1}</span><br />
							<span>{speaker.title_2}</span>
						</h3>
						<p class="text-xs">{speaker.time}</p>
						<p class="text-xs">{speaker.location}</p>
					</div>
				</div>

				<!-- More info section -->
				<div class="grid grid-cols-1 gap-2 p-2">
                    <div>
                        <p>{@html speaker.workshop_info}</p>
                    </div>
                    <div>
                        <a href={speaker.link} target="_blank">
                            <button
                                class="text-viz-pink-dark font-semibold cursor-pointer"
                                >Buy Tickets ↗</button
                            >
                        </a>
                    </div>
				</div>
			</div>
		{:else}
			<!-- Regular unclicked card -->
			<div
				role="button"
				tabindex="0"
				on:click={() => (selectedIndex = index)}
				on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (selectedIndex = index)}
				class="cursor-pointer p-4 transition hover:shadow-sm"
			>
				<div class="grid grid-cols-3 items-stretch gap-2">
					<div class="col-span-1 bg-transparent">
						{#if index === 5}
							<img src={speaker.image1} alt={speaker.alt1} />
							<img src={speaker.image2} alt={speaker.alt2} />
						{:else}
							<img src={speaker.image} alt={speaker.alt} />
						{/if}
					</div>
					<div class="col-span-2">
						<h3 class="text-viz-grey font-[Cairo] text-2xl font-bold">{speaker.speaker}</h3>
						<h3 class="{speaker.title_color} font-[Cairo] text-lg">
							<span class="font-bold">{speaker.title_1}</span><br />
							<span>{speaker.title_2}</span>
						</h3>
						<p class="text-xs">{speaker.time}</p>
						<p class="text-xs">{speaker.location}</p>
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>

<!-- <div class="grid grid-cols-1 gap-4 py-8 lg:grid-cols-2">
	{#each workshopInfo as speaker, index}
		<div
			tabindex="0"
			role="button"
			on:click={() => (selectedIndex = index)}
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					selectedIndex = index;
					e.preventDefault();
				}
			}}
			class="cursor-pointer flex flex-col"
		>
			{#if index === 5}
				<div class="grid grid-cols-3 items-stretch gap-2">
					<div class="col-span-1">
						<img src={speaker.image1} alt={speaker.alt1} />
						<img src={speaker.image2} alt={speaker.alt2} />
					</div>
					<div class="col-span-2">
						<h3 class="text-viz-grey font-[Cairo] text-2xl font-bold">
							{speaker.speaker}
						</h3>
						<h3 class="{speaker.title_color} font-[Cairo] text-lg">
							<span class="font-bold">{speaker.title_1}</span><br />
							<span>{speaker.title_2}</span>
						</h3>
						<p class="p-0 text-xs">{speaker.time}</p>
						<p class="p-0 text-xs">{speaker.location}</p>
					</div>
				</div>
			{:else}
				<div class="grid grid-cols-3 items-stretch gap-2">
					<div class="col-span-1">
						<img src={speaker.image} alt={speaker.alt} />
					</div>
					<div class="col-span-2">
						<h3 class="text-viz-grey font-[Cairo] text-2xl font-bold">
							{speaker.speaker}
						</h3>
						<h3 class="{speaker.title_color} font-[Cairo] text-lg">
							<span class="font-bold">{speaker.title_1}</span><br />
							<span>{speaker.title_2}</span>
						</h3>
						<p class="p-0 text-xs">{speaker.time}</p>
						<p class="p-0 text-xs">{speaker.location}</p>
					</div>
				</div>
			{/if}
            {#if selectedIndex === index}
						<div class="rounded-xl border border-gray-300 bg-gray-100 p-4">
							<p class="text-sm font-medium">More info about {speaker.speaker} goes here...</p>
						</div>
					{/if}
	{/each}
</div> -->
