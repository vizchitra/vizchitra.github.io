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
	instructions: {
		lead: string;
		bullets: { label: string; text: string }[];
	};
	collections: StudioCollection[];
}

export const studioConfig: StudioConfig = {
	description: 'Content Editing for VizChitra Website.',
	instructions: {
		lead: 'When you publish, your changes go live on the website immediately.',
		bullets: [
			{
				label: 'Tone',
				text: 'Write warmly and clearly — imagine speaking directly to someone at VizChitra.'
			},
			{
				label: 'Pages',
				text: 'Open any page on the site to edit it using the inline editor.'
			},
			{
				label: 'Collections',
				text: 'Use the collection view to update session and event records.'
			}
		]
	},
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
		}
	]
};
