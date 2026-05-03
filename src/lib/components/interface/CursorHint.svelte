<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="mt-6 mb-1 flex flex-row items-end gap-1">
	<span class="text-viz-grey block pb-px text-lg md:text-[18px]">
		{@render children()}
	</span>
	<svg
		width="23"
		height="21"
		viewBox="0 0 23 21"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			d="M15.5299 20.6648C15.6209 20.9255 15.906 21.0631 16.1668 20.9721L20.4155 19.4895C20.6762 19.3985 20.8138 19.1134 20.7228 18.8526C20.6319 18.5919 20.3467 18.4543 20.086 18.5453L16.3094 19.8632L14.9914 16.0866C14.9005 15.8258 14.6154 15.6882 14.3546 15.7792C14.0939 15.8702 13.9563 16.1553 14.0473 16.416L15.5299 20.6648ZM3.9998 5.99999L4.22341 6.4472C8.11498 4.5014 12.6393 4.55262 15.3118 6.70208C17.9167 8.79707 19.0096 13.1178 15.5517 20.2827L16.002 20.5L16.4523 20.7174C19.9924 13.3822 19.0843 8.45288 15.9386 5.92284C12.8605 3.44726 7.88477 3.49847 3.77619 5.55278L3.9998 5.99999Z"
			fill="currentColor"
		/>
	</svg>
</div>
