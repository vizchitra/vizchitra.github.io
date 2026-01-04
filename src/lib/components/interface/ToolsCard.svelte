<script lang="ts">
	export let className: string = '';
	// Tailwind utility classes for width and max-width
	export let widthClass: string = 'w-full';
	export let maxWidthClass: string = 'max-w-7xl';
	export let padded: boolean = true;
</script>

<div
	class={`mx-auto ${widthClass} ${maxWidthClass} border-viz-grey-light rounded-2xl border bg-white shadow-sm ${padded ? 'p-6' : ''} ${className}`}
>
	<slot />
</div>
