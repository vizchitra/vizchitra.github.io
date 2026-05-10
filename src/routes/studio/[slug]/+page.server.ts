import { allAudits } from 'content-collections';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const { slug } = params;

	const doc = allAudits.find((d) => d.slug === slug);

	if (!doc) {
		throw error(404, 'Studio document not found');
	}

	return {
		document: doc,
		pageMeta: {
			title: `${doc.title} - Studio`,
			description: doc.description
		}
	};
}
