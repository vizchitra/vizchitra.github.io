<script lang="ts">
	import prasanta from '$lib/assets/images/speakers-2025/prasanta.png';
    import expand from '$lib/assets/images/icons/expand.png';
	const speakerInfo = [
		{
			image: prasanta,
			alt: 'prasanta',
			speaker: `<b>PRASANTA</b> KUMAR DUTTA`,
			job_description: 'Data Visualisation Developer, Reuters',
			title_1: 'The Eyes Have It:',
			title_2: 'Understanding Perception-Driven Data Visualisation',
			title_color: 'text-viz-pink-dark',
			talk_type: 'Standard',
			talk_type_color: 'bg-viz-pink',
			talk_type_text_color: 'text-viz-grey',
			time: '27th June 2025',
			location: 'Bangalore International Centre, Indiranagar, Bengaluru',
			talk_info: `Did you know that psychological principles developed over a century ago still shape modern graphic design and visual communication? The way we perceive patterns, group elements, and focus our attention is deeply rooted in human cognition—and understanding these principles can transform the way we communicate through data visualizations.<br>In this session, we’ll delve into the science of perception-based design concepts and the art of creating impactful charts, graphs, and infographics. Through real-world examples of data visualisations, we'll explore how simple design choices can enhance clarity, guide the viewer's eye, and improve storytelling with data.`
		},
		{
			image: prasanta,
			alt: 'prasanta',
			speaker: `<b>PRASANTA</b> KUMAR DUTTA`,
			job_description: 'Data Visualisation Developer, Reuters',
			title_1: 'The Eyes Have It:',
			title_2: 'Understanding Perception-Driven Data Visualisation',
			title_color: 'text-viz-pink-dark',
			talk_type: 'Standard',
			talk_type_color: 'bg-viz-pink',
			talk_type_text_color: 'text-viz-grey',
			time: '27th June 2025',
			location: 'Bangalore International Centre, Indiranagar, Bengaluru',
			talk_info: `Speaker two talk info`
		},
		{
			image: prasanta,
			alt: 'prasanta',
			speaker: `<b>PRASANTA</b> KUMAR DUTTA`,
			job_description: 'Data Visualisation Developer, Reuters',
			title_1: 'The Eyes Have It:',
			title_2: 'Understanding Perception-Driven Data Visualisation',
			title_color: 'text-viz-pink-dark',
			talk_type: 'Standard',
			talk_type_color: 'bg-viz-pink',
			talk_type_text_color: 'text-viz-grey',
			time: '27th June 2025',
			location: 'Bangalore International Centre, Indiranagar, Bengaluru',
			talk_info: `Did you know that psychological principles developed over a century ago still shape modern graphic design and visual communication? The way we perceive patterns, group elements, and focus our attention is deeply rooted in human cognition—and understanding these principles can transform the way we communicate through data visualizations.<br>In this session, we’ll delve into the science of perception-based design concepts and the art of creating impactful charts, graphs, and infographics. Through real-world examples of data visualisations, we'll explore how simple design choices can enhance clarity, guide the viewer's eye, and improve storytelling with data.`
		},
		{
			image: prasanta,
			alt: 'prasanta',
			speaker: `<b>PRASANTA</b> KUMAR DUTTA`,
			job_description: 'Data Visualisation Developer, Reuters',
			title_1: 'The Eyes Have It:',
			title_2: 'Understanding Perception-Driven Data Visualisation',
			title_color: 'text-viz-pink-dark',
			talk_type: 'Standard',
			talk_type_color: 'bg-viz-pink',
			talk_type_text_color: 'text-viz-grey',
			time: '27th June 2025',
			location: 'Bangalore International Centre, Indiranagar, Bengaluru',
			talk_info: `Did you know that psychological principles developed over a century ago still shape modern graphic design and visual communication? The way we perceive patterns, group elements, and focus our attention is deeply rooted in human cognition—and understanding these principles can transform the way we communicate through data visualizations.<br>In this session, we’ll delve into the science of perception-based design concepts and the art of creating impactful charts, graphs, and infographics. Through real-world examples of data visualisations, we'll explore how simple design choices can enhance clarity, guide the viewer's eye, and improve storytelling with data.`
		},
		{
			image: prasanta,
			alt: 'prasanta',
			speaker: `<b>PRASANTA</b> KUMAR DUTTA`,
			job_description: 'Data Visualisation Developer, Reuters',
			title_1: 'The Eyes Have It:',
			title_2: 'Understanding Perception-Driven Data Visualisation',
			title_color: 'text-viz-pink-dark',
			talk_type: 'Standard',
			talk_type_color: 'bg-viz-pink',
			talk_type_text_color: 'text-viz-grey',
			time: '27th June 2025',
			location: 'Bangalore International Centre, Indiranagar, Bengaluru',
			talk_info: `Did you know that psychological principles developed over a century ago still shape modern graphic design and visual communication? The way we perceive patterns, group elements, and focus our attention is deeply rooted in human cognition—and understanding these principles can transform the way we communicate through data visualizations.<br>In this session, we’ll delve into the science of perception-based design concepts and the art of creating impactful charts, graphs, and infographics. Through real-world examples of data visualisations, we'll explore how simple design choices can enhance clarity, guide the viewer's eye, and improve storytelling with data.`
		},
		{
			image: prasanta,
			alt: 'prasanta',
			speaker: `<b>PRASANTA</b> KUMAR DUTTA`,
			job_description: 'Data Visualisation Developer, Reuters',
			title_1: 'The Eyes Have It:',
			title_2: 'Understanding Perception-Driven Data Visualisation',
			title_color: 'text-viz-pink-dark',
			talk_type: 'Standard',
			talk_type_color: 'bg-viz-pink',
			talk_type_text_color: 'text-viz-grey',
			time: '27th June 2025',
			location: 'Bangalore International Centre, Indiranagar, Bengaluru',
			talk_info: `Did you know that psychological principles developed over a century ago still shape modern graphic design and visual communication? The way we perceive patterns, group elements, and focus our attention is deeply rooted in human cognition—and understanding these principles can transform the way we communicate through data visualizations.<br>In this session, we’ll delve into the science of perception-based design concepts and the art of creating impactful charts, graphs, and infographics. Through real-world examples of data visualisations, we'll explore how simple design choices can enhance clarity, guide the viewer's eye, and improve storytelling with data.`
		}
	];
	let currentPage = 0;
	const speakersPerPage = 4;
	$: totalPages = Math.ceil(speakerInfo.length / speakersPerPage);

	function nextPage() {
		if (currentPage < totalPages - 1) currentPage++;
	}

	function prevPage() {
		if (currentPage > 0) currentPage--;
	}

	let startX: number | null = null;

	function handleTouchStart(e: TouchEvent) {
		startX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		if (startX === null) return;
		const endX = e.changedTouches[0].clientX;
		const diff = endX - startX;

		if (diff > 50) {
			prevPage();
		} else if (diff < -50) {
			nextPage();
		}

		startX = null;
	}

	let selectedIndex: number | null = null;
