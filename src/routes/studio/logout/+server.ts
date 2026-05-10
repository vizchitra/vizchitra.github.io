import type { RequestHandler } from './$types';
import { deleteSession, clearSessionCookie } from '$lib/studio/session';

export const POST: RequestHandler = async ({ locals, platform }) => {
	const user = locals.studioUser;
	if (user) {
		const kv = platform?.env?.STUDIO_SESSIONS;
		if (kv) {
			await deleteSession(kv, user.sessionId);
		}
	}

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/studio/login',
			'Set-Cookie': clearSessionCookie()
		}
	});
};
