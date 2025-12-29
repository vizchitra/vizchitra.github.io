<script lang="ts">
	import { formatSlantedText } from '$lib/utils/utils';

	export let textContent: string | null = 'PLACEHOLDER';
	export let classes = '';
</script>

{#each formatSlantedText(textContent) as letter}
	<span class="slanted-text {classes}" style="--letter-slant: {letter.slant}">
		{letter.letter}
	</span>
{/each}
