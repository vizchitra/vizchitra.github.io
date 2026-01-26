import { error } from '@sveltejs/kit';
import type { PageServerLoad, EntryGenerator } from './$types';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import { readFileSync } from 'fs';
import { join } from 'path';

export const prerender = true;

// Generate all proposal slugs for prerendering
export const entries: EntryGenerator = async () => {
	const cfpPath = join(process.cwd(), 'content/2026/data/cfp_sample.csv');
	const cfePath = join(process.cwd(), 'content/2026/data/cfe_sample.csv');

	const cfpRaw = readFileSync(cfpPath, 'utf-8');
	const cfeRaw = readFileSync(cfePath, 'utf-8');

	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	return proposals.map((p) => ({ id: p.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const cfpPath = join(process.cwd(), 'content/2026/data/cfp_sample.csv');
	const cfePath = join(process.cwd(), 'content/2026/data/cfe_sample.csv');

	const cfpRaw = readFileSync(cfpPath, 'utf-8');
	const cfeRaw = readFileSync(cfePath, 'utf-8');

	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	const proposal = proposals.find((p) => p.slug === params.id);

	if (!proposal) {
		throw error(404, `Proposal "${params.id}" not found`);
	}

	return { proposal };
};
