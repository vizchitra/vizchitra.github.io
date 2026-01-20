<script lang="ts">
	import { Stack } from '$lib/components';

	/**
	 * Generic accordion component for expandable content sections.
	 * Supports single or multiple open items.
	 */
	interface AccordionItem {
		/** Unique identifier for the item */
		id?: string;
		/** Title/question displayed in the header */
		title: string;
		/** Content/answer displayed when expanded */
		content: string;
	}

	interface Props {
		/** Array of accordion items */
		items: AccordionItem[];
		/** Allow multiple items open at once */
		allowMultiple?: boolean;
		/** Additional CSS classes for container */
		class?: string;
	}

	let { items, allowMultiple = true, class: className = '' }: Props = $props();
</script>

<div class="accordion-container mx-auto w-full max-w-3xl {className}">
	<Stack space="md" class="w-full">
		{#each items as item, index (item.id ?? index)}
			<details class="accordion-item">
				<summary class="accordion-header">
					<h3 class="accordion-title">{item.title}</h3>
					<div class="accordion-icon">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
							<path d="M8 11L4 7h8l-4 4z" />
						</svg>
					</div>
				</summary>
				<div class="accordion-content">
					<p>{item.content}</p>
				</div>
			</details>
		{/each}
	</Stack>
</div>

<style>
	.accordion-item {
		border: 2px solid var(--color-grey-light);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--color-white);
		box-shadow: var(--shadow-sm);
		transition: all 0.3s ease;
		width: 100%;
		box-sizing: border-box;
	}

	.accordion-item:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.accordion-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md);
		cursor: pointer;
		font-family: var(--font-display);
		background: transparent;
		transition: all 0.3s ease;
		list-style: none;
		width: 100%;
		box-sizing: border-box;
		min-height: 4rem;
	}

	.accordion-header::-webkit-details-marker {
		display: none;
	}

	.accordion-title {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--color-black);
		margin: 0;
		line-height: var(--leading-snug);
		flex: 1;
		padding-right: var(--spacing-sm);
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.accordion-icon {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--color-grey);
		color: var(--color-white);
		transition: all 0.3s ease;
	}

	.accordion-item[open] .accordion-icon {
		transform: rotate(180deg);
	}

	.accordion-content {
		padding: 0 var(--spacing-md) var(--spacing-md) var(--spacing-md);
		animation: slideDown 0.3s ease-out;
	}

	.accordion-content p {
		font-size: var(--font-size-base);
		line-height: var(--leading-normal);
		color: var(--color-grey);
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
		.accordion-title {
			font-size: var(--font-size-xl);
		}

		.accordion-content p {
			font-size: var(--font-size-lg);
		}
	}
</style>
