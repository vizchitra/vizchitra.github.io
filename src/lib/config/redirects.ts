/**
 * Configuration for external redirects
 * path: the local path that should redirect (without leading slash)
 * url: the external URL to redirect to
 * type: 'permanent' (301) or 'temporary' (302)
 */
export interface Redirect {
	path: string;
	url: string;
	type?: 'permanent' | 'temporary';
}

export const redirects: Redirect[] = [
	{
		path: 'friends',
		url: 'https://chat.whatsapp.com/CbIu7z6ITmGFvwfw0BjDdL',
		type: 'permanent'
	},
	{
		path: 'conference',
		url: 'https://hasgeek.com/vizchitra/vizchitra-2025',
		type: 'permanent'
	}
];
