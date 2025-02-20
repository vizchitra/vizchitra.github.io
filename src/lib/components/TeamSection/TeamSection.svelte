<script>
	import { base } from '$app/paths';
	import { csv } from 'd3';
	import { onMount } from 'svelte';
	import MemberPentagon from './MemberPentagon.svelte';

	let teamData = [];

	onMount(async () => {
		teamData = await csv(`${base}/data/vizchitra_team.csv`);
		console.log('teamData', teamData);
	});
</script>

{#if teamData}
	<div class="team-section flex flex-wrap justify-center gap-5">
		{#each teamData.sort((a, b) => a.order - b.order).slice(0, 12) as teamMember}
			<MemberPentagon memberData={teamMember} />
		{/each}
	</div>
{/if}
