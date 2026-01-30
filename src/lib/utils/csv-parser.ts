import Papa from 'papaparse';
import type { CFPProposal, CFEProposal } from '$lib/types/proposals';

/**
 * Parse CSV string using PapaParse
 */
export function parseCSV(csvString: string): Record<string, string>[] {
	const result = Papa.parse(csvString, {
		header: true,
		skipEmptyLines: true,
		transformHeader: (header) => header.trim()
	});

	return result.data as Record<string, string>[];
}

/**
 * Generate URL-friendly slug from title and ID
 */
export function generateSlug(title: string, id: string): string {
	const slugifiedTitle = title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '') // Remove special chars
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Remove duplicate hyphens
		.trim();

	// Append ID to ensure uniqueness
	return `${slugifiedTitle}-${id.toLowerCase()}`;
}

/**
 * Combine multiple link columns into array, filtering out empty values
 * and ensuring all links have a protocol
 */
function combineLinks(...links: string[]): string[] {
	return links
		.filter((link) => link && link.trim().length > 0)
		.map((link) => {
			const trimmed = link.trim();
			// Add https:// if the link doesn't start with a protocol
			if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
				return `https://${trimmed}`;
			}
			return trimmed;
		});
}

/**
 * Parse CFP proposals from CSV data
 */
export function parseCFPProposals(csvString: string): CFPProposal[] {
	const rows = parseCSV(csvString);
	const proposals: CFPProposal[] = [];

	for (const row of rows) {
		const submissionId = row['Submission ID'];
		const proposalType = row['Select your proposal type'];
		const firstName = row['First name'];

		// Skip rows without required fields
		if (!submissionId || !proposalType || !firstName) continue;

		let proposal: CFPProposal | null = null;

		if (proposalType === 'Talks') {
			const title = row['Title of your talk'];
			const theme = row['Select the VizChitra 2026 theme your talk falls under'];
			const description = row['A detailed description of your talk'];

			if (!title || !theme || !description) continue;

			proposal = {
				type: 'cfp',
				id: submissionId,
				slug: generateSlug(title, submissionId),
				submittedAt: row['Submitted at'],
				firstName,
				jobTitle: row['Job title'] || '',
				organisation: row['Organisation'] || '',
				status: (row['Status'] as any) || 'Under Review',
				proposalType: 'Talks',
				theme,
				title,
				description,
				links: combineLinks(
					row['Further links relevant to your talk proposal'],
					row['Enter a link here...'],
					row['Enter a link here..._1']
				)
			};
		} else if (proposalType === 'Dialogues') {
			const title = row['Title of your session'];
			const theme = row['Select the VizChitra 2026 theme your session falls under'];
			const description = row['A detailed description of your Dialogue session.'];

			if (!title || !theme || !description) continue;

			proposal = {
				type: 'cfp',
				id: submissionId,
				slug: generateSlug(title, submissionId),
				submittedAt: row['Submitted at'],
				firstName,
				jobTitle: row['Job title'] || '',
				organisation: row['Organisation'] || '',
				status: (row['Status'] as any) || 'Under Review',
				proposalType: 'Dialogues',
				theme,
				title,
				description,
				links: combineLinks(row['Enter a link here... (3)'], row['Enter a link here... (4)']),
				materials: row['Materials or tools required for the session'] || undefined,
				roomSetup: row['Room set-up needed'] || undefined
			};
		} else if (proposalType === 'Workshop') {
			const title = row['Title of your workshop'];
			const theme = row['Select the VizChitra 2026 theme your talk falls under (2)'];
			const description = row['A detailed description of your workshop.'];

			if (!title || !theme || !description) continue;

			proposal = {
				type: 'cfp',
				id: submissionId,
				slug: generateSlug(title, submissionId),
				submittedAt: row['Submitted at'],
				firstName,
				jobTitle: row['Job title'] || '',
				organisation: row['Organisation'] || '',
				status: (row['Status'] as any) || 'Under Review',
				proposalType: 'Workshop',
				theme,
				title,
				description,
				links: combineLinks(row['Enter a link here... (5)'], row['Enter a link here... (6)']),
				materials: row['Materials or tools required for the session (2)'] || undefined,
				roomSetup: row['Room set-up needed (2)'] || undefined
			};
		}

		if (proposal) {
			proposals.push(proposal);
		}
	}

	return proposals;
}

/**
 * Parse CFE proposals from CSV data
 */
export function parseCFEProposals(csvString: string): CFEProposal[] {
	const rows = parseCSV(csvString);
	const proposals: CFEProposal[] = [];

	for (const row of rows) {
		const submissionId = row['Submission ID'];
		const firstName = row['First name'];
		const submissionType = row['Are you submitting as an individual or a collective?'];
		const projectTitle = row['Project Title'];
		const projectDescription = row['Project  Description\n'];

		// Skip rows without required fields
		if (!submissionId || !firstName || !submissionType || !projectTitle || !projectDescription)
			continue;

		const proposal: CFEProposal = {
			type: 'cfe',
			id: submissionId,
			slug: generateSlug(projectTitle, submissionId),
			submittedAt: row['Submitted at'],
			firstName,
			jobTitle: row['Job title'] || '',
			organisation: row['Organisation'] || '',
			status: (row['Status'] as any) || 'Under Review',
			submissionType: submissionType === 'Collective' ? 'Collective' : 'Individual',
			projectTitle,
			projectDescription,
			dataSource: row['What is your data?'] || '',
			visualizationMethod: row['How do you visualize it? '] || '',
			technicalRequirements: row['What technical/spatial requirements would you be needing?'] || '',
			timeline: row['Project status + Timeline'] || '',
			previousProjects: row['Examples of previous projects'] || '',
			sketches: row['Sketches / Concept Ideations'] || ''
		};

		// Add conditional fields for Collective submissions
		if (submissionType === 'Collective') {
			proposal.teamName = row['Collective/Team Name'] || undefined;
			proposal.teamBio = row['Collective/Team Bio'] || undefined;
		}

		proposals.push(proposal);
	}

	return proposals;
}
