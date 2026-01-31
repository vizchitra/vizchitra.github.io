export type ProposalStatus = 'Selected' | 'Under Review' | 'Not Selected';

export interface BaseProposal {
	id: string;
	slug: string;
	submittedAt: string;
	firstName: string;
	jobTitle: string;
	organisation: string;
	status: ProposalStatus;
}

export interface CFPProposal extends BaseProposal {
	type: 'cfp';
	proposalType: 'Talks' | 'Dialogues' | 'Workshop';
	theme: string;
	title: string;
	description: string;
	links: string[];
	materials?: string; // Conditional: Dialogues/Workshops only
	roomSetup?: string; // Conditional: Dialogues/Workshops only
}

export interface CFEProposal extends BaseProposal {
	type: 'cfe';
	submissionType: 'Individual' | 'Collective';
	projectTitle: string;
	projectDescription: string;
	dataSource: string;
	visualizationMethod: string;
	technicalRequirements: string;
	timeline: string;
	previousProjects: string;
	sketches: string;
	teamName?: string; // Conditional: Collective only
	teamBio?: string; // Conditional: Collective only
}

export type Proposal = CFPProposal | CFEProposal;

// Type guards
export function isCFPProposal(proposal: Proposal): proposal is CFPProposal {
	return proposal.type === 'cfp';
}

export function isCFEProposal(proposal: Proposal): proposal is CFEProposal {
	return proposal.type === 'cfe';
}
