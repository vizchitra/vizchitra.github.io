import type { RequestHandler } from './$types';

export const prerender = false;

interface StagingState {
	branch: string;
	files: string[];
}

export const GET: RequestHandler = async ({ locals, platform }) => {
	if (!locals.studioUser) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const kv = platform?.env?.STUDIO_SESSIONS;
	if (!kv) {
		return new Response(JSON.stringify({ files: [], branch: null }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const handle = locals.studioUser.handle;
	const state = (await kv.get(`studio_staging:${handle}`, 'json')) as StagingState | null;

	return new Response(
		JSON.stringify({ files: state?.files ?? [], branch: state?.branch ?? null }),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};
