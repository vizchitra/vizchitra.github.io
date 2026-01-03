<script lang="ts">
	interface Props {
		/**
		 * Button component that matches the CTA styling
		 */
		href: string;
		external?: boolean;
		color?: 'blue' | 'pink' | 'teal' | 'orange' | 'yellow';
		size?: 'sm' | 'md' | 'lg';
		class_name?: string;
		children?: import('svelte').Snippet;
	}

	let {
		href,
		external = false,
		color = 'orange',
		size = 'md',
		class_name = '',
		children
	}: Props = $props();

	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	};

	const colorVars = {
		blue: '--viz-color-blue',
		pink: '--viz-color-pink',
		teal: '--viz-color-teal',
		orange: '--viz-color-orange',
		yellow: '--viz-color-yellow'
	};

	const bgColorVar = $derived(colorVars[color] ?? colorVars.orange);
	const sizeClass = $derived(sizeClasses[size] ?? sizeClasses.md);
</script>

<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	style="background-color: var({bgColorVar});"
	class="not-prose
		inline-flex items-center justify-center rounded-sm px-4 py-4 text-center text-xl font-semibold
		text-white transition-colors hover:opacity-90
		{sizeClass}
		{class_name}
	"
>
	{@render children?.()}
	{#if external}
		<span class="ml-1 text-lg">↗</span>
	{/if}
</a>
