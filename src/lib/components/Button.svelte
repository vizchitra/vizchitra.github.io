<script lang="ts">
	/**
	 * Button component that matches the CTA styling
	 */
	export let href: string;
	export let external = false;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let class_name = '';

	const sizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg'
	};

	const variantClasses = {
		primary: 'text-viz-pink-dark',
		secondary: 'text-viz-grey-dark'
	};
</script>

<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	class="
		bg-viz-orange inline-flex items-center justify-center rounded-sm px-4 py-4 text-center text-xl font-semibold
		text-white transition-colors
		{variantClasses[variant]}
		{sizeClasses[size]}
		{class_name}
	"
>
	<slot />
	{#if external}
		<span class="ml-1 text-lg">↗</span>
	{/if}
</a>

<style lang="postcss">
	.button {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.2s ease;
		clip-path: polygon(0% 0%, 95% 0%, 100% 25%, 100% 100%, 5% 100%, 0% 75%);
	}

	.button-content {
		position: relative;
		z-index: 1;
		padding: 0.5rem 1.5rem;
	}
</style>
