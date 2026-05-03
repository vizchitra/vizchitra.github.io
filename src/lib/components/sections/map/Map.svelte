<script lang="ts">
	const { type } = $props<{ type: 'workshop' | 'conference' }>();

	const src = type === 'conference' ? '/images/map/conference.jpg' : '/images/map/workshop.jpg';
	const alt =
		type === 'conference'
			? 'Map showing Bangalore International Centre, conference venue'
			: 'Map showing Samagata Foundation and Underline Center, workshop venues';
</script>

<img {src} {alt} class="h-full w-full rounded-2xl object-cover" loading="lazy" />
