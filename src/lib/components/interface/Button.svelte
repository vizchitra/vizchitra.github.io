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
		blue: '--color-viz-blue-dark',
		pink: '--color-viz-pink-dark',
		teal: '--color-viz-teal-dark',
		orange: '--color-viz-orange-dark',
		yellow: '--color-viz-yellow-dark'
	};

	const bgColorVar = $derived(colorVars[color] ?? colorVars.orange);
	const sizeClass = $derived(sizeClasses[size] ?? sizeClasses.md);
</script>

<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	style="background-color: var({bgColorVar}); color: #ffffff;"
	class="not-prose hover:text-viz-white inline-flex transform items-center justify-center rounded-sm px-4 py-4 text-center
		text-xl font-semibold text-white no-underline transition-transform duration-300 ease-in-out hover:-translate-y-1
		hover:scale-102 hover:shadow-[0_12px_30px_rgba(0,0,0,0.14),0_0_22px_rgba(255,255,255,0.06)] focus:outline-none
		focus-visible:ring-4 focus-visible:ring-white/10 focus-visible:outline-none
		{sizeClass} {class_name}
	"
>
	{@render children?.()}
	{#if external}
		<span class="ml-1 text-lg">↗</span>
	{/if}
</a>
