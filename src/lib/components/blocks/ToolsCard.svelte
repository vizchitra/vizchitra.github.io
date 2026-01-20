<script lang="ts">
	interface Props {
		className?: string;
		widthClass?: string;
		maxWidthClass?: string;
		padded?: boolean;
	}

	let { className = '', widthClass = 'w-full', maxWidthClass = 'max-w-7xl', padded = true }: Props = $props();
</script>

<div
	class={`mx-auto ${widthClass} ${maxWidthClass} border-grey-light rounded-2xl border bg-white shadow-sm ${padded ? 'p-sm' : ''} ${className}`}
>
	<slot />
</div>
