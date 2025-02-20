<script>
	import { base } from '$app/paths';
	import { csv } from 'd3';
	import { onMount } from 'svelte';
	import MemberPentagon from './MemberPentagon.svelte';

	const MAX_TILES = 12;
	let teamData = [];

	onMount(async () => {
		teamData = await csv(`${base}/data/vizchitra_team.csv`);
		console.log('teamData', teamData);
	});
</script>

{#if teamData}
	<div class="team-section flex flex-wrap justify-center gap-5 md:min-w-[420px]">
		{#each teamData.sort((a, b) => a.order - b.order).slice(0, MAX_TILES) as teamMember}
			<MemberPentagon memberData={teamMember} />
		{/each}
	</div>
{/if}
