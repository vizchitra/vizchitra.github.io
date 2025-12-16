<script lang="ts">
	interface FAQItem {
		question: string;
		answer: string;
	}

	export let customFAQs: FAQItem[] | null = null;

	const defaultFAQItems: FAQItem[] = [
		{
			question: 'What is VizChitra and who should attend?',
			answer:
				"VizChitra is India's first data visualization conference bringing together practitioners from diverse industries and disciplines. Perfect for data analysts, designers, researchers, journalists, developers, and anyone passionate about visual storytelling with data."
		},
		{
			question: 'When and where is the conference taking place?',
			answer:
				'The main conference is on June 27th, 2025 at Bangalore International Centre, Bengaluru. Workshops are held at two different locations: Samagata Foundation and Underline Center. Check the venue section for detailed addresses and transportation information.'
		},
		{
			question: "What's the difference between the conference and workshops?",
			answer:
				"The conference features keynotes, talks, and networking opportunities focused on learning from industry experts. Workshops are hands-on, interactive sessions where you'll get practical experience with tools and techniques. Workshops have limited capacity and require separate registration."
		},
		{
			question: 'Do I need any technical background to attend?',
			answer:
				"Not at all! VizChitra welcomes attendees from all backgrounds. Whether you're a complete beginner curious about data visualization or a seasoned professional, you'll find valuable content. Our sessions range from foundational concepts to advanced techniques."
		},
		{
			question: 'What should I bring to the conference?',
			answer:
				'Just bring yourself and your curiosity! We recommend bringing a laptop if you plan to attend workshops, a notebook for taking notes, business cards for networking, and comfortable shoes for walking around the venues.'
		},
		{
			question: 'Are there networking opportunities?',
			answer:
				"Absolutely! VizChitra is designed to foster connections within India's data visualization community. We'll have dedicated networking sessions, coffee breaks, lunch, and informal meetups throughout the event. It's a great opportunity to meet like-minded professionals and potential collaborators."
		}
	];

	const faqItems = customFAQs || defaultFAQItems;
</script>

<div class="faq-container">
	<div class="faq-grid">
		{#each faqItems as item, index}
			<details class="faq-item">
				<summary class="faq-question">
					<h3 class="question-text">{item.question}</h3>
					<div class="faq-icon">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
							<path d="M8 11L4 7h8l-4 4z" />
						</svg>
					</div>
				</summary>
				<div class="faq-answer">
					<p>{item.answer}</p>
				</div>
			</details>
		{/each}
	</div>
</div>

<style>
	.faq-container {
		max-width: 48rem;
		margin: auto;
		padding: 0;
		width: 100%;
	}

	.faq-grid {
		display: grid;
		gap: 1rem;
		width: 100%;
	}

	.faq-item {
		border: 2px solid #e5e7eb;
		border-radius: 1rem;
		overflow: hidden;
		background: white;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.3s ease;
		width: 100%;
		box-sizing: border-box;
	}

	.faq-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px -3px rgb(0 0 0 / 0.1);
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		cursor: pointer;
		font-family: var(--font-display);
		background: transparent;
		transition: all 0.3s ease;
		list-style: none;
		width: 100%;
		box-sizing: border-box;
		min-height: 4rem;
	}

	.faq-question::-webkit-details-marker {
		display: none;
	}

	.question-text {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-viz-black);
		margin: 0;
		line-height: 1.4;
		flex: 1;
		padding-right: 1rem;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.faq-icon {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--color-viz-grey);
		color: white;
		transition: all 0.3s ease;
	}

	.faq-item[open] .faq-icon {
		transform: rotate(180deg);
	}

	.faq-answer {
		padding: 0 1.5rem 1.5rem 1.5rem;
		animation: slideDown 0.3s ease-out;
	}

	.faq-answer p {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-viz-grey);
		margin: 0;
		font-family: var(--font-body);
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 768px) {
		.faq-container {
			padding: 0 2rem;
		}

		.faq-grid {
			gap: 1.5rem;
		}

		.question-text {
			font-size: 1.25rem;
		}

		.faq-answer p {
			font-size: 1.125rem;
		}
	}
</style>
