import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { resolveAllSessions } from '$lib/utils/sessions';
import { getSpeakerOrder } from '$lib/components/sessions/speakerConfig.js';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const { sessions: rawSessions } = resolveAllSessions();

	const talks = rawSessions.filter((s) => s.sessionType === 'Talks');

	const sessions = await Promise.all(
		talks.map(async (s) => {
			if (s.tbd || !s.shortDescription) return { ...s, descriptionHtml: '' };

			const descriptionHtml = await marked.parseInline(s.shortDescription);
			return { ...s, descriptionHtml };
		})
	);

	sessions.sort(
		(a, b) =>
			getSpeakerOrder(a.speakerName, a.sessionType) -
			getSpeakerOrder(b.speakerName, b.sessionType)
	);
	sessions.sort((a, b) => Number(a.tbd) - Number(b.tbd));

	return {
		sessions,
		pageMeta: {
			title: 'Talks | VizChitra 2026',
			description:
				'Explore the talks lined up for VizChitra 2026 — perspectives from leading practitioners in data visualisation.',
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg',
			noSuffix: true
		}
	};
};
