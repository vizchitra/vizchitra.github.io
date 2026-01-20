// Canonical global module declarations for project assets and aliased data imports
declare module '*.csv' {
	const content: any[];
	export default content;
}

// The project now exposes data via the static `/data` directory.
// Generic CSV module declaration is kept for any remaining CSV imports.
declare module '$lib/data/*';

declare module '*.svg' {
	const src: string;
	export default src;
}
declare module '*.svg?url' {
	const src: string;
	export default src;
}
declare module '*.svg?raw' {
	const content: string;
	export default content;
}
declare module '*.svg?url&raw' {
	const src: string;
	export default src;
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

/// <reference types="@sveltejs/kit" />
declare module '*.md' {
	import type { SvelteComponent } from 'svelte';
	export default class Markdown extends SvelteComponent {}
}

declare module '*.svx' {
	import type { SvelteComponent } from 'svelte';
	export default class SvxComponent extends SvelteComponent {}
}

// Generic catch-all for raw imports
declare module '*?raw' {
	const content: string;
	export default content;
}

export {};
