import { error } from '@sveltejs/kit';
import type { PageLoad, EntryGenerator } from './$types';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import cfpRaw from '../../../../../content/2026/data/cfp_sample.csv?raw';
import cfeRaw from '../../../../../content/2026/data/cfe_sample.csv?raw';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	return proposals.map((p) => ({ id: p.slug }));
};

export const load: PageLoad = async ({ params, fetch }) => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	const proposal = proposals.find((p) => p.slug === params.id);

	if (!proposal) {
		throw error(404, `Proposal "${params.id}" not found`);
	}

	// Fetch vote data (just the total count during SSR/prerender)
	// Device ID not available server-side, component will fetch user-specific status client-side
	let voteData = { votes: 0, hasVoted: false };

	try {
		const response = await fetch(`/api/proposals/${params.id}/votes`);
		if (response.ok) {
			voteData = await response.json();
		}
	} catch (e) {
		// Graceful degradation: use defaults
		console.warn('Failed to fetch vote data:', e);
	}

	return { proposal, voteData };
};
