import { BaseAction } from '../types';

import { WordConfigData } from '../config/types';

export const WORDS_LOAD = 'WORDS_LOAD';

export interface LoadWordsAction extends BaseAction {
	payload: WordConfigData[];
}

export type WordsAction = LoadWordsAction; // maintaining union pattern for future actions in this reducer

export const loadWords = (wordList: WordConfigData[]): LoadWordsAction => ({
	type: WORDS_LOAD,
	payload: wordList
});
