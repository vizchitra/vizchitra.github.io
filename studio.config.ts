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
	schema?: CollectionSchema[];
}

export interface StudioConfig {
	description: string;
	instructions: string;
	collections: StudioCollection[];
}

export const studioConfig: StudioConfig = {
	description: 'Editorial workspace for VizChitra 2026 content.',
	instructions:
		'Raise a PR for all changes. Ping @amitkaps for review before merging. ' +
		'Keep tone warm, inclusive, and practical. ' +
		'For markdown pages: edit body and frontmatter via the in-page editor. ' +
		'For structured data: use the collection form to update records.',
	collections: [
		{
			name: 'Pages',
			path: 'content/pages',
			type: 'markdown',
			description: 'Standalone markdown pages (community, ethos, conduct, tools)'
		},
		{
			name: 'Guides — Talks',
			path: 'content/guides/talks',
			type: 'markdown',
			description: 'Facilitator guides for Talk sessions'
		},
		{
			name: 'Guides — Workshops',
			path: 'content/guides/workshops',
			type: 'markdown',
			description: 'Facilitator guides for Workshop sessions'
		},
		{
			name: 'Guides — Dialogues',
			path: 'content/guides/dialogues',
			type: 'markdown',
			description: 'Facilitator guides for Dialogue sessions'
		},
		{
			name: 'Guides — Exhibition',
			path: 'content/guides/exhibition',
			type: 'markdown',
			description: 'Facilitator guides for Exhibition sessions'
		},
		{
			name: 'Guides — Panels',
			path: 'content/guides/panels',
			type: 'markdown',
			description: 'Facilitator guides for Panel sessions'
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
