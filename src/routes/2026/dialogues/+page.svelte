<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(() => goto('/2026/sessions?type=Dialogues', { replaceState: true }));
</script>
