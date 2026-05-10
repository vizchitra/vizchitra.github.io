<script lang="ts">
	export let type: 'workshop' | 'conference';

	const conferenceStatic = '/images/map/conference.png';
	const workshopStatic = '/images/map/workshop.png';

	$: src = type === 'conference' ? conferenceStatic : workshopStatic;
	$: alt =
		type === 'conference'
			? 'Map showing Bangalore International Centre, conference venue'
			: 'Map showing Samagata Foundation and Underline Center, workshop venues';
</script>

<img {src} {alt} class="h-full w-full rounded-2xl object-cover" loading="lazy" />
