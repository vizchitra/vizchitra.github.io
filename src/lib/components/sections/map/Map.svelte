<script lang="ts">
	const { type } = $props<{ type: 'workshop' | 'conference' }>();

	const BASE = 'https://staticmap.openstreetmap.de/staticmap.php';

	// Conference: Bangalore International Centre
	const conferenceUrl =
		`${BASE}?center=12.966827628489266,77.63523618257383` +
		`&zoom=14&size=800x420&maptype=mapnik` +
		`&markers=12.966827628489266,77.63523618257383,red-pushpin`;

	// Workshops: midpoint between Samagata Foundation and Underline Center
	const workshopUrl =
		`${BASE}?center=12.971429203549093,77.61972309781267` +
		`&zoom=13&size=800x420&maptype=mapnik` +
		`&markers=12.97563511752492,77.6027528238416,red-pushpin` +
		`|12.967223289573266,77.63669336178374,red-pushpin`;

	const src = type === 'conference' ? conferenceUrl : workshopUrl;
	const alt =
		type === 'conference'
			? 'Map showing Bangalore International Centre, conference venue'
			: 'Map showing Samagata Foundation and Underline Center, workshop venues';
</script>

<img {src} {alt} class="h-full w-full rounded-2xl object-cover" loading="lazy" />
