import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { studioConfig, type StudioCollection } from '../../../studio.config';
import { parseCFPProposals, parseCFEProposals, generateSlug } from '$lib/utils/csv-parser';
import cfpRaw from '../../../content/2026/data/cfp.csv?raw';
import cfeRaw from '../../../content/2026/data/cfe.csv?raw';
import cfpFeedback from '../../../content/2026/feedback/cfp.json';
import cfeFeedback from '../../../content/2026/feedback/cfe.json';

export interface SubmissionRow {
	id: string;
	slug: string;
	title: string;
	submitter: string;
	format: string;
	status: string;
	notes: string;
	url: string;
}

// ── Shared types ─────────────────────────────────────────────────────────────

export interface FileEntry {
	title: string;
	filePath: string;
	url: string; // empty = no link (e.g. data files)
}

export interface FlatGroup {
	kind: 'flat';
	name: string;
	files: FileEntry[];
}

export interface GuideSubGroup {
	name: string; // display name, e.g. "Talks"
	slug: string; // URL slug, e.g. "talks"
	files: FileEntry[];
}

export interface TreeGroup {
	kind: 'tree';
	name: string;
	groups: GuideSubGroup[];
}

export type ContentGroup = FlatGroup | TreeGroup;

// ── Content tree builder ──────────────────────────────────────────────────────

async function buildContentTree(collections: StudioCollection[]): Promise<ContentGroup[]> {
	const { readdirSync, readFileSync, statSync } = await import('node:fs');
	const { join } = await import('node:path');
	const { default: matter } = await import('gray-matter');

	function getTitle(fullPath: string): string {
		try {
			const raw = readFileSync(fullPath, 'utf-8');
			return matter(raw).data?.title ?? fullPath.split('/').pop() ?? fullPath;
		} catch {
			return fullPath.split('/').pop() ?? fullPath;
		}
	}

	function getFrontmatterField(fullPath: string, field: string): string {
		try {
			return (matter(readFileSync(fullPath, 'utf-8')).data?.[field] as string) ?? '';
		} catch {
			return '';
		}
	}

	function resolveUrl(template: string, slug: string, dirSlug: string, fullPath: string): string {
		let url = template.replace('{dirSlug}', dirSlug).replace('{slug}', slug);
		if (url.includes('{section}')) {
			url = url.replace('{section}', getFrontmatterField(fullPath, 'section'));
		}
		// Unresolved tokens, empty trailing segment, or double slashes → no link
		if (url.includes('{') || url.endsWith('/') || url.includes('//')) return '';
		return url;
	}

	function filesForCollection(col: StudioCollection): FileEntry[] {
		const isMarkdown = col.type === 'markdown';
		const dirSlug = col.path.split('/').pop() ?? '';
		let filenames: string[] = [];
		try {
			filenames = readdirSync(col.path)
				.filter((f) => {
					try {
						return (
							statSync(join(col.path, f)).isFile() &&
							!f.startsWith('.') &&
							(!isMarkdown || f.endsWith('.md'))
						);
					} catch {
						return false;
					}
				})
				.sort();
		} catch {
			// directory missing — return empty
		}
		return filenames.map((f) => {
			const fullPath = join(col.path, f);
			const slug = f.replace(/\.[^.]+$/, '');
			const title = isMarkdown ? getTitle(fullPath) : f;
			const url = col.urlTemplate ? resolveUrl(col.urlTemplate, slug, dirSlug, fullPath) : '';
			return { title, filePath: `${col.path}/${f}`, url };
		});
	}

	// Process in config order, merging grouped collections into TreeGroups
	type OrderedEntry =
		| { kind: 'flat'; col: StudioCollection }
		| { kind: 'tree'; groupName: string; cols: StudioCollection[] };

	const ordered: OrderedEntry[] = [];
	const groupMap = new Map<string, StudioCollection[]>();

	for (const col of collections) {
		if (col.group) {
			if (!groupMap.has(col.group)) {
				const cols: StudioCollection[] = [];
				groupMap.set(col.group, cols);
				ordered.push({ kind: 'tree', groupName: col.group, cols });
			}
			groupMap.get(col.group)!.push(col);
		} else {
			ordered.push({ kind: 'flat', col });
		}
	}

	return ordered.map((entry): ContentGroup => {
		if (entry.kind === 'flat') {
			return { kind: 'flat', name: entry.col.name, files: filesForCollection(entry.col) };
		}
		return {
			kind: 'tree',
			name: entry.groupName,
			groups: entry.cols.map((col) => ({
				name: col.name,
				slug: col.path.split('/').pop() ?? col.name.toLowerCase(),
				files: filesForCollection(col)
			}))
		};
	});
}

// ── Load ──────────────────────────────────────────────────────────────────────

export const load: PageServerLoad = async ({ locals, platform }) => {
	if (!locals.studioUser) {
		throw redirect(302, '/studio/login');
	}

	const allowedUsers = (platform?.env?.STUDIO_ALLOWED_USERS ?? '')
		.split(',')
		.map((h: string) => h.trim())
		.filter(Boolean);

	const contentGroups = await buildContentTree(studioConfig.collections);

	// ── Submissions + feedback ────────────────────────────────────────────────
	type FeedbackMap = Record<string, { status?: string; notes?: string }>;
	const cfpFb = cfpFeedback as FeedbackMap;
	const cfeFb = cfeFeedback as FeedbackMap;

	const cfpSubmissions: SubmissionRow[] = parseCFPProposals(cfpRaw).map((p) => ({
		id: p.id,
		slug: p.slug,
		title: p.title,
		submitter: p.firstName,
		format: p.proposalType,
		status: cfpFb[p.id]?.status ?? 'Under Review',
		notes: cfpFb[p.id]?.notes ?? '',
		url: `/2026/submissions/${p.slug}`
	}));

	const cfeSubmissions: SubmissionRow[] = parseCFEProposals(cfeRaw).map((p) => ({
		id: p.id,
		slug: p.slug,
		title: p.title,
		submitter: p.firstName,
		format: p.submissionType ?? 'Exhibition',
		status: cfeFb[p.id]?.status ?? 'Under Review',
		notes: cfeFb[p.id]?.notes ?? '',
		url: `/2026/submissions/${p.slug}`
	}));

	return {
		user: locals.studioUser,
		config: studioConfig,
		allowedUsers,
		contentGroups,
		cfpSubmissions,
		cfeSubmissions,
		pageMeta: {
			title: 'Studio',
			description: 'VizChitra content editor'
		}
	};
};
