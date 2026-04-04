import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { resolveAllSessions } from '$lib/utils/sessions';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const { sessions: rawSessions, formats } = resolveAllSessions();

	const sessions = await Promise.all(
		rawSessions.map(async (s) => {
			if (s.tbd || !s.description) return { ...s, descriptionHtml: '' };

			const truncated =
				s.description.length > 200 ? s.description.slice(0, 200) + '...' : s.description;
			const descriptionHtml = await marked.parseInline(truncated);
			return { ...s, descriptionHtml };
		})
	);

	return {
		sessions,
		formats,
		pageMeta: {
			title: 'Sessions | VizChitra 2026',
			description:
				'Explore the confirmed sessions for VizChitra 2026 — talks, dialogues, workshops, and exhibitions.',
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg',
			noSuffix: true
		}
	};
};
