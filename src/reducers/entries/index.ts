import { INIT_ENTRIES, SET_ENTRY, SET_ENTRIES, CLEAR_ENTRIES } from './actions';
import { EntriesAction, InitEntriesAction, SetEntryAction, SetEntriesAction, ClearEntriesAction } from './types';

export type EntryState = string[][];

export function entriesReducer(state: EntryState = [], action: EntriesAction): EntryState {
	switch (action.type) {
		case INIT_ENTRIES: {
			const initEntriesAction = action as InitEntriesAction;
			return initEntriesAction.payload.map(story => (new Array(story.fields.length)).fill('') );
		}
		case SET_ENTRY: {
			const setEntryAction = action as SetEntryAction;
			const { storyIndex, entryIndex, value } = setEntryAction.payload;
			const newState = state.map(storyEntries => [...storyEntries]);
			newState[storyIndex][entryIndex] = value;
			return newState;
		}
		case SET_ENTRIES: {
			const setEntriesAction = action as SetEntriesAction;
			const { storyIndex, values } = setEntriesAction.payload;
			return state.map((entries, index) => index === storyIndex ? [...values] : [...entries]);
		}
		case CLEAR_ENTRIES: {
			const clearEntriesAction = action as ClearEntriesAction;
			const storyIndex: number = clearEntriesAction.payload;
			return state.map((entries, index) => index === storyIndex ? (new Array(entries.length)).fill('') : [...entries]);
		}
		default:
			return state;
	}
}
