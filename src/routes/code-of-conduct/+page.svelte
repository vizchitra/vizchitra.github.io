<script lang="ts">
	import { formatSlantedText } from '$lib/utils/utils.js';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<div class="min-h-screen">
	<PageHeader title="Code of Conduct" />

	<div class="content-container py-12">
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

		<p class="content-text mb-6">
			This code of conduct applies across online exchanges, conferences and other events hosted by
			VizChitra community.
		</p>

		<p class="content-text mb-6">
			We are here as a community to deliberate on the topics of the community.
		</p>

		<ul class="content-text mb-8 list-disc space-y-2 pl-6">
			<li>Be nice to everyone,</li>
			<li>Be empathetic,</li>
			<li>Be questioning, as it furthers the discussion, but</li>
			<li>Discuss ideas, not people and their personalities (as that would be ad hominem).</li>
		</ul>

		<h3 class="content-heading mb-4">Prohibited Behavior</h3>
		<p class="content-text mb-4">
			We strongly condemn any kind of harassment of any fellow participant. This includes:
		</p>

		<ul class="content-text mb-8 list-disc space-y-2 pl-6">
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

		<div class="content-notice">
			<p class="content-text mb-4">
				Please report in confidence by sending an email to <a
					href="mailto:hello@vizchitra.com?subject=Code%20of%20Conduct%20Report"
				>
					<strong>hello@vizchitra.com</strong></a
				>
				or direct messaging the admins e.g. Rasagy Sharma, Ipsa Jain of the
				<a href="https://chat.whatsapp.com/CcptoGEeCqJEkiETwAzpbq">
					<strong> VizChitra Community on WhatsApp</strong></a
				>. Reports will be treated seriously and community admins will address this matter quickly.
				To escalate, message or call Gurman Bhatia @
				<a href="tel:+91 99900 44111">+91 99900 44111</a> or Amit Kapoor @
				<a href="+91 97392 68197">+91 97392 68197</a>
			</p>

			<p class="content-text font-semibold">
				Violators, regardless of their standing, may be expelled from the community, without a
				refund (where payment was applicable), and reported to the authorities.
			</p>
		</div>
	</div>
</div>

<style>
	a {
		text-decoration: underline;
	}
</style>
