<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(() => goto('/2026/sessions?type=Workshops', { replaceState: true }));
</script>
