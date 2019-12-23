import { StoryConfigData } from '../config/types';

import { InitEntriesAction, SetEntryAction, SetEntriesAction, ClearEntriesAction } from './types';

export const INIT_ENTRIES ='INIT_ENTRIES';
export const SET_ENTRY = 'SET_ENTRY';
export const SET_ENTRIES = 'SET_ENTRIES';
export const CLEAR_ENTRIES = 'CLEAR_ENTRIES';

export const initEntries = (stories: StoryConfigData[]): InitEntriesAction => ({
	type: INIT_ENTRIES,
	payload: stories
});

export const setEntry = (storyIndex: number, entryIndex: number, value: string): SetEntryAction => ({
	type: SET_ENTRY,
	payload: {
		storyIndex,
		entryIndex,
		value
	}
});

export const setEntries = (storyIndex: number, values: string[]): SetEntriesAction => ({
	type: SET_ENTRIES,
	payload: {
		storyIndex,
		values
	}
});

export const clearEntries = (storyIndex: number): ClearEntriesAction => ({
	type: CLEAR_ENTRIES,
	payload: storyIndex
});
