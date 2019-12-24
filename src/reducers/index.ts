import { combineReducers } from 'redux';

import { configReducer } from './config';
import { entriesReducer } from './entries';
import { storiesReducer } from './stories';
import { uiReducer } from './ui';
import { wordsReducer } from './words';

const reducers = {
	config: configReducer,
	entries: entriesReducer,
	stories: storiesReducer,
	ui: uiReducer,
	words: wordsReducer
};

export const reducer = combineReducers(reducers);

export type ReduxState = ReturnType<typeof reducer>;
