import sessionsJson from '../../../content/2026/data/sessions.json';

/** Color mapping for session types, used across all session components */
export const sessionColorMap: Record<string, 'blue' | 'teal' | 'pink' | 'orange'> = {
	Talks: 'blue',
	Dialogues: 'teal',
	Workshop: 'pink',
	Exhibition: 'orange'
};

export interface SessionData {
	slug: string;
	sessionType: string;
	date: string;
	time: string;
	venue: string;
	title: string;
	subtitle: string;
	shortDescription: string;
	longDescription: string;
	speakerName: string;
	designation: string;
	organisation: string;
	speakerAbout: string;
	speakerImage: string;
	display: boolean;
	tbd: boolean;
}

/** Derive tbd from stored fields (not persisted in JSON to keep data clean) */
function withTbd(s: Omit<SessionData, 'tbd'>): SessionData {
	return { ...s, tbd: (!s.title && !s.speakerName) || !s.display };
}

/** Get all sessions (confirmed + TBD placeholders) and available formats */
export function resolveAllSessions(): { sessions: SessionData[]; formats: string[] } {
	const sessions = (sessionsJson as Omit<SessionData, 'tbd'>[]).map(withTbd);
	const formats = [...new Set(sessions.map((s) => s.sessionType))];
	return { sessions, formats };
}

/** Get only confirmed sessions (no TBD) */
export function resolveConfirmedSessions(): SessionData[] {
	return (sessionsJson as Omit<SessionData, 'tbd'>[]).map(withTbd).filter((s) => !s.tbd);
}