</script>

<!-- Navigation Buttons -->
<div class="mb-4 flex items-center justify-between">
	<button
		on:click={prevPage}
		class="text-viz-orange rounded px-4 py-2 disabled:opacity-50 {currentPage === 0
			? 'pointer-events-none'
			: 'cursor-pointer'}"
		disabled={currentPage === 0}
	>
		◀
	</button>
	<div class="flex space-x-2">
		{#each Array(totalPages) as _, i}
			<div
				class="h-3 w-3 rounded-full {i === currentPage ? 'bg-viz-orange' : 'bg-orange-200'}"
			></div>
		{/each}
	</div>
	<button
		on:click={nextPage}
		class="text-viz-orange rounded px-4 py-2 disabled:opacity-50 {currentPage === totalPages - 1
			? 'pointer-events-none'
			: 'cursor-pointer'}"
		disabled={currentPage === totalPages - 1}
	>
		▶
	</button>
</div>

<!-- Page Indicators -->

<!-- Carousel -->
<div
	class="relative w-full overflow-hidden"
	on:touchstart={handleTouchStart}
	on:touchend={handleTouchEnd}
>
	<div
		class="flex transition-transform duration-500 ease-in-out"
		style="transform: translateX(-{currentPage * 100}%)"
	>
		{#each Array(totalPages) as _, pageIndex}
			<div class="w-full flex-shrink-0">
				<div class="grid grid-cols-1 lg:grid-cols-2">
					{#each speakerInfo.slice(pageIndex * speakersPerPage, (pageIndex + 1) * speakersPerPage) as speaker, index (pageIndex * speakersPerPage + index)}
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
							<div class="grid grid-cols-5 gap-2">
								<div class="col-span-1 mt-2">
									<img src={speaker.image} alt={speaker.alt} />
								</div>
								<div class="col-span-4 mb-2 self-center">
                                    <div class="flex justify-between">
                                        <h3
                                            class="{selectedIndex === index
                                                ? 'text-white'
                                                : 'text-viz-grey'} m-0 p-0 font-[Cairo] text-lg"
                                            style="font-variation-settings: 'slnt' -8;"
                                        >
                                            {@html speaker.speaker}
                                        </h3>
                                        <img class="inline-block self-center" width="12" src={expand} alt="icon" />
                                    </div>
									<span
										class="{selectedIndex === index
											? 'text-white'
											: 'text-viz-grey'} font-[Cairo] text-sm">{speaker.job_description}</span
									>
									<h3
										class="{selectedIndex === index
											? 'text-white'
											: speaker.title_color} mb-2 font-[Cairo]"
									>
										<span class="font-bold">{speaker.title_1}</span>
										<span class="font-semibold">{speaker.title_2}</span>
									</h3>
									<span
										class="rounded-sm px-2 py-1 text-sm {speaker.talk_type_color} {speaker.talk_type_text_color}"
										>{speaker.talk_type}</span
									>
								</div>
							</div>
						</div>
						{#if selectedIndex === index}
							<div class="border-viz-grey col-span-1 block border-2 bg-white p-4 lg:hidden">
								<div>{@html speakerInfo[selectedIndex].talk_info}</div>
								<br />
								<div>
									<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].time}</p>
									<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].location}</p>
								</div>
							</div>
						{/if}

						<!-- desktop version: shows below the row if either item in the pair is selected -->
						<!-- {#if index % 2 === 1}
                        
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
									</div>
								</div>
							{/if}
						{/if} -->
						{#if (index % 2 === 1 && (selectedIndex === index || selectedIndex === index - 1)) || (speakerInfo.length === 1 && selectedIndex === index)}
							<div
								class="border-viz-grey col-span-2 mb-2 hidden grid-cols-1 gap-2 border-2 bg-white p-4 lg:grid"
							>
								<div>{@html speakerInfo[selectedIndex].talk_info}</div>
								<br />
								<div>
									<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].time}</p>
									<p class="text-grey p-0 text-xs">{speakerInfo[selectedIndex].location}</p>
									<br />
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- <script lang='ts'>
    let currentPage = 0;
  
    const itemsPerPage = 4; // 2x2 or 1x4 per page
    const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);
  
    $: totalPages = Math.ceil(items.length / itemsPerPage);
  
    function nextPage() {
      if (currentPage < totalPages - 1) currentPage++;
    }
  
    function prevPage() {
      if (currentPage > 0) currentPage--;
    }

    let startX: null | number = null;

    function handleTouchStart(e: TouchEvent) {
  startX = e.touches[0].clientX;
}

