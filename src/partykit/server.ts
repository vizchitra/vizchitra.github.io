import type * as Party from 'partykit/server';

type LocationInfo = {
	country: string | null;
	region: string | null;
	city: string | null;
};

type Cursor = {
	id: string;
	uri: string;
	location: LocationInfo;
	x?: number;
	y?: number;
	lastUpdate?: number;
};

type UpdateMessage = {
	type: 'update';
	id: string;
} & Cursor;

type SyncMessage = {
	type: 'sync';
	cursors: { [id: string]: Cursor };
};

type RemoveMessage = {
	type: 'remove';
	id: string;
};

type ConnectionWithCursor = Party.Connection & { cursor?: Cursor };

export default class CursorServer implements Party.Server {
	private cursorCache = new Map<string, Cursor>();
	private readonly MAX_CURSORS_TO_SHOW = 100;

	constructor(public party: Party.Party) {}
	options: Party.ServerOptions = {
		hibernate: true
	};

	onConnect(
		websocket: Party.Connection,
		{ request }: Party.ConnectionContext
	): void | Promise<void> {
		const location: LocationInfo = {
			country: request.cf?.country || null,
			region: request.cf?.region || null,
			city: request.cf?.city || null
		};

		const cursor: Cursor = {
			id: websocket.id,
			uri: websocket.uri,
			location
		};

		this.cursorCache.set(websocket.id, cursor);

		// Get all cursors with positions, sorted by last update
		const activeCursors = Array.from(this.cursorCache.entries())
			.filter(
				([id, cursor]) =>
					id !== websocket.id && cursor?.x !== undefined && cursor?.lastUpdate !== undefined
			)
			.sort((a, b) => (b[1].lastUpdate || 0) - (a[1].lastUpdate || 0))
			.slice(0, this.MAX_CURSORS_TO_SHOW);

		// Convert to record object
		const cursors: Record<string, Cursor> = Object.fromEntries(activeCursors);

		websocket.send(JSON.stringify({ type: 'sync', cursors }));
	}

	onMessage(message: string, websocket: Party.Connection): void {
		const position = JSON.parse(message);
		const cursor = this.cursorCache.get(websocket.id);

		if (!cursor) return;

		cursor.x = position.x;
		cursor.y = position.y;
		cursor.lastUpdate = Date.now();
		this.cursorCache.set(websocket.id, cursor);

		// Get most recent cursors up to MAX_CURSORS_TO_SHOW
		const activeCursors = Array.from(this.cursorCache.entries())
			.filter(([id, cursor]) => cursor?.x !== undefined && cursor?.lastUpdate !== undefined)
			.sort((a, b) => (b[1].lastUpdate || 0) - (a[1].lastUpdate || 0))
			.slice(0, this.MAX_CURSORS_TO_SHOW);

		// Only broadcast to clients who should see this cursor
		const clientsToNotify = activeCursors.map(([id]) => id);

		const updateMessage: UpdateMessage = {
			type: 'update',
			id: websocket.id,
			...cursor
		};

		// Broadcast to all clients that should see this cursor, except the sender
		this.party.broadcast(JSON.stringify(updateMessage), [websocket.id, ...clientsToNotify]);
	}

	onClose(websocket: Party.Connection) {
		this.cursorCache.delete(websocket.id);
		this.party.broadcast(JSON.stringify({ type: 'remove', id: websocket.id }), []);
	}
}

CursorServer satisfies Party.Worker;
