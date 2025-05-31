<script>
	import anandImage from '$lib/assets/images/speakers-2025/speaker-anand.jpg';
	import arvindImage from '$lib/assets/images/speakers-2025/speaker-arvind.jpg';
	import samarthImage from '$lib/assets/images/speakers-2025/speaker-samarth.jpg';
	import arundathiImage from '$lib/assets/images/speakers-2025/speaker-arundathi.jpg';
	import pulahaImage from '$lib/assets/images/speakers-2025/speaker-pulaha.jpg';
	import sarathKrishnaImage from '$lib/assets/images/speakers-2025/speaker-sarath-krishna.jpg';
	import SpeakerCard from '../SpeakerCard/SpeakerCard.svelte';
	import arrowLeft from '$lib/assets/images/icons/arrow-left.svg?raw';
	import arrowRight from '$lib/assets/images/icons/arrow-right.svg?raw';

	const workshopInfo = [
		{
			image: anandImage,

			name: 'S ANAND',
			role: 'LLM Psychologist @ Straive CEO @ Gramener',
			title: 'Prompt-to-Plot:',
			subtitle: 'Crafting Visual Stories with LLMs',
			talkType: 'workshop',
			titleColor: 'text-viz-orange-dark',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Samagata Space, Church St',
			collection: 5,
			analysis: 5,
			coding: 5,
			designing: 5,
			narrating: 5,
			workshop_info:
				"In this hands-on workshop, you'll go from zero to a live data visualization using only natural-language prompts (plus a dash of copy-&-paste). Turn raw data into a compelling narrative—all by chatting with an LLM. No coding knowledge is required (but it’ll help a lot.) No API key required but you’re welcome to bring your own. This will be an end-to-end workflow that designers, developers and data enthusiasts can follow verbatim.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/prompt-to-plot-crafting-visual-stories-with-llms-NgKP2m1BeYMTJsdY2gcepz#tickets'
		},
		{
			image: arvindImage,

			name: 'ARVIND V',
			role: 'Adjunct Professor School of Management, DSU and Srishti Manipal Institute',
			title: 'Dancing with the Stars:',
			subtitle: 'No-Code Data Analysis & Visualisation',
			talkType: 'workshop',
			titleColor: 'text-viz-orange-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Samagata Space, Church St',
			collection: 5,
			analysis: 5,
			coding: 5,
			designing: 5,
			narrating: 5,
			workshop_info: `A brief foray into Data, Data Viz, and a wee bit of stats. What we might cover:<br> • Throwing it All Away with Brad Pitt: Data Summaries<br> • Geometry and the culture of Data Viz Charts with Katy Ledecky<br> • Constructing Alternate Worlds: Statistical Testing, Inference, and p-values with Gabbar Singh`,
			link: 'https://hasgeek.com/VizChitra/2025/sub/data-dataviz-and-stats-with-stars-SAmnne94KTNjBNdyFz7WN4#tickets'
		},
		{
			image: arundathiImage,

			name: 'ARUNDATHI RAJAN',
			role: 'Exhibition Design, National Institute of Design, Ahmedabad',
			title: 'Democratising Data:',
			scale: 1.75,
			xOffset: 25,
			yOffset: 85,
			subtitle: 'Stories using everyday objects',
			talkType: 'workshop',
			titleColor: 'text-viz-grey',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Underline Center, 2nd Floor, Indiranagar',
			collection: 5,
			analysis: 5,
			coding: 4,
			designing: 5,
			narrating: 5,
			workshop_info:
				'What power structures can be dismantled when the power to speak the language of data becomes accessible to everyone? The Daily Data Project is a workshop designed to engage in a discourse on creating data visualizations using everyday household objects. The workshop introduces a toolkit developed as a part of my graduation project, which acts as a vertical to simplify the visualization process. While the toolkit offers structure and encourages participants to experiment and explore freely, the key purpose of the workshop is to develop visualizations on a particular city’s transport system and services. And for a city like Bangalore, the results would be quite interesting to observe.',
			link: 'https://hasgeek.com/VizChitra/2025/sub/democratising-data-stories-using-everyday-objects-Hzpvjihbd8BytrnqDhUjyS#tickets'
		},
		{
			image: samarthImage,

			name: 'SAMARTH GULATI',
			role: 'Software Engineer @ Postman',
			title: 'The Sonic Signature:',
			subtitle: "Plotting Your Name's Audio Landscape",
			talkType: 'workshop',
			titleColor: 'text-viz-blue-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Underline Center, 2nd Floor, Indiranagar',
			collection: 2,
			analysis: 2,
			coding: 5,
			designing: 5,
			narrating: 5,
			workshop_info:
				"Ever wondered what the unique sound of your name looks like? In this hands-on workshop, we’ll embark on an exciting journey to capture your “sonic signature” and translate it into a striking visual landscape. We’ll begin by generating the audio waveform of your name using text-to-speech. We'll then delve into audio analysis, extracting meaningful data from the audio output. This data will form the foundation for our visualization. Next, we’ll explore data visualization, learning how to sculpt this processed audio data into a compelling visual representation inspired by the iconic and stark aesthetic of Joy Division’s album artwork. By the end of this exercise, participants will have the opportunity to plot their visual representation, and take home as a physical artwork.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/the-sonic-signature-plotting-your-names-audio-land-338GFKxc1WGoTnpQywGEMs#tickets'
		},
		{
			image: pulahaImage,

			name: 'PULAHA ROY',
			role: 'Senior Data Journalist, Centre for Science and Environment',
			title: "Let's Get Mapping!",
			subtitle: '(QGIS)',
			talkType: 'workshop',
			titleColor: 'text-viz-pink-dark',
			time: '28 June | 10:00AM - 01:00PM',
			location: 'Underline Center, 3rd Floor, Indiranagar',
			collection: 4,
			analysis: 4,
			coding: 5,
			designing: 5,
			narrating: 4,
			workshop_info:
				"Of all the data visualisation forms available, maps have always fascinated me the most - it deals with data that is about us, the space we inhabit, and they just look wow. While there are many mapping softwares available, the one we will be focussing on is Quantum GIS or QGIS. Why QGIS? Because it's open source and a one-stop-solution for everything spatial.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/lets-get-mapping-with-qgis-tHTXRBChT1y4DtC89dqua#tickets'
		},
		{
			name: 'SARATH GUTTIKUNDA and DAMMALAPATI SAI KRISHNA',
			image: sarathKrishnaImage,
			scale: 0.95,
			role: 'Director; Research Associate, Urban Emissions Information LLP',
			title: 'Chitra-Lekha:',
			subtitle: 'Engaging with environmental storytelling through the lens of air pollution data',
			talkType: 'workshop',
			titleColor: 'text-viz-teal-dark',
			time: '28 June | 02:30PM - 05:30PM',
			location: 'Underline Center, 3rd Floor, Indiranagar',
			collection: 5,
			analysis: 5,
			coding: 5,
			designing: 5,
			narrating: 5,
			workshop_info:
				"Schools taught us, “We cannot see air, only feel it.” But sadly now, we don't just feel it deep inside our lungs but also see it with our red, itchy eyes. But there is more than what our irritable eye can see. This session is about learning to see air using data from monitoring stations, modeling results, and satellites. Building a city's pollution storyline using visual aids, without missing the scientific rigor.",
			link: 'https://hasgeek.com/VizChitra/2025/sub/chitra-lekha-narrating-air-pollution-data-AshpXZxTBkjAKpZzAxfjFg#tickets'
		}
	];

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
			{#each workshopInfo as workshop, index (workshop.name)}
				<SpeakerCard data={workshop}></SpeakerCard>
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
