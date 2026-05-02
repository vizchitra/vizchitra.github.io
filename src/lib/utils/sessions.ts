import { parseCSV, generateSlug } from '$lib/utils/csv-parser';
import sessionsRaw from '../../../content/2026/data/2026-sessions.csv?raw';

/** Color mapping for session types, used across all session components */
export const sessionColorMap: Record<string, 'blue' | 'teal' | 'pink' | 'orange'> = {
	Talks: 'blue',
	Dialogues: 'teal',
	Workshop: 'pink',
	Exhibition: 'orange'
};

export interface SessionData {
	title: string;
	speakerName: string;
	designation: string;
	organisation: string;
	sessionType: string;
	subtitle: string;
	date: string;
	time: string;
	venue: string;
	slug: string;
	speakerImage: string;
	description: string;
	shortDescription: string;
	tbd: boolean;
}

function parseSessionRows(): SessionData[] {
	const rows = parseCSV(sessionsRaw);
	const sessions: SessionData[] = [];

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		const sessionType = row['session_type']?.trim();
		if (!sessionType) continue;

		const title = row['title']?.trim() || '';
		const speakerName = row['speaker_name']?.trim() || '';
		const display = row['display']?.trim().toLowerCase() === 'true';

		// TBD if no title+speaker, or if display is false
		const tbd = (!title && !speakerName) || !display;

		const slug = tbd ? '' : generateSlug(title, String(i));

		sessions.push({
			title,
			speakerName,
			designation: row['designation']?.trim() || '',
			organisation: row['organisation']?.trim() || '',
			sessionType,
			subtitle: row['subtitle']?.trim() || '',
			date: row['date']?.trim() || '',
			time: row['time']?.trim() || '',
			venue: row['venue']?.trim() || '',
			slug,
			speakerImage: row['speaker_image']?.trim() || '',
			description: row['description']?.trim() || '',
			shortDescription: row['short_description']?.trim() || '',
			tbd
		});
	}

	return sessions;
}

/** Get all sessions (confirmed + TBD placeholders) and available formats */
export function resolveAllSessions(): { sessions: SessionData[]; formats: string[] } {
	const sessions = parseSessionRows();
	const formats = [...new Set(sessions.map((s) => s.sessionType))];
	return { sessions, formats };
}

/** Get only confirmed sessions (no TBD) */
export function resolveConfirmedSessions(): SessionData[] {
	return parseSessionRows().filter((s) => !s.tbd);
}
