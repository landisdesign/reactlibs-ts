/**
 *	These are split out from actions.ts because apparently combining TS-only
 *	values with JS values causes the TS-only elements to be ellided during
 *	transpilation and webpack complains that they are missing.
 */

import { BaseAction } from '../types';

export interface InitEntriesAction extends BaseAction {
	payload: any[];
}

export interface SetEntryAction extends BaseAction {
	payload: {
		storyIndex: number,
		entryIndex: number,
		value: string
	};
}

export interface SetEntriesAction extends BaseAction {
	payload: {
		storyIndex: number,
		values: string[]
	};
}

export interface ClearEntriesAction extends BaseAction {
	payload: number;
}

export type EntriesAction = InitEntriesAction | SetEntryAction | SetEntriesAction | ClearEntriesAction;