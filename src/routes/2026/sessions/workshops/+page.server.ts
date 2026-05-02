import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { resolveAllSessions } from '$lib/utils/sessions';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const { sessions: rawSessions } = resolveAllSessions();

	const workshops = rawSessions.filter((s) => s.sessionType === 'Workshop');

	const sessions = await Promise.all(
		workshops.map(async (s) => {
			if (s.tbd || !s.shortDescription) return { ...s, descriptionHtml: '' };

			const descriptionHtml = await marked.parseInline(s.shortDescription);
			return { ...s, descriptionHtml };
		})
	);

	return {
		sessions,
		pageMeta: {
			title: 'Workshops | VizChitra 2026',
			description:
				'Explore the workshops lined up for VizChitra 2026 — hands-on sessions with leading practitioners.',
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg',
			noSuffix: true
		}
	};
};
