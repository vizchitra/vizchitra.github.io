<script lang="ts">
	export let id: string;
	export let title: string = '';
	export let className: string = 'speakerdeck-iframe';

	const src = id ? `https://speakerdeck.com/player/${id}` : '';
</script>

{#if src}
	<div class="speakerdeck-container container mx-auto px-6">
		<iframe
			class={className}
			frameborder="0"
			{src}
			{title}
			allowfullscreen
			style="border: 0; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0; padding: 0; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;"
			data-ratio="1.7777777777777777"
		></iframe>
	</div>
{:else}
	<!-- missing id -->
{/if}
