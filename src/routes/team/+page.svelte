<script lang="ts">
	import { formatSlantedText } from '$lib/utils/utils.js';
	import { PageHeader } from '$lib/components/layout';
	import { TeamSection } from '$lib/components/sections';
</script>

<div class="min-h-screen">
	<PageHeader title="MEET THE TEAM" />

	<div class="content-container !max-w-none py-12">
		<h2 class="mb-8 text-center">
			{#each formatSlantedText('The VizChitra Team') as letter}
				<span
					class="slanted-text text-[18px] uppercase md:text-[24px]"
					style="--letter-slant: {letter.slant}"
				>
					{letter.letter}
				</span>
			{/each}
		</h2>

		<p class="content-text mx-auto mb-12 text-center">
			Meet the individuals working tirelessly behind the scenes to make India's data visualization
			community a reality.
		</p>

		<TeamSection></TeamSection>
	</div>
</div>
