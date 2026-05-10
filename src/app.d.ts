/// <reference types="@cloudflare/workers-types" />

declare global {
	namespace App {
		interface Locals {
			studioUser: { handle: string } | null;
		}
		interface Platform {
			env: {
				PROPOSAL_VOTES: KVNamespace;
				STUDIO_SESSIONS: KVNamespace;
				STUDIO_GITHUB_CLIENT_ID: string;
				STUDIO_GITHUB_CLIENT_SECRET: string;
				STUDIO_ALLOWED_USERS: string;
				STUDIO_GITHUB_TOKEN?: string;
				STUDIO_BASE_URL?: string;
				STUDIO_SESSION_SECRET: string;
			};
			context: ExecutionContext;
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
