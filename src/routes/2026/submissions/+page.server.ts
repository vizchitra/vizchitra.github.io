import type { PageServerLoad } from './$types';
import { marked } from 'marked';
import { parseCFPProposals, parseCFEProposals } from '$lib/utils/csv-parser';
import cfpRaw from '../../../../content/2026/data/cfp.csv?raw';
import cfeRaw from '../../../../content/2026/data/cfe.csv?raw';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const cfpProposals = parseCFPProposals(cfpRaw);
	const cfeProposals = parseCFEProposals(cfeRaw);
	const rawProposals = [...cfpProposals, ...cfeProposals];

	const proposals = await Promise.all(
		rawProposals.map(async (p) => {
			const desc = p.type === 'cfp' ? p.description : p.projectDescription;
			const truncated = desc.length > 250 ? desc.slice(0, 250) + '...' : desc;
			const summaryHtml = await marked.parseInline(truncated);
			return { ...p, summaryHtml };
		})
	);

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
