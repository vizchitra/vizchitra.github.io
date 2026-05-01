import type { RequestHandler } from './$types';
import { Octokit } from '@octokit/rest';

export const prerender = false;

const OWNER = 'vizchitra';
const REPO = 'vizchitra.github.io';
const BASE_BRANCH = 'master';

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

	let body: { message: string };
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { message } = body;
	if (!message?.trim()) {
		return new Response(JSON.stringify({ error: 'PR description is required' }), {
			status: 400,
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

	const githubToken = (platform?.env as Record<string, string> | undefined)?.STUDIO_GITHUB_TOKEN;
	if (!githubToken) {
		return new Response(JSON.stringify({ error: 'GitHub token not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const handle = locals.studioUser.handle;
	const state = (await kv.get(`studio_staging:${handle}`, 'json')) as StagingState | null;

	if (!state?.branch || !state?.files?.length) {
		return new Response(JSON.stringify({ error: 'No staged changes to publish' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const octokit = new Octokit({ auth: githubToken });

		const fileList = state.files.map((f) => `- \`${f}\``).join('\n');
		const { data: pr } = await octokit.pulls.create({
			owner: OWNER,
			repo: REPO,
			title: `content: ${message.slice(0, 72)}`,
			body: `${message}\n\n**Edited by @${handle} via VizChitra Studio**\n\n### Changed files\n${fileList}`,
			head: state.branch,
			base: BASE_BRANCH
		});

		// Clear staging state from KV
		await kv.delete(`studio_staging:${handle}`);

		return new Response(JSON.stringify({ ok: true, prUrl: pr.html_url }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (e) {
		const message_err = e instanceof Error ? e.message : 'GitHub API error';
		return new Response(JSON.stringify({ error: message_err }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
