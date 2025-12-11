<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import HomepageSection from '$lib/components/Homepage/HomepageSection.svelte';
	import VizChitraLogoType from '$lib/components/VizChitraLogoType.svelte';
	import CustomSlantedText from '$lib/components/Common/CustomSlantedText.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import PolygonDivider from '$lib/components/PolygonDivider.svelte';
	import { onMount } from 'svelte';

	let tallyLoaded = false;

	onMount(() => {
		// Load Tally embed script
		const script = document.createElement('script');
		script.src = 'https://tally.so/widgets/embed.js';
		script.async = true;
		script.onload = () => {
			tallyLoaded = true;
		};
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	});

	const submissionFAQs = [
		{
			question: 'What types of proposals are you looking for?',
			answer:
				"We welcome talks (20-30 minutes), workshops (2-3 hours), and alternative sessions (panels, discussions, lightning talks). Topics can range from technical implementations and design principles to industry case studies and experimental approaches to data visualization. If it's related to data visualization and storytelling, we want to hear about it!"
		},
		{
			question: 'Do I need to be an expert to submit a proposal?',
			answer:
				"Not at all! We value diverse perspectives and experience levels. Whether you're sharing a complex project or documenting your learning journey, your unique perspective is valuable. First-time speakers are encouraged to apply."
		},
		{
			question: 'What should I include in my proposal?',
			answer:
				'Provide a clear title, a compelling abstract (150-300 words) describing what attendees will learn, your background/bio, and the session format. Include any special requirements (software, materials, etc.) for workshops. Focus on the value and takeaways for attendees.'
		},
		{
			question: 'When is the submission deadline?',
			answer:
				'The deadline will be announced soon. We recommend submitting early as we review proposals on a rolling basis. Follow our community channels or subscribe to updates for deadline announcements.'
		},
		{
			question: 'Will speakers receive any support?',
			answer:
				'Selected speakers will receive complimentary conference passes. We also provide mentorship for first-time speakers and technical support for your session. Travel support may be available for selected speakers (details to be announced).'
		},
		{
			question: 'Can I submit multiple proposals?',
			answer:
				"Yes! You're welcome to submit multiple proposals for different session types or topics. However, we may select only one or two proposals per speaker to ensure diversity in our program."
		}
	];
</script>

<svelte:head>
	<title>Submit Your Proposal - VizChitra 2026</title>
	<meta
		name="description"
		content="Submit your proposal for VizChitra 2026. Share your expertise in data visualization with India's growing community."
	/>
</svelte:head>

<PageHeader title="Submit Your Proposal" />

<div class="mx-auto max-w-4xl px-4 py-12">
	<HomepageSection>
		<div slot="content">
			<h1 class="mb-6 text-center">
				<VizChitraLogoType year="2026"></VizChitraLogoType>
			</h1>

			<h2 class="content-heading mb-6 text-center !text-[2rem]">Call for Proposals</h2>

			<p class="content-text mb-8">
				We're looking for <span class="text-viz-pink-dark font-bold"
					>talks, workshops, and alternative sessions</span
				>
				for VizChitra 2026. Whether you're working on cutting-edge visualizations, teaching data literacy,
				or exploring new tools and techniques, we want to hear from you.
			</p>
		</div>
	</HomepageSection>

	<div class="mb-12">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm">
				<h4 class="text-viz-orange-dark mb-3 text-lg font-bold">Talks (20-30 min)</h4>
				<p class="text-sm text-gray-700">
					Share your projects, methodologies, case studies, or insights on data visualization
					practices and principles.
				</p>
			</div>

			<div class="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm">
				<h4 class="text-viz-orange-dark mb-3 text-lg font-bold">Workshops (2-3 hrs)</h4>
				<p class="text-sm text-gray-700">
					Hands-on sessions teaching specific tools, techniques, or approaches to data
					visualization. Interactive and practical.
				</p>
			</div>

			<div class="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm">
				<h4 class="text-viz-orange-dark mb-3 text-lg font-bold">Alternative Sessions</h4>
				<p class="text-sm text-gray-700">
					Panels, roundtable discussions, lightning talks, or other creative formats that bring the
					community together.
				</p>
			</div>
		</div>
	</div>

	<div class="mx-auto my-12 max-w-3xl">
		<h3 class="content-heading mb-6 text-center !text-[1.5rem]">Submission Form</h3>

		<p class="content-text mb-8 text-center">
			Fill out the form below to submit your proposal. <br />We review submissions on a rolling
			basis.
		</p>

		<!-- Tally Form Embed -->
		<div class="mx-auto max-w-3xl">
			<div class="rounded-lg bg-white p-4 shadow-lg">
				<iframe
					data-tally-src="https://tally.so/embed/kdl7oR?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
					loading="lazy"
					width="100%"
					height="600"
					frameborder="0"
					marginheight="0"
					marginwidth="0"
					title="VizChitra 2026 - Call for Proposals"
					class="min-h-[600px]"
				></iframe>
			</div>
		</div>
	</div>

	<PolygonDivider />

	<div class="my-12">
		<h3 class="content-heading mb-8 text-center !text-[1.5rem]">Frequently Asked Questions</h3>
		<FAQ customFAQs={submissionFAQs} />
	</div>

	<div class="mx-auto my-12 max-w-3xl text-center">
		<p class="content-text mb-4">
			Questions about the submission process? Reach out to us at <br />
			<a href="mailto:hello@vizchitra.com" class="text-viz-orange-dark font-semibold underline">
				hello@vizchitra.com
			</a>
		</p>
		<p class="content-text">
			Join our
			<a
				href="https://chat.whatsapp.com/G9p4HbALukeAa5NSVn0OoA"
				target="_blank"
				rel="noopener noreferrer"
				class="text-viz-orange-dark font-semibold underline"
			>
				WhatsApp community
			</a>
			for updates and discussions.
		</p>
	</div>
</div>