function handleTouchEnd(e: TouchEvent) {
  if (startX === null) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > 50) {
    prevPage();
  } else if (diff < -50) {
    nextPage();
  }

  startX = null; // reset
}

  </script>
  
  <div class="relative w-full overflow-hidden"  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}>
    <div
      class="flex transition-transform duration-500 ease-in-out"
      style="transform: translateX(-{currentPage * 100}%)"
    >
      {#each Array(totalPages) as _, pageIndex}
        <div class="w-full flex-shrink-0">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {#each items.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage) as item}
              <div class="p-4 bg-gray-200 rounded shadow">{item}</div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  
    <button
      on:click={prevPage}
      class=" bg-white p-2 shadow rounded"
      disabled={currentPage === 0}
    >
      ◀
    </button>
    <button
      on:click={nextPage}
      class=" bg-white p-2 shadow rounded"
      disabled={currentPage === totalPages - 1}
    >
      ▶
    </button>
  </div> -->
<!-- <script lang="ts">
	import anand from '$lib/assets/images/speakers-2025/Anand.png';
	import arvind from '$lib/assets/images/speakers-2025/arvind.jpg';
	import samarth from '$lib/assets/images/speakers-2025/samarth.jpg';
	import arundathi from '$lib/assets/images/speakers-2025/arundathi.jpg';
	import pulaha from '$lib/assets/images/speakers-2025/pulaha.jpg';
	import krishna from '$lib/assets/images/speakers-2025/krishna.jpg';
	import sarath from '$lib/assets/images/speakers-2025/sarath.jpg';
	import expand from '$lib/assets/images/icons/expand.png';

	const workshopInfo = [
		{
			image: anand,
			alt: 'Anand',
			speaker: 'S ANAND',
			job_description: 'LLM Psychologist @ Straive CEO @ Gramener',
			title_1: 'Prompt-to-Plot:',
			title_2: 'Crafting Visual Stories with LLMs',
			title_color: 'text-viz-orange-dark',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Samagata Space, Church St',
			workshop_info:
				"In this hands-on workshop, you'll go from zero to a live data visualization using only natural-language prompts (plus a dash of copy-&-paste). Turn raw data into a compelling narrative—all by chatting with an LLM. No coding knowledge is required (but it’ll help a lot.) No API key required but you’re welcome to bring your own. This will be an end-to-end workflow that designers, developers and data enthusiasts can follow verbatim.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/prompt-to-plot-crafting-visual-stories-with-llms-NgKP2m1BeYMTJsdY2gcepz#tickets'
		},
		{
			image: arvind,
			alt: 'arvind',
			speaker: 'ARVIND V',
			job_description: 'Adjunct Professor School of Management, DSU and Srishti Manipal Institute',
			title_1: 'Dancing with the Stars:',
			title_2: 'No-Code Data Analysis & Visualisation',
			title_color: 'text-viz-orange-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Samagata Space, Church St',
			workshop_info: `A brief foray into Data, Data Viz, and a wee bit of stats. What we might cover:<br> • Throwing it All Away with Brad Pitt: Data Summaries<br> • Geometry and the culture of Data Viz Charts with Katy Ledecky<br> • Constructing Alternate Worlds: Statistical Testing, Inference, and p-values with Gabbar Singh`,
			link: 'https://hasgeek.com/VizChitra/2025/sub/data-dataviz-and-stats-with-stars-SAmnne94KTNjBNdyFz7WN4#tickets'
		},
		{
			image: arundathi,
			alt: 'arundathi',
			speaker: 'ARUNDATHI RAJAN',
			job_description: 'Exhibition Design, National Institute of Design, Ahmedabad',
			title_1: 'Democratising Data:',
			title_2: 'Stories using everyday objects',
			title_color: 'text-viz-grey',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Underline Center, 2nd Floor, Indiranagar',
			workshop_info:
				'What power structures can be dismantled when the power to speak the language of data becomes accessible to everyone? The Daily Data Project is a workshop designed to engage in a discourse on creating data visualizations using everyday household objects. The workshop introduces a toolkit developed as a part of my graduation project, which acts as a vertical to simplify the visualization process. While the toolkit offers structure and encourages participants to experiment and explore freely, the key purpose of the workshop is to develop visualizations on a particular city’s transport system and services. And for a city like Bangalore, the results would be quite interesting to observe.',
			link: 'https://hasgeek.com/VizChitra/2025/sub/democratising-data-stories-using-everyday-objects-Hzpvjihbd8BytrnqDhUjyS#tickets'
		},
		{
			image: samarth,
			alt: 'samarth',
			speaker: 'SAMARTH GULATI',
			job_description: 'Software Engineer @ Postman',
			title_1: 'The Sonic Signature:',
			title_2: "Plotting Your Name's Audio Landscape",
			title_color: 'text-viz-blue-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Underline Center, 2nd Floor, Indiranagar',
			workshop_info:
				"Ever wondered what the unique sound of your name looks like? In this hands-on workshop, we’ll embark on an exciting journey to capture your “sonic signature” and translate it into a striking visual landscape. We’ll begin by generating the audio waveform of your name using text-to-speech. We'll then delve into audio analysis, extracting meaningful data from the audio output. This data will form the foundation for our visualization. Next, we’ll explore data visualization, learning how to sculpt this processed audio data into a compelling visual representation inspired by the iconic and stark aesthetic of Joy Division’s album artwork. By the end of this exercise, participants will have the opportunity to plot their visual representation, and take home as a physical artwork.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/the-sonic-signature-plotting-your-names-audio-land-338GFKxc1WGoTnpQywGEMs#tickets'
		},
		{
			image: pulaha,
			alt: 'pulaha',
			speaker: 'PULAHA ROY',
			job_description: 'Senior Data Journalist, Centre for Science and Environment',
			title_1: "Let's Get Mapping!",
			title_2: '(QGIS)',
			title_color: 'text-viz-pink-dark',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Underline Center, 3rd Floor, Indiranagar',
			workshop_info:
				"Of all the data visualisation forms available, maps have always fascinated me the most - it deals with data that is about us, the space we inhabit, and they just look wow. While there are many mapping softwares available, the one we will be focussing on is Quantum GIS or QGIS. Why QGIS? Because it's open source and a one-stop-solution for everything spatial.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/lets-get-mapping-with-qgis-tHTXRBChT1y4DtC89dqua#tickets'
		},
		{
			image1: sarath,
			alt1: 'sarath',
			image2: krishna,
			alt2: 'krishna',
			speaker: 'SARATH GUTTIKUNDA and DAMMALAPATI SAI KRISHNA',
			job_description: 'Director; Research Associate, Urban Emissions Information LLP',
			title_1: 'Chitra-Lekha:',
			title_2: 'Engaging with environmental storytelling through the lens of air pollution data',
			title_color: 'text-viz-teal-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Underline Center, 3rd Floor, Indiranagar',
			workshop_info:
				"Schools taught us, “We cannot see air, only feel it.” But sadly now, we don't just feel it deep inside our lungs but also see it with our red, itchy eyes. But there is more than what our irritable eye can see. This session is about learning to see air using data from monitoring stations, modeling results, and satellites. Building a city's pollution storyline using visual aids, without missing the scientific rigor.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/chitra-lekha-narrating-air-pollution-data-AshpXZxTBkjAKpZzAxfjFg#tickets'
		}
	];

	let selectedIndex: number | null = null;
</script>

<div class="grid auto-rows-min lg:grid-cols-2 ">
	{#each workshopInfo as speaker, index}
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
			<div class="grid grid-cols-2 gap-2">
				<div class="col-span-1 self-center">
					{#if index === 5}
						<img src={speaker.image1} alt={speaker.alt1} />
						<img src={speaker.image2} alt={speaker.alt2} />
					{:else}
						<img src={speaker.image} alt={speaker.alt} />
					{/if}
				</div>
				<div class="col-span-1 self-center">
					<div class="flex justify-between">
						<h3
							class="font-[Cairo] text-sm {selectedIndex === index
								? 'text-white'
								: 'text-viz-grey'} inline-block"
						>
							{speaker.speaker}
						</h3>
						<img class="inline-block self-center" width="12" src={expand} alt="icon" />
					</div>
					<span
						class="font-[Cairo] text-sm {selectedIndex === index ? 'text-white' : 'text-viz-grey'}"
						>{speaker.job_description}</span
					>
					<h3 class="font-[Cairo] {selectedIndex === index ? 'text-white' : 'text-viz-grey'}">
						<span class="font-semibold">{speaker.title_1}</span><br />
						<span class="font-semibold">{speaker.title_2}</span>
					</h3>
				</div>
			</div>
		</div>
		{#if selectedIndex === index}
			<div class="border-viz-grey col-span-1 mb-2 block border-2 bg-white p-4 lg:hidden">
				<div>{@html workshopInfo[selectedIndex].workshop_info}</div>
				<br>
				<div>
					<p class="text-grey p-0 text-xs">{workshopInfo[selectedIndex].time}</p>
					<p class="text-grey p-0 text-xs">{workshopInfo[selectedIndex].location}</p>
					<br />
					<a href={workshopInfo[selectedIndex].link} target="_blank">
						<button class="text-viz-pink-dark cursor-pointer font-semibold">Buy Tickets ↗</button>
					</a>
				</div>
			</div>
		{/if}
		{#if index % 2 === 1}
			{#if selectedIndex === index || selectedIndex === index - 1}
				<div
					class="border-viz-grey col-span-2 mb-2 hidden grid-cols-1 gap-2 border-2 bg-white p-4 lg:grid"
				>
					<div>{@html workshopInfo[selectedIndex].workshop_info}</div>
					<br>
					<div>
						<p class="text-grey p-0 text-xs">{workshopInfo[selectedIndex].time}</p>
						<p class="text-grey p-0 text-xs">{workshopInfo[selectedIndex].location}</p>
						<br />
						<a href={workshopInfo[selectedIndex].link} target="_blank">
							<button class="text-viz-pink-dark cursor-pointer font-semibold">Buy Tickets ↗</button
							>
						</a>
					</div>
				</div>
			{/if}
		{/if}
	{/each}
</div> -->

<!-- <div class="flex flex-col py-4 bg-viz-grey/5 mt-4 p-4">
    <span class="text-viz-pink-dark text-center font-[Cairo] text-xl"> COMING SOON !</span>
    <span class="text-justify font-[Cairo] px-10 text-lg"
        >As we confirm our speakers and schedule, stay tuned to find all the goodness we have
        packed in just for you.
    </span>
</div> -->
