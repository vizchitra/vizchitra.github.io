<script lang="ts">
	import MissionViz from '../assets/images/MissionViz.svg?raw';
</script>

<section class="vis-container">
	<div class="vis">
		{@html MissionViz}
	</div>
	<div class="legend">
		<ol>
			<li class="text-lg">
				<span class="text-viz-pink-dark font-bold"> ■ Collaboration & Sharing</span> – Team up with fellow
				nerds for fun projects and knowledge sharing.
			</li>
			<li class="text-lg">
				<span class="text-viz-blue-dark font-bold"> ■ Learning & Growth</span> – Geek out, tinker, and
				learn new things from everyone, especially beyond work.
			</li>
			<li class="text-lg">
				<span class="text-viz-orange-dark font-bold"> ■ Community & Diversity</span> – Be part of an
				(accessible) community, full of creative people with diverse experiences
			</li>
			<li class="text-lg">
				<span class="text-viz-teal-dark font-bold"> ■ Connection & Inspiration</span> –Engage with data
				viz creators to connect, and get inspired.
			</li>
			<li class="text-lg">
				<span class="text-viz-yellow-dark font-bold"> ■ Curation & Advocacy</span> – Curate data visualization
				knowledge, and share Indian voices & work.
			</li>
		</ol>
	</div>
</section>

<style>
	.vis-container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		gap: 2rem;
		padding: 1rem;
	}

	.legend {
		width: 50ch;
		max-width: 90dvw;
	}
</style>
