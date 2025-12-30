<script lang="ts">
	import Pent from '$lib/components/structure/ornaments/Pentagons.svelte';
	export let backgroundColor = '#ffd485';
	export let title = '';
	export let description = '';
	export let seed = 1;
</script>

<Pent {backgroundColor} {title} {description} {seed} />
