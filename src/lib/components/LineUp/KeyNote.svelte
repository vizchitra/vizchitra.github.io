<script>
	import SpeakerCard from '../SpeakerCard/SpeakerCard.svelte';
	import rukmini from '$lib/assets/images/speakers-2025/Rukmini.png';
	import anand from '$lib/assets/images/speakers-2025/speaker-anand.jpg';
	import expand from '$lib/assets/images/icons/expand.png';

	const speakerInfo = [
		{
			image: rukmini,
			xOffset: -20,
			yOffset: 15,
			name: 'Rukmini S',
			role: 'Founder and Director, Data For India',
			title: 'The Data Is Here.',
			subtitle: 'But Whom Is It Serving?',
			talkType: 'keynote',
			kickerText: 'Opening keynote',
			time: '27 June | 09:30 - 10:00 am',
			talkInfo: `The last ten years have seen a dramatic improvement in access to Indian data, allowing journalists to tell richer stories, analysts to get a better sense of Indian realities, and designers to have much more to work with. Improvements are now happening faster than ever, more so with the adoption of machine learning and large language models. How do we use this moment to do better than we had imagined? By asking the important questions. <br>
			We talk too little about what goes into the making of data, who has access to information and who doesn’t, and who is able to work with it or make sense of it and not, and how we are using this data and to what end. In this talk, I hope to share some data that grounds my insights, and encourage us to engage with these questions.`,
			location: 'Bangalore International Centre, Bengaluru',
			collection: 2,
			analysis: 5,
			coding: 3,
			designing: 4,
			narrating: 5,
			strength: 'Narrating insights',
			link: 'https://hasgeek.com/VizChitra/2025/sub/the-data-is-here-but-whom-is-it-serving-T8JzpVLF6VruwBTE6rP8zR#tickets'
		},
		{
			image: anand,
			xOffset: -30,
			scale: 0.9,
			alt: 'Anand',
			name: 'S ANAND',
			role: `LLM Psychologist @ Straive and CEO @ Gramener`,
			title: 'Data Design By Dialogue.',
			subtitle: 'Visualising Data with LLMs',
			talkType: 'keynote',
			kickerText: 'Closing keynote',
			time: '27 June | 04:15 - 04:45 pm',
			talkInfo: `In this live session, we'll walk through how to go from a bare prompt to a polished, shareable chart—entirely by conversing with an LLM. Along the way, you'll see real demos, such as this Web Features explorer, Elimination Game, LLM mental math evaluation, etc. and learn to:<br>
			&#9679; Use ChatGPT instead of Jupyter Notebooks, Figma, or D3 as the canvas for data storytelling <br>
			&#9679; Engineer prompts that generate valid data analyses and visualizations <br>
			&#9679; Iteratively refine axis scales, colors and annotations without writing a single line of code <br>
			&#9679; Automate interpretation: ask the model for captions, tooltips, and data insights <br>
			&#9679; Spotlight future trends: what generative data art looks like in six months`,
			location: 'Bangalore International Centre, Bengaluru',
			collection: 5,
			analysis: 5,
			coding: 5,
			designing: 5,
			narrating: 5,
			strength: 'Narrating insights',
			link: 'https://hasgeek.com/VizChitra/2025/sub/data-design-by-dialogue-visualizing-data-with-llms-EX3YtVF1mqSqnxY5LAtuRE#tickets'
		}
	];

	let selectedIndex = null;
</script>

<div class="mt-4 mb-10 flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
	<SpeakerCard data={speakerInfo[0]}></SpeakerCard>
	<SpeakerCard data={speakerInfo[1]}></SpeakerCard>
</div>
