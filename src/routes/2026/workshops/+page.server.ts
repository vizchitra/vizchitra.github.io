import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { resolveAllSessions } from '$lib/utils/sessions';
import { getSpeakerOrder } from '$lib/components/sessions/speakerConfig.js';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const { sessions: rawSessions } = resolveAllSessions();

	const workshops = rawSessions.filter((s) => s.sessionType === 'Workshops');

	const sessions = await Promise.all(
		workshops.map(async (s) => {
			if (s.tbd || !s.shortDescription) return { ...s, descriptionHtml: '' };

			const descriptionHtml = await marked.parseInline(s.shortDescription);
			return { ...s, descriptionHtml };
		})
	);

	// Sort by configured order in speakerConfig, then push TBD entries last
	sessions.sort(
		(a, b) =>
			getSpeakerOrder(a.speakerName, a.sessionType) - getSpeakerOrder(b.speakerName, b.sessionType)
	);
	sessions.sort((a, b) => Number(a.tbd) - Number(b.tbd));

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
