import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import { marked } from 'marked';
import { resolveAllSessions } from '$lib/utils/sessions';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const { sessions } = resolveAllSessions();
	return sessions.filter((s) => !s.tbd).map((s) => ({ slug: s.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const { sessions } = resolveAllSessions();
	const confirmed = sessions.filter((s) => !s.tbd);

	const session = confirmed.find((s) => s.slug === params.slug);

	if (!session) {
		throw error(404, `Session "${params.slug}" not found`);
	}

	const descriptionHtml = session.longDescription
		? await marked.parse(session.longDescription, { breaks: true })
		: '';
	const speakerAboutHtml = session.speakerAbout
		? await marked.parse(session.speakerAbout, { breaks: true })
		: '';

	// Related sessions: prioritise same theme (sessionType), then others
	const relatedSessions = confirmed
		.filter((s) => s.slug !== session.slug)
		.sort((a, b) => {
			const aMatch = a.sessionType === session.sessionType ? 1 : 0;
			const bMatch = b.sessionType === session.sessionType ? 1 : 0;
			return bMatch - aMatch;
		})
		.slice(0, 3);

	return {
		session,
		descriptionHtml,
		speakerAboutHtml,
		relatedSessions,
		pageMeta: {
			title: `${session.title} | VizChitra 2026 Sessions`,
			noSuffix: true,
			description:
				session.shortDescription ||
				session.longDescription.split('\n')[0] ||
				session.longDescription.substring(0, 150),
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg'
		}
	};
};
