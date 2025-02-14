import type * as Party from 'partykit/server';

type Cursor = {
	id: string;
	uri: string;
	country: string | null;
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
	constructor(public party: Party.Party) {}
	options: Party.ServerOptions = {
		hibernate: true
	};

	onConnect(
		websocket: Party.Connection,
		{ request }: Party.ConnectionContext
	): void | Promise<void> {
		const country = request.cf?.country ?? null;

		websocket.serializeAttachment({
			...websocket.deserializeAttachment(),
			country: country
		});

		let cursors: { [id: string]: Cursor } = {};
		for (const ws of this.party.getConnections()) {
			const id = ws.id;
			let cursor = (ws as ConnectionWithCursor).cursor ?? ws.deserializeAttachment();
			if (
				id !== websocket.id &&
				cursor !== null &&
				cursor.x !== undefined &&
				cursor.y !== undefined
			) {
				cursors[id] = cursor;
			}
		}

		const msg: SyncMessage = {
			type: 'sync',
			cursors: cursors
		};

		websocket.send(JSON.stringify(msg));
	}

	onMessage(message: string, websocket: Party.Connection): void | Promise<void> {
		const position = JSON.parse(message as string);
		const prevCursor = this.getCursor(websocket);
		const cursor: Cursor = {
			id: websocket.id,
			uri: websocket.id,
			x: position.x,
			y: position.y,
			country: prevCursor?.country,
			lastUpdate: Date.now()
		};

		this.setCursor(websocket, cursor);

		const msg =
			position.x !== undefined && position.y !== undefined
				? {
						type: 'update',
						...cursor,
						id: websocket.id
					}
				: {
						type: 'remove',
						id: websocket.id
					};

		this.party.broadcast(JSON.stringify(msg), [websocket.id]);
	}

	getCursor(connection: ConnectionWithCursor) {
		if (!connection.cursor) {
			connection.cursor = connection.deserializeAttachment();
		}
		return connection.cursor;
	}

	setCursor(connection: ConnectionWithCursor, cursor: Cursor) {
		let prevCursor = connection.cursor;
		connection.cursor = cursor;

		if (
			!prevCursor ||
			!prevCursor.lastUpdate ||
			(cursor.lastUpdate && cursor.lastUpdate - prevCursor.lastUpdate > 100)
		) {
			connection.serializeAttachment({
				...cursor
			});
		}
	}

	onClose(websocket: Party.Connection) {
		const msg: RemoveMessage = {
			type: 'remove',
			id: websocket.id
		};

		this.party.broadcast(JSON.stringify(msg), []);
	}
}

CursorServer satisfies Party.Worker;
