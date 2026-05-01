import type { RequestHandler } from './$types';
import { dev } from '$app/environment';
import { writeFileSync } from 'node:fs';
import { resolve, normalize } from 'node:path';
import matter from 'gray-matter';

export const prerender = false;

const ALLOWED_ROOT = resolve('content');

/** Ensure the resolved file path stays within the content/ directory */
function safePath(filePath: string): string {
	const resolved = resolve(normalize(filePath));
	if (!resolved.startsWith(ALLOWED_ROOT + '/')) {
		throw new Error('Path traversal detected');
	}
	return resolved;
}

export const POST: RequestHandler = async ({ request, locals }) => {
	// Auth guard
	if (!locals.studioUser) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Dev-only endpoint
	if (!dev) {
		return new Response(JSON.stringify({ error: 'Use /api/studio/pr in production' }), {
			status: 405,
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

	if (!filePath || typeof filePath !== 'string') {
		return new Response(JSON.stringify({ error: 'filePath is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let absolute: string;
	try {
		absolute = safePath(filePath);
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid file path' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const serialised = matter.stringify(markdownBody, frontmatter);

	try {
		writeFileSync(absolute, serialised, 'utf-8');
	} catch (e) {
		return new Response(JSON.stringify({ error: 'Write failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
