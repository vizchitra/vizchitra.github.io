<!--
	ImageUpload - File upload component for images.
	Converts uploaded image to base64 data URL.
-->
<script lang="ts">
	import { type Color, getColorTokens } from '$lib/utils/colorTokens';

	interface Props {
		/** Bound image source (base64 data URL) */
		src?: string | null;
		/** Button label text */
		label?: string;
		/** Show optional hint */
		showOptional?: boolean;
		/** Accepted file types */
		accept?: string;
		/** Button color */
		color?: Color;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		src = $bindable(null),
		label = 'Upload an image',
		showOptional = true,
		accept = '.jpg, .jpeg, .png',
		color = 'orange',
		class: className = ''
	}: Props = $props();

	const tokens = $derived(getColorTokens(color, 'orange'));

	function onFileSelected(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.files?.length) return;

		src = null;
		const image = target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			src = e.target?.result as string;
		};
	}
</script>

<div class="upload-row mt-sm {className}">
	<label
		for="image-upload"
		class="px-sm py-sm block w-fit max-w-xs cursor-pointer rounded font-semibold text-white hover:opacity-90 {tokens.bg}"
	>
		{label}
		{#if showOptional}
			<span class="font-normal">(optional)</span>
		{/if}
	</label>

	<input id="image-upload" class="hidden" type="file" {accept} onchange={onFileSelected} />
</div>
