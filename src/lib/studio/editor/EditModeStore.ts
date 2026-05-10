import { writable } from 'svelte/store';

export interface EditModeState {
	isEditing: boolean;
	isDirty: boolean;
	filePath: string | null;
}

const initial: EditModeState = {
	isEditing: false,
	isDirty: false,
	filePath: null
};

const { subscribe, update, set } = writable<EditModeState>(initial);

export const editMode = {
	subscribe,
	startEdit(filePath: string) {
		set({ isEditing: true, isDirty: false, filePath });
	},
	stopEdit() {
		set(initial);
	},
	markDirty() {
		update((s) => ({ ...s, isDirty: true }));
	}
};
