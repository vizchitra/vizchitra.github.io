<script>
	import SpeakerCard from '../SpeakerCard/SpeakerCard.svelte';
	import sessionsData from '$lib/data/sessions2025.json' with { type: 'json' };

	const speakerInfo = sessionsData.filter((s) => s.talkType === 'keynote');

	let selectedIndex = null;
</script>

<div
	class="mt-sm mb-xl gap-sm flex w-full flex-col items-center justify-center lg:flex-row lg:items-stretch"
>
	<SpeakerCard data={speakerInfo[0]}></SpeakerCard>
	<SpeakerCard data={speakerInfo[1]}></SpeakerCard>
</div>
