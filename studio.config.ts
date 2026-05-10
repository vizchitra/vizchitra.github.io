export interface CollectionSchema {
	key: string;
	type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'date';
	label: string;
	required?: boolean;
	options?: string[];
}

export interface StudioCollection {
	name: string;
	path: string;
	type: 'markdown' | 'json';
	description: string;
	group?: string; // collections sharing a group name → merged into a TreeGroup
	urlTemplate?: string; // e.g. '/{slug}' or '/guides/{dirSlug}/{section}'
	schema?: CollectionSchema[];
}

export interface StudioConfig {
	description: string;
	instructions: string;
	collections: StudioCollection[];
}

export const studioConfig: StudioConfig = {
	description: 'Content Editing for VizChitra Website.',
	instructions:
		'When you publish, your changes are sent for review and will go live on the website automatically. ' +
		'Write in a warm, welcoming, and clear tone — as if speaking directly to attendees. ' +
		'To edit a page, use the editor that appears on the page itself. ' +
		'To update session or event records, use the form in the collection view.',
	collections: [
		{
			name: 'Pages',
			path: 'content/pages',
			type: 'markdown',
			description: 'Standalone markdown pages (community, ethos, conduct, tools)',
			urlTemplate: '/{slug}'
		},
		{
			name: 'Talks',
			path: 'content/guides/talks',
			type: 'markdown',
			group: 'Guides',
			description: 'Facilitator guides for Talk sessions',
			urlTemplate: '/guides/{dirSlug}/{section}'
		},
		{
			name: 'Workshops',
			path: 'content/guides/workshops',
			type: 'markdown',
			group: 'Guides',
			description: 'Facilitator guides for Workshop sessions',
			urlTemplate: '/guides/{dirSlug}/{section}'
		},
		{
			name: 'Dialogues',
			path: 'content/guides/dialogues',
			type: 'markdown',
			group: 'Guides',
			description: 'Facilitator guides for Dialogue sessions',
			urlTemplate: '/guides/{dirSlug}/{section}'
		},
		{
			name: 'Exhibition',
			path: 'content/guides/exhibition',
			type: 'markdown',
			group: 'Guides',
			description: 'Facilitator guides for Exhibition sessions',
			urlTemplate: '/guides/{dirSlug}/{section}'
		},
		{
			name: 'Panels',
			path: 'content/guides/panels',
			type: 'markdown',
			group: 'Guides',
			description: 'Facilitator guides for Panel sessions',
			urlTemplate: '/guides/{dirSlug}/{section}'
		},
		{
			name: 'Sessions 2026',
			path: 'content/2026/data',
			type: 'json',
			description: 'Session records for VizChitra 2026',
			schema: [
				{ key: 'title', type: 'text', label: 'Title', required: true },
				{
					key: 'format',
					type: 'select',
					label: 'Format',
					options: ['Talk', 'Workshop', 'Dialogue', 'Exhibition', 'Panel']
				},
				{
					key: 'status',
					type: 'select',
					label: 'Status',
					options: ['tbd', 'announced', 'confirmed']
				},
				{ key: 'description', type: 'textarea', label: 'Description' }
			]
		}
	]
};
