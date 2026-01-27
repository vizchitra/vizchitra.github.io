<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		size?: 'sm' | 'md' | 'lg';
		class_name?: string;
	}

	let { src, alt, size = 'md', class_name = '' }: Props = $props();

	const sizeClasses = {
		sm: 'w-sm h-sm',
		md: 'w-md h-md',
		lg: 'w-lg h-lg'
	};

	const sizeClass = $derived(sizeClasses[size] ?? sizeClasses.md);

	// Pure Tailwind approach: remove inline styles and rely on utility classes
</script>

<img
	{src}
	{alt}
	class="icon block object-contain transition-all duration-50 {sizeClass} {class_name}"
/>

<style>
	.icon:hover {
		filter: invert(33%) sepia(96%) saturate(1231%) hue-rotate(308deg) brightness(99%) contrast(99%);
	}
</style>
