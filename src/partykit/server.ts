import type * as Party from 'partykit/server';

type LocationInfo = {
	country: string | null;
	region: string | null;
	city: string | null;
};

type Cursor = {
	id: string;
	location: LocationInfo;
	x?: number;
	y?: number;
	lastActive?: number;
};

type ConnectionWithCursor = Party.Connection & { cursor?: Cursor };

export default class CursorServer implements Party.Server {
	constructor(public party: Party.Party) {}

	onConnect(websocket: Party.Connection, { request }: Party.ConnectionContext) {
		const location: LocationInfo = {
			country: request.cf?.country ?? null,
			region: request.cf?.region ?? null,
			city: request.cf?.city ?? null
		};

		websocket.serializeAttachment({ location });

		// Send current cursors to new connection
		const cursors: Record<string, Cursor> = {};
		for (const conn of this.party.getConnections()) {
			const cursor = (conn as ConnectionWithCursor).cursor;
			if (conn.id !== websocket.id && cursor?.x !== undefined) {
				cursors[conn.id] = cursor;
			}
		}

		websocket.send(JSON.stringify({ type: 'sync', cursors }));
	}

	onMessage(message: string, websocket: Party.Connection) {
		const position = JSON.parse(message);
		const cursor: Cursor = {
			id: websocket.id,
			location: (websocket as ConnectionWithCursor).cursor?.location ?? {
				country: null,
				region: null,
				city: null
			},
			x: position.x,
			y: position.y,
			lastActive: Date.now()
		};

		(websocket as ConnectionWithCursor).cursor = cursor;

		this.party.broadcast(JSON.stringify({ type: 'update', ...cursor }), [websocket.id]);
	}

	onClose(websocket: Party.Connection) {
		this.party.broadcast(JSON.stringify({ type: 'remove', id: websocket.id }), []);
	}
}

CursorServer satisfies Party.Worker;
