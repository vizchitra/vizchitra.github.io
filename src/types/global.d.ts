// Canonical global module declarations for project assets and aliased data imports
declare module '*.csv' {
	const content: any[];
	export default content;
}

declare module '$lib/data/*.csv' {
	const content: any[];
	export default content;
}

declare module '$lib/data/*';

// Explicit common CSV imports used in routes
declare module '$lib/data/youtube-videos.csv' {
	const content: any[];
	export default content;
}
declare module '$lib/data/orgs.csv' {
	const content: any[];
	export default content;
}
declare module '$lib/data/years.csv' {
	const content: any[];
	export default content;
}
declare module '$lib/data/size.csv' {
	const content: any[];
	export default content;
}
declare module '$lib/data/roles.csv' {
	const content: any[];
	export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.avif';
declare module '*.svg' {
	const src: string;
	export default src;
}

declare module '*.ico';

// Generic catch-all for raw imports
declare module '*?raw' {
	const content: string;
	export default content;
}

export {};
