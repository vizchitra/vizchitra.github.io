import { writable } from 'svelte/store';

export type PanelState = 'hidden' | 'collapsed' | 'open';

/** Tracks the studio panel's visibility so the root layout can reserve space for it. */
export const panelStore = writable<PanelState>('hidden');
