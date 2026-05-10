/**
 * Studio content schemas.
 *
 * Mirrors the Zod schemas in content-collections.ts so that:
 *   - The frontmatter form renders the correct field types (text/textarea/number/checkbox/select)
 *   - Values are validated before saving
 *
 * When you change a collection schema in content-collections.ts, update
 * src/lib/content/schemas.ts — both files import from there automatically.
 */

import { pagesSchema, guidesSchema } from '$lib/content/schemas';

// ── Field spec ────────────────────────────────────────────────────────────

/** UI descriptor for a single frontmatter field in the Studio editor. */
export interface FieldSpec {
	type: 'text' | 'textarea' | 'number' | 'checkbox' | 'select';
	required: boolean;
	options?: readonly string[]; // for 'select'
	rows?: number; // for 'textarea'
	default?: unknown;
}

export type SchemaSpec = Record<string, FieldSpec>;

// ── Per-collection field specs ────────────────────────────────────────────

/** Drives the Studio frontmatter form UI. Keep in sync with COLLECTION_SCHEMAS below. */
export const COLLECTION_FIELD_SPECS: Record<string, SchemaSpec> = {
	pages: {
		title: { type: 'text', required: true },
		description: { type: 'textarea', required: false, rows: 3 },
		// slug is intentionally omitted — it falls through to read-only fallback in StudioPanel
		banner: { type: 'select', required: false, options: ['polygon', 'curve', 'square', 'blob'] },
		color: {
			type: 'select',
			required: false,
			options: ['grey', 'pink', 'blue', 'teal', 'yellow', 'orange']
		},
		draft: { type: 'checkbox', required: false, default: false }
	},
	guides: {
		title: { type: 'text', required: true },
		description: { type: 'textarea', required: true, rows: 3 },
		guide: {
			type: 'select',
			required: true,
			options: ['talks', 'workshops', 'dialogues', 'exhibition', 'panels']
		},
		section: { type: 'text', required: true },
		order: { type: 'number', required: true },
		draft: { type: 'checkbox', required: false, default: false }
	}
};

// ── Zod validation schemas (imported from shared source of truth) ─────────

export const COLLECTION_SCHEMAS = {
	pages: pagesSchema,
	guides: guidesSchema
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────

/** Derive collection name from a content file path, or null if unrecognised. */
export function collectionFromPath(filePath: string): keyof typeof COLLECTION_SCHEMAS | null {
	if (filePath.includes('content/pages/')) return 'pages';
	if (filePath.includes('content/guides/')) return 'guides';
	return null;
}

/**
 * Validate frontmatter values against the collection schema.
 * Returns a map of fieldKey → error message; empty object when valid.
 */
export function validateFrontmatter(
	filePath: string,
	values: Record<string, unknown>
): Record<string, string> {
	const collection = collectionFromPath(filePath);
	if (!collection) return {};

	const result = COLLECTION_SCHEMAS[collection].safeParse(values);
	if (result.success) return {};

	const errors: Record<string, string> = {};
	for (const issue of result.error.issues) {
		const key = issue.path[0] as string;
		if (key && !errors[key]) errors[key] = issue.message;
	}
	return errors;
}
