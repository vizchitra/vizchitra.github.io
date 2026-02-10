// Site-wide constants and types for meta tags and layout configuration

export const SITE = {
	name: 'VizChitra',
	tagline: 'An Indian Data Visualization Community',
	url: 'https://vizchitra.com',
	description:
		'VizChitra is a community space to bring people across the data visualisation spectrum in India together and create a space to connect & create with data',
	defaultOgImage: 'https://vizchitra.com/images/preview/vizchitra-preview.jpg'
} as const;

export interface PageMeta {
	title?: string;
	description?: string;
	ogImage?: string;
	ogType?: string;
	noSuffix?: boolean;
}

export interface PageLayout {
	banner?: 'polygon' | 'curve' | 'square' | 'blob';
	color?: 'yellow' | 'teal' | 'blue' | 'orange' | 'pink' | 'grey';
}
