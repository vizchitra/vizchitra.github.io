import Papa from 'papaparse';
import type { CFPProposal, CFEProposal } from '$lib/types/proposals';

/**
 * Parse CSV string using PapaParse
 */
export function parseCSV(csvString: string): Record<string, string>[] {
	const result = Papa.parse(csvString, {
		header: true,
		skipEmptyLines: true,
		transformHeader: (header) => header.trim().replace(/\n/g, '')
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
		const submissionId = row['id'];
		const proposalType = row['proposal_type']?.trim();
		const firstName = row['first_name'];

		// Skip rows without required fields
		if (!submissionId || !proposalType || !firstName) continue;

		let proposal: CFPProposal | null = null;

		if (proposalType === 'Talks') {
			const title = row['talk_title'];
			const theme = row['talk_theme'];
			const description = row['talk_description'];

			if (!title || !theme || !description) continue;

			proposal = {
				type: 'cfp',
				id: submissionId,
				slug: generateSlug(title, submissionId),
				submittedAt: row['submitted_at'],
				firstName,
				jobTitle: row['job_title'] || '',
				organisation: row['organisation'] || '',
				status: (row['status'] as any) || 'Under Review',
				proposalType: 'Talks',
				theme,
				title,
				description,
				links: combineLinks(row['talk_links'], row['talk_link_1'], row['talk_link_2'])
			};
		} else if (proposalType === 'Dialogues') {
			const title = row['dialogue_title'];
			const theme = row['dialogue_theme'];
			const description = row['dialogue_description'];

			if (!title || !theme || !description) continue;

			proposal = {
				type: 'cfp',
				id: submissionId,
				slug: generateSlug(title, submissionId),
				submittedAt: row['submitted_at'],
				firstName,
				jobTitle: row['job_title'] || '',
				organisation: row['organisation'] || '',
				status: (row['status'] as any) || 'Under Review',
				proposalType: 'Dialogues',
				theme,
				title,
				description,
				links: combineLinks(row['dialogue_links'], row['dialogue_link_1'], row['dialogue_link_2']),
				materials: row['dialogue_materials'] || undefined,
				roomSetup: row['dialogue_room'] || undefined
			};
		} else if (proposalType === 'Workshop') {
			const title = row['workshop_title'] || row['talk_title'];
			const theme = row['workshop_theme'] || row['talk_theme'];
			const description = row['workshop_description'] || row['talk_description'];

			if (!title || !theme || !description) continue;

			proposal = {
				type: 'cfp',
				id: submissionId,
				slug: generateSlug(title, submissionId),
				submittedAt: row['submitted_at'],
				firstName,
				jobTitle: row['job_title'] || '',
				organisation: row['organisation'] || '',
				status: (row['status'] as any) || 'Under Review',
				proposalType: 'Workshop',
				theme,
				title,
				description,
				links: combineLinks(row['workshop_links'], row['workshop_link_1'], row['workshop_link_2']),
				materials: row['workshop_materials'] || undefined,
				roomSetup: row['workshop_room'] || undefined
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
		const submissionId = row['id'];
		const firstName = row['first_name'];
		const submissionType = row['submission_type'];
		const projectTitle = row['project_title'];
		const projectDescription = row['project_description'];

		// Skip rows without required fields
		if (!submissionId || !firstName || !submissionType || !projectTitle || !projectDescription)
			continue;

		const proposal: CFEProposal = {
			type: 'cfe',
			id: submissionId,
			slug: generateSlug(projectTitle, submissionId),
			submittedAt: row['submitted_at'],
			firstName,
			jobTitle: row['job_title'] || '',
			organisation: row['organisation'] || '',
			status: (row['status'] as any) || 'Under Review',
			submissionType: submissionType === 'Collective' ? 'Collective' : 'Individual',
			projectTitle,
			projectDescription,
			dataSource: row['data_source'] || '',
			visualizationMethod: row['visualization_method'] || '',
			technicalRequirements: row['technical_requirements'] || '',
			timeline: row['timeline'] || '',
			previousProjects: row['previous_projects'] || '',
			sketches: row['sketches'] || ''
		};

		// Add conditional fields for Collective submissions
		if (submissionType === 'Collective') {
			proposal.teamName = row['team_name'] || undefined;
			proposal.teamBio = row['team_bio'] || undefined;
		}

		proposals.push(proposal);
	}

	return proposals;
}
