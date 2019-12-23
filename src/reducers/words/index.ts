import { WORDS_LOAD, WordsAction, LoadWordsAction } from './actions';
import { WordState } from './state';

export function wordsReducer(state: WordState = new WordState(), action: WordsAction): WordState {
	switch (action.type) {
		case WORDS_LOAD: {
			const loadWordsAction = action as LoadWordsAction;
			const wordList = loadWordsAction.payload;
			return new WordState(wordList);
		}
		default:
			return state;
	}
}
