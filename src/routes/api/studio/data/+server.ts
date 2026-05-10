/**
 * /api/studio/data  — stage an update to a JSON data file.
 *
 * For array files (e.g. sessions.json):
 *   POST { filePath, key: slug, data: { ...fields } }
 *   Finds the array item where item.slug === key and shallow-merges `data` into it.
 *
 * For object files (e.g. a settings map):
 *   POST { filePath, key: someKey, data: { ...fields } }
 *   Merges data into file[key].
 *
 * Allowed paths: content/ only (same restriction as /api/studio/stage).
 */
import type { RequestHandler } from './$types';
import { Octokit } from '@octokit/rest';

export const prerender = false;

const OWNER = 'vizchitra';
const REPO = 'vizchitra.github.io';
const BASE_BRANCH = 'master';
const ALLOWED_PREFIX = 'content/';

function isAllowed(filePath: string): boolean {
	const norm = filePath.replace(/\\/g, '/').replace(/^\/+/, '');
	return !norm.includes('..') && norm.startsWith(ALLOWED_PREFIX) && norm.endsWith('.json');
}

function stagingKey(handle: string): string {
	return `studio_staging:${handle}`;
}

interface StagingState {
	branch: string;
	files: string[];
}

export const POST: RequestHandler = async ({ request, locals, platform }) => {
	if (!locals.studioUser) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let body: { filePath: string; key: string; data: Record<string, unknown> };
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { filePath, key, data } = body;

	if (!filePath || !isAllowed(filePath) || !key || !data || typeof data !== 'object') {
		return new Response(JSON.stringify({ error: 'Invalid payload' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const githubToken = (platform?.env as Record<string, string> | undefined)?.STUDIO_GITHUB_TOKEN;
	if (!githubToken) {
		return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const kv = platform?.env?.STUDIO_SESSIONS;
	if (!kv) {
		return new Response(JSON.stringify({ error: 'KV not available' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const handle = locals.studioUser.handle;
	const octokit = new Octokit({ auth: githubToken });
	const repoPath = filePath.replace(/^\/+/, '');

	try {
		// Load or create staging branch
		const existing = (await kv.get(stagingKey(handle), 'json')) as StagingState | null;

		let branchName: string;
		if (existing?.branch) {
			branchName = existing.branch;
		} else {
			const date = new Date().toISOString().slice(0, 10);
			branchName = `studio/${handle}/${date}`;
			const { data: ref } = await octokit.git.getRef({
				owner: OWNER,
				repo: REPO,
				ref: `heads/${BASE_BRANCH}`
			});
			await octokit.git.createRef({
				owner: OWNER,
				repo: REPO,
				ref: `refs/heads/${branchName}`,
				sha: ref.object.sha
			});
		}

		// Fetch current file from staging branch (fall back to master)
		let currentData: unknown = null;
		let sha: string | undefined;
		for (const ref of [branchName, BASE_BRANCH]) {
			try {
				const { data: fileData } = await octokit.repos.getContent({
					owner: OWNER,
					repo: REPO,
					path: repoPath,
					ref
				});
				if (!Array.isArray(fileData) && fileData.type === 'file') {
					const decoded = atob(fileData.content.replace(/\n/g, ''));
					currentData = JSON.parse(decoded);
					if (ref === branchName) sha = fileData.sha;
				}
				break;
			} catch {
				// not found on this ref, try next
			}
		}

		// Apply the update
		let updated: unknown;
		if (Array.isArray(currentData)) {
			// Array file: find item by slug and shallow-merge
			updated = currentData.map((item: Record<string, unknown>) =>
				item.slug === key ? { ...item, ...data } : item
			);
		} else if (currentData && typeof currentData === 'object') {
			// Object file: merge into key
			updated = {
				...(currentData as Record<string, unknown>),
				[key]: {
					...((currentData as Record<string, unknown>)[key] as Record<string, unknown>),
					...data,
					updatedAt: new Date().toISOString(),
					updatedBy: handle
				}
			};
		} else {
			return new Response(JSON.stringify({ error: 'Cannot parse existing file' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Write updated JSON to staging branch
		const serialised = JSON.stringify(updated, null, 2) + '\n';
		const content = btoa(unescape(encodeURIComponent(serialised)));

		await octokit.repos.createOrUpdateFileContents({
			owner: OWNER,
			repo: REPO,
			path: repoPath,
			message: `content: update ${key} in ${repoPath} via Studio (@${handle})`,
			content,
			sha,
			branch: branchName
		});

		// Update KV staging state
		const stagedFiles = existing?.files ?? [];
		if (!stagedFiles.includes(repoPath)) stagedFiles.push(repoPath);
		const newState: StagingState = { branch: branchName, files: stagedFiles };
		await kv.put(stagingKey(handle), JSON.stringify(newState), {
			expirationTtl: 7 * 24 * 60 * 60
		});

		return new Response(JSON.stringify({ ok: true, stagedCount: stagedFiles.length }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (e) {
		const message = e instanceof Error ? e.message : 'GitHub API error';
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
