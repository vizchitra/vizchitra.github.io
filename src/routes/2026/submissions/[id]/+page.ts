import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import cfpRaw from '../../../../../content/2026/data/cfp.csv?raw';
import cfeRaw from '../../../../../content/2026/data/cfe.csv?raw';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	return proposals.map((p) => ({ id: p.slug }));
};

export const load: PageLoad = async ({ params }) => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	const proposal = proposals.find((p) => p.slug === params.id);

	if (!proposal) {
		throw error(404, `Proposal "${params.id}" not found`);
	}

	const title = proposal.type === 'cfp' ? proposal.title : proposal.projectTitle;
	const description =
		proposal.type === 'cfp' ? proposal.description : proposal.projectDescription;
	const shortDesc = description.split('\n')[0] || description.substring(0, 150);

	// Vote data will be fetched client-side by the UpvoteButton component
	// This avoids trying to fetch from the non-prerenderable API during prerendering
	return {
		proposal,
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
