<script lang="ts">
	interface Props {
		id: string;
		title?: string;
		className?: string;
	}

	let { id, title = '', className = 'speakerdeck-iframe' }: Props = $props();
</script>

{#if id}
	<div class="speakerdeck-container container mx-auto px-md">
		<iframe
			class={className}
			frameborder="0"
			src={'https://speakerdeck.com/player/' + id}
			{title}
			allowfullscreen
			style="border: 0; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0; padding: 0; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;"
			data-ratio="1.7777777777777777"
		></iframe>
	</div>
{:else}
	<!-- missing id -->
{/if}
