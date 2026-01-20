<script lang="ts">
	import { DividerCurves, DividerPolygon } from '$lib/components';

	interface Props {
		type?: 'curves' | 'polygon';
		class?: string;
	}

	let { type = 'curves', class: className = '' }: Props = $props();
</script>

<div class="divider-wrapper {className}">
	{#if type === 'curves'}
		<DividerCurves />
	{:else}
		<DividerPolygon />
	{/if}
</div>
