<script>
	import SpeakerCard from '../SpeakerCard/SpeakerCard.svelte';
	import expand from '$lib/assets/images/icons/expand.png';
	import sessionsData from '$lib/data/sessions2025.json' with { type: 'json' };

	const speakerInfo = sessionsData.filter((s) => s.talkType === 'keynote');

	let selectedIndex = null;
</script>

<div
	class="mt-4 mb-10 flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:items-stretch"
>
	<SpeakerCard data={speakerInfo[0]}></SpeakerCard>
	<SpeakerCard data={speakerInfo[1]}></SpeakerCard>
</div>
