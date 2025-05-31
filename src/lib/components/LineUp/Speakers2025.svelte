<script>
	import SpeakerCard from '../SpeakerCard/SpeakerCard.svelte';
	import expand from '$lib/assets/images/icons/expand.png';
	import aditiImage from '$lib/assets/images/speakers-2025/speaker-aditi.jpg';
	import amanImage from '$lib/assets/images/speakers-2025/speaker-aman.jpg';
	import yashnaImage from '$lib/assets/images/speakers-2025/speaker-yashna.jpg';
	import gopikaImage from '$lib/assets/images/speakers-2025/speaker-gopika.jpg';
	import gyanImage from '$lib/assets/images/speakers-2025/speaker-gyan.jpg';
	import prasantaImage from '$lib/assets/images/speakers-2025/speaker-prasanta.jpg';
	import rahulNeelImage from '$lib/assets/images/speakers-2025/speaker-rahul-neel.png';
	import sabhyataImage from '$lib/assets/images/speakers-2025/speaker-sabhyata.jpg';
	import saketImage from '$lib/assets/images/speakers-2025/speaker-saket.png';
	import sriniImage from '$lib/assets/images/speakers-2025/speaker-srini.jpg';
	import vikramImage from '$lib/assets/images/speakers-2025/speaker-vikram.jpg';
	import arrowLeft from '$lib/assets/images/icons/arrow-left.svg?raw';
	import arrowRight from '$lib/assets/images/icons/arrow-right.svg?raw';

	const speakerInfo = [
		{
			image: yashnaImage,
			scale: 1,
			xOffset: -0,
			yOffset: -25,
			name: 'Yashna Jhamb',
			role: 'Co-founder, Ooloi Labs',
			title: 'Making Sense of Stories:',
			subtitle: 'Structuring Qualitative Data at Scale',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 5,
			analysis: 5,
			coding: 4,
			designing: 4,
			narrating: 5,
			strength: 'Narrating insights',
			link: ''
		},
		{
			image: prasantaImage,
			name: 'Prasanta Kumar Dutta',
			role: `Data Visualisation Developer, Reuters`,
			title: 'The Eyes Have It:',
			subtitle: 'Understanding Perception-Driven Data Visualisation',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 4,
			analysis: 5,
			coding: 5,
			designing: 5,
			narrating: 5,
			strength: 'Designing visualizations',
			link: ''
		},
		{
			image: saketImage,
			name: 'Saket Choudhary',
			role: `Assistant Professor, IIT Bombay`,
			title: 'India’s Public Health Genome: ',
			subtitle: 'A Visual Story of Anomalies, Trajectories, Correlations and Geographies',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 5,
			analysis: 5,
			coding: 4,
			designing: 4,
			narrating: 3,
			strength: 'Analyzing data',
			link: ''
		},
		{
			image: aditiImage,
			name: 'Aditi Bhat',
			role: `Founder and Chief Spinner, Spinfinity`,
			title: 'Data Visceralization:',
			subtitle: 'Moving Data, Spinning Stories',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 3,
			analysis: 5,
			coding: 4,
			designing: 5,
			narrating: 5,
			strength: 'Designing visualizations',
			link: ''
		},
		{
			image: amanImage,
			scale: 0.75,
			xOffset: -5,
			yOffset: -55,
			name: 'Aman Bhargava',
			role: `Developer, Revisual Labs`,
			title: 'The Unreasonable Effectiveness of Tinkering',
			subtitle: '',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 5,
			analysis: 5,
			coding: 5,
			designing: 5,
			narrating: 4,
			strength: 'Coding visualizations',
			link: ''
		},
		{
			image: vikramImage,
			scale: 0.95,
			xOffset: 10,
			yOffset: 25,
			name: 'Vikram Nayak',
			role: `Founder, Chartboss`,
			title: 'The UX of Charts',
			subtitle: '',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 4,
			analysis: 5,
			coding: 4,
			designing: 5,
			narrating: 5,
			strength: 'Designing visualizations',
			link: ''
		},
		{
			image: rahulNeelImage,
			name: 'Rahul Beniwal and Neel Lakhwani',
			role: `Tibba Design Studio`,
			title: 'Democratizing financial data for a growing India',
			subtitle: '',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 4,
			analysis: 4,
			coding: 4,
			designing: 5,
			narrating: 5,
			strength: 'Designing visualizations',
			link: ''
		},
		{
			image: sriniImage,
			name: 'Srinivasan Ramani',
			role: `Deputy National Editor, The Hindu`,
			title: 'Data Journalism and Visualisation ',
			subtitle: "at a time of Print's decline",
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 5,
			analysis: 5,
			coding: 5,
			designing: 4,
			narrating: 5,
			strength: 'Narrating insights',
			link: ''
		},
		{
			image: sabhyataImage,
			name: 'Sabhyata Jain',
			role: `Product Designer, Microsoft`,
			title: 'The invisible graph:',
			subtitle: 'Leveraging AI to design accessible data visualisations',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 4,
			analysis: 5,
			coding: 4,
			designing: 5,
			narrating: 5,
			strength: 'Designing visualizations',
			link: ''
		},
		{
			image: gyanImage,
			name: 'Gyan Lakhwani',
			role: `Design Educator, Founder at Public Knowledge Studio`,
			title: 'Teaching Information Visualisation',
			subtitle: '',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 4,
			analysis: 2,
			coding: 4,
			designing: 5,
			narrating: 4,
			strength: 'Coding visualizations',
			link: ''
		},
		{
			image: gopikaImage,
			scale: 0.8,
			xOffset: -0,
			yOffset: -0,
			name: 'Gopika',
			role: `Legal Research Associate, Enfold Proactive Health Trust`,
			title: 'Whose Analysis is it Anyway? ',
			subtitle: 'The Role of AI and Humans in Data Analysis and Visualization',
			talkType: 'talk',
			kickerText: '',
			// time: '27 June, 2025',
			talkInfo: ``,
			// location: 'Bangalore International Centre, Bengaluru',
			collection: 5,
			analysis: 5,
			coding: 4,
			designing: 5,
			narrating: 5,
			strength: 'Designing visualizations',
			link: ''
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
			{#each speakerInfo as speaker, index (speaker.name)}
				<SpeakerCard data={speaker}></SpeakerCard>
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
