<script>
	import HomepageSection from '../Homepage/HomepageSection.svelte';
	import SpeakerCardsTrack from '../SpeakerCard/SpeakerCardsTrack.svelte';
</script>

<div class="max-w-[100%] md:overflow-auto">
	<SpeakerCardsTrack sessionTypes={['standard talk', 'sponsored talk']} />
</div>

<HomepageSection>
	<div slot="content">
		<h2 class="content-heading !text-[2rem]">Lightning Talks</h2>
		<p class="content-text mb-1">
			Shorter sessions of 15 minutes each, where speakers share quick insights, demos, or give you
			an insider view of the work they do.
		</p>
	</div>
</HomepageSection>

<div class="max-w-[100%] md:overflow-auto">
	<SpeakerCardsTrack sessionTypes={['lightning talk']} />
</div>

<HomepageSection>
	<div slot="content">
		<p class="content-text mb-1">Additionally we also have two other types of sessions:</p>
		<ul class="list-disc pl-6">
			<li class="content-text mb-1">
				<strong>Birds of Feather</strong>: A community-driven discussion bringing together
				participants with shared interests
			</li>
			<li class="content-text mb-1">
				<strong>Alternative</strong>: A place for all dataviz related experiences that don't quite
				fit into the previous categories
			</li>
		</ul>
	</div>
</HomepageSection>

<div class="max-w-[100%] overflow-auto">
	<SpeakerCardsTrack sessionTypes={['alternate', 'bof']} />
</div>
