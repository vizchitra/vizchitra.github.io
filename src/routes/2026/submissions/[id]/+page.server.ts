import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import { marked } from 'marked';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import cfpRaw from '../../../../../content/2026/data/cfp.csv?raw';
import cfeRaw from '../../../../../content/2026/data/cfe.csv?raw';
import cfpFeedbackRaw from '../../../../../content/2026/feedback/cfp.json';
import cfeFeedbackRaw from '../../../../../content/2026/feedback/cfe.json';

// Prerender the static shell; studio users get runtime data via client fetch
export const prerender = true;

export const entries: EntryGenerator = async () => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	return proposals.map((p) => ({ id: p.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	const proposal = proposals.find((p) => p.slug === params.id);

	if (!proposal) {
		throw error(404, `Proposal "${params.id}" not found`);
	}

	const title = proposal.type === 'cfp' ? proposal.title : proposal.projectTitle;
	const description = proposal.type === 'cfp' ? proposal.description : proposal.projectDescription;
	const shortDesc = description.split('\n')[0] || description.substring(0, 150);
	const descriptionHtml = await marked.parse(description);

	let additionalHtml: Record<string, string> = {};
	if (proposal.type === 'cfp') {
		const p = proposal as any;
		additionalHtml = {
			materials: p.materials ? await marked.parse(p.materials) : '',
			roomSetup: p.roomSetup ? await marked.parse(p.roomSetup) : ''
		};
	} else {
		const p = proposal as any;
		additionalHtml = {
			dataSource: p.dataSource ? await marked.parse(p.dataSource) : '',
			visualizationMethod: p.visualizationMethod ? await marked.parse(p.visualizationMethod) : '',
			technicalRequirements: p.technicalRequirements
				? await marked.parse(p.technicalRequirements)
				: '',
			timeline: p.timeline ? await marked.parse(p.timeline) : '',
			teamBio: p.teamBio ? await marked.parse(p.teamBio) : ''
		};
	}

	// Feedback data (from committed JSON — studio users get live data client-side)
	const feedbackMap =
		proposal.type === 'cfp'
			? (cfpFeedbackRaw as Record<string, { status: string; notes: string }>)
			: (cfeFeedbackRaw as Record<string, { status: string; notes: string }>);
	const feedback = feedbackMap[proposal.id] ?? null;

	// Vote data will be fetched client-side by the UpvoteButton component
	// This avoids trying to fetch from the non-prerenderable API during prerendering
	return {
		proposal,
		descriptionHtml,
		additionalHtml,
		feedback,
		voteData: { votes: 0, hasVoted: false },
		pageMeta: {
			title: `${title} | VizChitra 2026 Proposals`,
			noSuffix: true,
			description: shortDesc,
			ogImage: `https://vizchitra.com/2026/submissions/${proposal.slug}/og-image.png`,
			ogType: 'article'
		}
	};
};
