import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { resolveAllSessions, getSessionOrder } from '$lib/utils/sessions';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const { sessions: rawSessions } = resolveAllSessions();

	const dialogues = rawSessions.filter((s) => s.sessionType === 'Dialogues');

	const sessions = await Promise.all(
		dialogues.map(async (s) => {
			if (s.tbd || !s.shortDescription) return { ...s, descriptionHtml: '' };

			const descriptionHtml = await marked.parseInline(s.shortDescription);
			return { ...s, descriptionHtml };
		})
	);

	sessions.sort((a, b) => getSessionOrder(a) - getSessionOrder(b));
	sessions.sort((a, b) => Number(a.tbd) - Number(b.tbd));

	return {
		sessions,
		pageMeta: {
			title: 'Dialogues | VizChitra 2026',
			description:
				'Explore the dialogues lined up for VizChitra 2026 — open conversations between practitioners on shared questions.',
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg',
			noSuffix: true
		}
	};
};
