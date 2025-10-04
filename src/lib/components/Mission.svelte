<script lang="ts">
	import mission from '$lib/assets/images/mission.svg?raw';
</script>

<section class="vis-container">
	<div class="vis">
		{@html mission}
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
				<span class="text-viz-orange-dark font-bold"> ■ Community & Diversity</span> - Be part of an
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

		gap: 5rem;
		padding: 2rem;

		@media all and (max-width: 500px) {
			flex-direction: column;
		}
	}

	.vis {
		display: flex;
		max-width: 90vw;
		object-fit: contain;
	}

	svg {
		width: auto;
	}

	.legend {
		max-width: 20rem;
	}
</style>
