import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isValidDeviceId } from '$lib/utils/device-id';

/**
 * GET /api/proposals/[slug]/votes
 * Get current vote count and user's vote status
 * Query params:
 *   - deviceId (optional): User's device ID to check if they've voted
 */
export const GET: RequestHandler = async ({ params, platform, url }) => {
	const { slug } = params;
	const deviceId = url.searchParams.get('deviceId');

	// Validate platform is available (Cloudflare Workers)
	if (!platform?.env?.PROPOSAL_VOTES) {
		console.error('KV namespace not available');
		return json(
			{ error: 'Service temporarily unavailable' },
			{ status: 503 }
		);
	}

	const kv = platform.env.PROPOSAL_VOTES;

	try {
		// Get vote count
		const countKey = `proposal:${slug}:count`;
		const countValue = await kv.get(countKey);
		const votes = countValue ? parseInt(countValue, 10) : 0;

		// Check if user has voted (if deviceId provided)
		let hasVoted = false;
		if (deviceId && isValidDeviceId(deviceId)) {
			const voterKey = `voter:${deviceId}:${slug}`;
			const voterValue = await kv.get(voterKey);
			hasVoted = voterValue !== null;
		}

		return json({
			votes,
			hasVoted
		});
	} catch (err) {
		console.error('Error fetching votes:', err);
		return json(
			{ error: 'Failed to fetch vote data' },
			{ status: 500 }
		);
	}
};
