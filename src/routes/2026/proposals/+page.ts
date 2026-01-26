import type { PageLoad } from './$types';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import cfpRaw from '../../../../content/2026/data/cfp_sample.csv?raw';
import cfeRaw from '../../../../content/2026/data/cfe_sample.csv?raw';

export const prerender = true;

export const load: PageLoad = async () => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const proposals = [...cfpProposals, ...cfeProposals];

	const types = [
		...new Set(proposals.map((p) => (p.type === 'cfp' ? p.proposalType : 'Exhibition')))
	];

	const themes = [
		...new Set(
			proposals.filter((p) => p.type === 'cfp').map((p) => (p.type === 'cfp' ? p.theme : ''))
		)
	].filter(Boolean);

	return { proposals, types, themes };
};
