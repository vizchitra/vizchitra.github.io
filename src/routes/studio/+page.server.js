import { allStudios } from 'content-collections';

export function load() {
	// Group by category
	const categories = {
		typography: [],
		tokens: [],
		components: [],
		patterns: [],
		audit: []
	};

	allStudios.forEach((doc) => {
		if (categories[doc.category]) {
			categories[doc.category].push(doc);
		}
	});

	// Sort within each category by order field
	Object.keys(categories).forEach((key) => {
		categories[key].sort((a, b) => (a.order || 999) - (b.order || 999));
	});

	return {
		categories,
		pageMeta: {
			title: 'Studio',
			description: 'Design system workspace for VizChitra'
		}
	};
}
