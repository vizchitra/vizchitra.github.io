import type { RequestHandler } from './$types';
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

export const prerender = false;

const OWNER = 'vizchitra';
const REPO = 'vizchitra.github.io';
const BASE_BRANCH = 'master';

const ALLOWED_PREFIXES = ['content/'];

/** Validate file path is within allowed content directories */
function isAllowedPath(filePath: string): boolean {
	const normalised = filePath.replace(/\\/g, '/').replace(/^\/+/, '');
	// Prevent path traversal
	if (normalised.includes('..')) return false;
	return ALLOWED_PREFIXES.some((prefix) => normalised.startsWith(prefix));
}

export const POST: RequestHandler = async ({ request, locals, platform }) => {
	// Auth guard
	if (!locals.studioUser) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let body: { filePath: string; body: string; frontmatter: Record<string, unknown> };
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { filePath, body: markdownBody, frontmatter } = body;

	if (!filePath || typeof filePath !== 'string' || !isAllowedPath(filePath)) {
		return new Response(JSON.stringify({ error: 'Invalid or disallowed file path' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// GitHub token from environment — must be a Personal Access Token or Fine-Grained token
	// with "contents: write" and "pull_requests: write" permissions.
	const githubToken = (platform?.env as Record<string, string> | undefined)?.STUDIO_GITHUB_TOKEN;
	if (!githubToken) {
		return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const octokit = new Octokit({ auth: githubToken });
	const handle = locals.studioUser.handle;
	const serialised = matter.stringify(markdownBody, frontmatter);
	const content = btoa(unescape(encodeURIComponent(serialised)));

	// Use a consistent path key (strip leading slash)
	const repoPath = filePath.replace(/^\/+/, '');

	try {
		// Get the current file SHA (needed to update)
		const { data: fileData } = await octokit.repos.getContent({
			owner: OWNER,
			repo: REPO,
			path: repoPath,
			ref: BASE_BRANCH
		});
		const sha = Array.isArray(fileData) ? undefined : (fileData as { sha: string }).sha;

		// Create a branch for this edit: studio/<handle>/<timestamp>
		const branchName = `studio/${handle}/${Date.now()}`;
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

		// Commit the file to the new branch
		const slugPart = repoPath.split('/').pop() ?? repoPath;
		await octokit.repos.createOrUpdateFileContents({
			owner: OWNER,
			repo: REPO,
			path: repoPath,
			message: `content: edit ${slugPart} via Studio (@${handle})`,
			content,
			sha,
			branch: branchName
		});

		// Open a PR
		const { data: pr } = await octokit.pulls.create({
			owner: OWNER,
			repo: REPO,
			title: `content: edit ${slugPart} via Studio`,
			body: `Edited by @${handle} via VizChitra Studio.\n\nFile: \`${repoPath}\``,
			head: branchName,
			base: BASE_BRANCH
		});

		return new Response(JSON.stringify({ ok: true, prUrl: pr.html_url }), {
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
