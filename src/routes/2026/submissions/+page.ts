import type { PageLoad } from './$types';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import cfpRaw from '../../../../content/2026/data/cfp.csv?raw';
import cfeRaw from '../../../../content/2026/data/cfe.csv?raw';

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

	return {
		proposals,
		types,
		themes,
		pageMeta: {
			title: 'Submissions | VizChitra 2026',
			description:
				'Browse all submitted proposals for talks, dialogues, workshops, and exhibitions at VizChitra 2026.',
			ogImage: 'https://vizchitra.com/images/preview/preview-2026.jpg',
			noSuffix: true
		}
	};
};
