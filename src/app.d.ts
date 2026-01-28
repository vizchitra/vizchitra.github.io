declare global {
	namespace App {
		interface Platform {
			env: {
				PROPOSAL_VOTES: KVNamespace;
			};
			context: ExecutionContext;
			caches: CacheStorage & { default: Cache };
		}
	}
}

export {};
