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

		const cursors: Record<string, Cursor> = {};
		for (const [id, existingCursor] of this.cursorCache.entries()) {
			if (id !== websocket.id && existingCursor?.x !== undefined) {
				cursors[id] = existingCursor;
			}
		}

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

		const updateMessage: UpdateMessage = {
			type: 'update',
			id: websocket.id,
			...cursor
		};

		this.party.broadcast(JSON.stringify(updateMessage), [websocket.id]);
	}

	onClose(websocket: Party.Connection) {
		this.cursorCache.delete(websocket.id);
		this.party.broadcast(JSON.stringify({ type: 'remove', id: websocket.id }), []);
	}
}

CursorServer satisfies Party.Worker;
