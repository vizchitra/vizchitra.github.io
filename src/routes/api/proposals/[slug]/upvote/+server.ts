import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isValidDeviceId } from '$lib/utils/device-id';

export const prerender = false;

/**
 * POST /api/proposals/[slug]/upvote
 * Add an upvote to a proposal
 */
export const POST: RequestHandler = async ({ request, params, platform }) => {
	const { slug } = params;

	// Validate platform is available (Cloudflare Workers)
	if (!platform?.env?.PROPOSAL_VOTES) {
		console.error('KV namespace not available');
		return json(
			{ success: false, error: 'Service temporarily unavailable' },
			{ status: 503 }
		);
	}

	// Parse request body
	let deviceId: string;
	try {
		const body = await request.json();
		deviceId = body.deviceId;
	} catch (err) {
		return json(
			{ success: false, error: 'Invalid request body' },
			{ status: 400 }
		);
	}

	// Validate device ID
	if (!deviceId || !isValidDeviceId(deviceId)) {
		return json(
			{ success: false, error: 'Invalid device ID' },
			{ status: 400 }
		);
	}

	const kv = platform.env.PROPOSAL_VOTES;

	try {
		const voterKey = `voter:${deviceId}:${slug}`;
		const countKey = `proposal:${slug}:count`;

		// Check if user has already voted
		const existingVote = await kv.get(voterKey);
		if (existingVote) {
			// User already voted - silently return current state
			const countValue = await kv.get(countKey);
			const votes = countValue ? parseInt(countValue, 10) : 0;

			return json({
				success: true,
				votes,
				hasVoted: true
			});
		}

		// Record the vote
		const timestamp = Date.now().toString();
		await kv.put(voterKey, timestamp);

		// Increment vote count
		const currentCountValue = await kv.get(countKey);
		const currentCount = currentCountValue ? parseInt(currentCountValue, 10) : 0;
		const newCount = currentCount + 1;
		await kv.put(countKey, newCount.toString());

		return json({
			success: true,
			votes: newCount,
			hasVoted: true
		});
	} catch (err) {
		console.error('Error adding upvote:', err);
		return json(
			{ success: false, error: 'Failed to add upvote' },
			{ status: 500 }
		);
	}
};

/**
 * DELETE /api/proposals/[slug]/upvote
 * Remove an upvote from a proposal
 */
export const DELETE: RequestHandler = async ({ request, params, platform }) => {
	const { slug } = params;

	// Validate platform is available (Cloudflare Workers)
	if (!platform?.env?.PROPOSAL_VOTES) {
		console.error('KV namespace not available');
		return json(
			{ success: false, error: 'Service temporarily unavailable' },
			{ status: 503 }
		);
	}

	// Parse request body
	let deviceId: string;
	try {
		const body = await request.json();
		deviceId = body.deviceId;
	} catch (err) {
		return json(
			{ success: false, error: 'Invalid request body' },
			{ status: 400 }
		);
	}

	// Validate device ID
	if (!deviceId || !isValidDeviceId(deviceId)) {
		return json(
			{ success: false, error: 'Invalid device ID' },
			{ status: 400 }
		);
	}

	const kv = platform.env.PROPOSAL_VOTES;

	try {
		const voterKey = `voter:${deviceId}:${slug}`;
		const countKey = `proposal:${slug}:count`;

		// Check if user has voted
		const existingVote = await kv.get(voterKey);
		if (!existingVote) {
			// User hasn't voted - silently return current state
			const countValue = await kv.get(countKey);
			const votes = countValue ? parseInt(countValue, 10) : 0;

			return json({
				success: true,
				votes,
				hasVoted: false
			});
		}

		// Remove the vote
		await kv.delete(voterKey);

		// Decrement vote count
		const currentCountValue = await kv.get(countKey);
		const currentCount = currentCountValue ? parseInt(currentCountValue, 10) : 0;
		const newCount = Math.max(0, currentCount - 1); // Don't go below 0
		await kv.put(countKey, newCount.toString());

		return json({
			success: true,
			votes: newCount,
			hasVoted: false
		});
	} catch (err) {
		console.error('Error removing upvote:', err);
		return json(
			{ success: false, error: 'Failed to remove upvote' },
			{ status: 500 }
		);
	}
};
