/*
 *	These types have been split out to avoid elision by TypeScript. If these
 *	were included in a module that contains concrete types, TypeScript would
 *	strip them before webpack can reconcile them. This results in webpack
 *	complaining that they weren't exported even when they are.
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