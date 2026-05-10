import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = ({ locals }) => {
	const user = locals.studioUser;
	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ handle: user.handle }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
