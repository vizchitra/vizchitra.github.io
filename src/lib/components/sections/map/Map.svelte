<script lang="ts">
	const MAPTILER_KEY = 'YNqfpfEi1e5BsLyLojCf';
	const MAP_STYLE = 'streets-v2';

	const { type } = $props<{ type: 'workshop' | 'conference' }>();

	// Conference: Bangalore International Centre
	const conferenceUrl = [
		`https://api.maptiler.com/maps/${MAP_STYLE}/static`,
		`/77.63523618257383,12.966827628489266,14/800x420.png`,
		`?key=${MAPTILER_KEY}`,
		`&markers=pin-s-star+e779a6|77.63523618257383,12.966827628489266`
	].join('');

	// Workshops: midpoint between Samagata Foundation and Underline Center
	const workshopUrl = [
		`https://api.maptiler.com/maps/${MAP_STYLE}/static`,
		`/77.61972309781267,12.971429203549093,13/800x420.png`,
		`?key=${MAPTILER_KEY}`,
		`&markers=pin-s-star+e779a6|77.6027528238416,12.97563511752492`,
		`|77.63669336178374,12.967223289573266`
	].join('');

	const src = type === 'conference' ? conferenceUrl : workshopUrl;
	const alt =
		type === 'conference'
			? 'Map showing Bangalore International Centre, conference venue'
			: 'Map showing Samagata Foundation and Underline Center, workshop venues';
</script>

<img {src} {alt} class="h-full w-full rounded-2xl object-cover" loading="lazy" />
