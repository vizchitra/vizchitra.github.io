import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { studioConfig } from '../../../studio.config';

interface FileEntry {
	title: string;
	filePath: string;
	url: string;
}

interface CollectionIndex {
	name: string;
	description: string;
	type: 'markdown' | 'json';
	files: FileEntry[];
}

function guideUrl(filePath: string, section?: string): string {
	// content/guides/talks/00-overview.md → /guides/talks/overview
	const match = filePath.match(/content\/guides\/([^/]+)\//);
	if (match && section) return `/guides/${match[1]}/${section}`;
	return '/';
}

function pageUrl(filePath: string): string {
	// content/pages/ethos.md → /ethos
	const match = filePath.match(/content\/pages\/(.+)\.md$/);
	if (match) return `/${match[1]}`;
	return '/';
}

async function buildCollections(): Promise<CollectionIndex[]> {
	const { readdirSync, readFileSync, statSync } = await import('node:fs');
	const { join, basename } = await import('node:path');
	const { default: matter } = await import('gray-matter');

	function getTitle(fullPath: string): string {
		try {
			const raw = readFileSync(fullPath, 'utf-8');
			return matter(raw).data?.title ?? basename(fullPath, '.md');
		} catch {
			return basename(fullPath, '.md');
		}
	}

	function getFrontmatter(fullPath: string): Record<string, unknown> {
		try {
			return matter(readFileSync(fullPath, 'utf-8')).data ?? {};
		} catch {
			return {};
		}
	}

	return studioConfig.collections.map((col) => {
		let files: FileEntry[] = [];
		try {
			const entries = readdirSync(col.path).sort();
			files = entries
				.filter((f) => {
					try {
						return statSync(join(col.path, f)).isFile();
					} catch {
						return false;
					}
				})
				.map((f) => {
					const fullPath = join(col.path, f);
					const relPath = `${col.path}/${f}`;
					const fm = getFrontmatter(fullPath);
					let url = '/';
					if (col.type === 'markdown') {
						if (col.path.startsWith('content/pages')) {
							url = pageUrl(relPath);
						} else if (col.path.startsWith('content/guides')) {
							url = guideUrl(relPath, fm.section as string | undefined);
						}
					}
					return {
						title: col.type === 'markdown' ? getTitle(fullPath) : f,
						filePath: relPath,
						url
					};
				});
		} catch {
			// directory may not exist yet
		}
		return { name: col.name, description: col.description, type: col.type, files };
	});
}

export const load: PageServerLoad = async ({ locals, platform }) => {
	if (!locals.studioUser) {
		throw redirect(302, '/studio/login');
	}

	const allowedUsers = (platform?.env?.STUDIO_ALLOWED_USERS ?? '')
		.split(',')
		.map((h: string) => h.trim())
		.filter(Boolean);

	const collections = await buildCollections();

	return {
		user: locals.studioUser,
		config: studioConfig,
		allowedUsers,
		collections,
		pageMeta: {
			title: 'Studio',
			description: 'VizChitra content editor'
		}
	};
};
