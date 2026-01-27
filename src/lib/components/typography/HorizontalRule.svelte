<script lang="ts">
	type Style = 'solid' | 'dashed' | 'dotted';
	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		style?: Style;
		size?: Size;
		color?: string;
		class?: string;
	}

	let { style = 'solid', size = 'md', color = 'grey', class: className = '' }: Props = $props();
</script>

<hr class="hr hr-{style} hr-{size} {className}" style:--hr-color="var(--color-{color})" />

<style>
	.hr {
		border: none;
		height: 1px;
		background-color: var(--hr-color);
		margin: var(--spacing-lg) 0;
	}

	.hr-sm {
		margin: var(--spacing-sm) 0;
	}

	.hr-md {
		margin: var(--spacing-lg) 0;
	}

	.hr-lg {
		margin: var(--spacing-xl) 0;
	}

	.hr-dashed {
		border-top: 1px dashed var(--hr-color);
		background: none;
	}

	.hr-dotted {
		border-top: 1px dotted var(--hr-color);
		background: none;
	}
</style>
