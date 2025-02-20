<script lang="ts">
	import BannerPolygon from '$lib/components/BannerPolygon.svelte';
	import { formatSlantedText } from '$lib/utils/utils.js';
</script>

<div class="min-h-screen">
	<!-- Banner Section -->
	<div class="relative h-48">
		<BannerPolygon staticBanner={true} />
		<div class="absolute inset-0 flex items-center justify-center">
			<h1 class="font-display text-[2rem] font-bold">Code of Conduct</h1>
		</div>
	</div>

	<!-- Content Section -->
	<div class="mx-auto max-w-3xl px-4 py-12">
		<h2 class="mb-8 text-center">
			{#each formatSlantedText("THE DO'S AND DONT'S FOR THE COMMUNITY") as letter}
				<span
					class="slanted-text text-[18px] md:text-[24px]"
					style="--letter-slant: {letter.slant}"
				>
					{letter.letter}
				</span>
			{/each}
		</h2>

		<p class="mb-6 text-[18px] md:text-[22px]">
			This code of conduct applies across online exchanges, conferences and other events hosted by
			VizChitra community.
		</p>

		<p class="mb-6 text-[18px] md:text-[22px]">
			We are here as a community to deliberate on the topics of the community.
		</p>

		<ul class="mb-8 list-disc space-y-2 pl-6 text-[18px] md:text-[22px]">
			<li>Be nice to everyone,</li>
			<li>Be empathetic,</li>
			<li>Be questioning, as it furthers the discussion, but</li>
			<li>Discuss ideas, not people and their personalities (as that would be ad hominem).</li>
		</ul>

		<h3 class="font-display mb-4 text-[22px] leading-[1.5] font-bold">Prohibited Behavior</h3>
		<p class="mb-4 text-[18px] md:text-[22px]">
			We strongly condemn any kind of harassment of any fellow participant. This includes:
		</p>

		<ul class="mb-8 list-disc space-y-2 pl-6 text-[18px] md:text-[22px]">
			<li>Sustained disruption of talks, discussions and other events.</li>
			<li>
				Offensive remarks or jokes made about women, men, persons of non-binary genders and those
				with physical disabilities, or on the basis of sexuality, race, caste or religion.
			</li>
			<li>
				Use of images that objectify the human body unless absolutely relevant to the discussion.
			</li>
			<li>Inappropriate physical contact and invasion of private space.</li>
			<li>Deliberate intimidation, unwelcome gestures and stalking.</li>
		</ul>

		<div class="mb-8 rounded-lg border border-gray-200 bg-gray-100 p-6 md:p-8">
			<p class="mb-4 text-[18px] md:text-[22px]">
				Please report in confidence by sending an email to the community admins. Reports will be
				treated seriously and community admins will address this matter quickly.
			</p>

			<p class="text-[18px] font-semibold md:text-[22px]">
				Violators, regardless of their standing, may be expelled from the community, without a
				refund (where payment was applicable), and reported to the authorities.
			</p>
		</div>
	</div>
</div>
