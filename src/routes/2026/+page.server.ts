import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { resolveConfirmedSessions } from '$lib/utils/sessions';
import { getSpeakerOrder } from '$lib/components/sessions/speakerConfig.js';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const raw = resolveConfirmedSessions();

	const selectedSessions = await Promise.all(
		raw.map(async (s) => {
			if (!s.shortDescription) return { ...s, descriptionHtml: '' };
			const descriptionHtml = await marked.parseInline(s.shortDescription);
			return { ...s, descriptionHtml };
		})
	);

	selectedSessions.sort(
		(a, b) =>
			getSpeakerOrder(a.speakerName, a.sessionType) - getSpeakerOrder(b.speakerName, b.sessionType)
	);

	return {
		selectedSessions,
		pageMeta: {
			title: 'VizChitra 2026',
			description: 'VizChitra 2026 is happening on 3rd and 4th July, 2026 in Bangalore',
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg',
			noSuffix: true
		}
	};
};
