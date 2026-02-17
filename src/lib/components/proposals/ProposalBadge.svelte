<script lang="ts">
	interface Props {
		text: string;
		color: 'pink' | 'blue' | 'yellow' | 'teal' | 'orange';
	}

	let { text, color }: Props = $props();

	const colorClasses = {
		pink: 'bg-viz-pink-light/30 text-viz-pink-dark',
		blue: 'bg-viz-blue-light/30 text-viz-blue-dark',
		yellow: 'bg-viz-yellow-light/30 text-viz-yellow-dark',
		teal: 'bg-viz-teal-light/30 text-viz-teal-dark',
		orange: 'bg-viz-orange-light/30 text-viz-orange-dark'
	};
</script>

<span class="inline-block rounded-full px-3 py-1 text-sm font-semibold {colorClasses[color]}">
	{text}
</span>
