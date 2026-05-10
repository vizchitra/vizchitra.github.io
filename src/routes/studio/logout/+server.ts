import type { RequestHandler } from './$types';
import { clearSessionCookie } from '$lib/studio/session';

export const POST: RequestHandler = async () => {
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/studio/login',
			'Set-Cookie': clearSessionCookie()
		}
	});
};
