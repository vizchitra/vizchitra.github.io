import type { PageServerLoad } from './$types';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import { readFileSync } from 'fs';
import { join } from 'path';

export const prerender = true;

export const load: PageServerLoad = async () => {
	// Read CSV files from the content directory
	const cfpPath = join(process.cwd(), 'content/2026/data/cfp_sample.csv');
	const cfePath = join(process.cwd(), 'content/2026/data/cfe_sample.csv');

	const cfpRaw = readFileSync(cfpPath, 'utf-8');
	const cfeRaw = readFileSync(cfePath, 'utf-8');

	// Parse proposals
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	// Extract unique types and themes for filters
	const types = [
		...new Set(
			proposals.map((p) => (p.type === 'cfp' ? p.proposalType : 'Exhibition'))
		)
	];

	const themes = [
		...new Set(
			proposals
				.filter((p) => p.type === 'cfp')
				.map((p) => (p.type === 'cfp' ? p.theme : ''))
		)
	].filter(Boolean);

	return { proposals, types, themes };
};
