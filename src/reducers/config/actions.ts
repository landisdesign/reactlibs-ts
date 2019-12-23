import { Dispatch } from 'redux';

import { sleep } from '../../common';

import { BaseAction, ReactlibThunkAction } from '../types';
import { initEntries } from '../entries/actions';

import { ConfigStateJSON, StoryConfigData, WordConfigData } from './types';

export const INIT_CONFIG = 'INIT_CONFIG';
export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_WORD_LIST = 'LOAD_WORD_LIST';
export const RECONCILE_CONFIG = 'RECONCILE_CONFIG';
export const START_APPLICATION = 'START_APPLICATION';

export interface InitConfigAction extends BaseAction {
	payload: ConfigStateJSON;
}

export interface LoadStoriesAction extends BaseAction {
	payload: StoryConfigData[];
}

export interface LoadWordListAction extends BaseAction {
	payload: {
		wordList: WordConfigData,
		index: number
	};
}

export type ReconcileConfigAction = BaseAction;

export type StartApplicationAction = BaseAction;

export type ConfigAction = InitConfigAction | LoadStoriesAction | LoadWordListAction | ReconcileConfigAction | StartApplicationAction;

const initConfig = (config: ConfigStateJSON): InitConfigAction => ({
	type: INIT_CONFIG,
	payload: config
});

const loadStories = (stories: StoryConfigData[]): LoadStoriesAction => ({
	type: LOAD_STORIES,
	payload: stories
});

const loadWordList = (wordList: WordConfigData, index: number): LoadWordListAction => ({
	type: LOAD_WORD_LIST,
	payload: {
		wordList,
		index
	}
});

const reconcileConfig = (): ReconcileConfigAction => ({
	type: RECONCILE_CONFIG
});

const startApplication = (): StartApplicationAction => ({
	type: START_APPLICATION
});

class ResponseError extends Error {
	response: Response;

	constructor(message: string, response: Response) {
		super(message);
		this.response = response;
	}
}

/*
 *	Asynchronous actions. These are the only actions available outside the module.
 */

/**
 *	Load the config file, then load the word and story files identified by the
 *	config. fetchConfig dispatches the above synchronous actions to update the
 *	progress UI and inform the UI when everything has loaded. The start and
 *	minDelay fields dictate how long the startup process should take for the
 *	splash screen to be presented.
 */
export function fetchConfig( {url: configUrl, minDelay}: {url: string, minDelay: number} ): ReactlibThunkAction {

	const requestOptions: RequestInit = {
		headers: new Headers({
			'Accept': 'application/json, text/plain'
		}),
		mode: 'same-origin'
	};

	function checkStatus(response: Response): Response {
		if (response.ok) {
			return response;
		}
		else {
			throw new ResponseError(`Response returned ${response.status}:`, response);
		}
	}

	function fetchWords(wordDataUrl: string, index: number, dispatch: Dispatch): Promise<void> {
		return fetch(wordDataUrl, requestOptions).then(async (response: Response) => {
			checkStatus(response);
			const wordData: WordConfigData = await response.json();
			dispatch(loadWordList(wordData, index));
		});
	}

	function fetchStories(storyListUrl: string, dispatch: Dispatch): Promise<void> {
		return fetch(storyListUrl, requestOptions).then(async (response: Response) => {
			checkStatus(response);
			const storyData: StoryConfigData[] = await response.json();
			dispatch(loadStories(storyData));
			dispatch(initEntries(storyData));
		});
	}

	return async function(dispatch: Dispatch): Promise<void> {
		try {
			const activationTime: number = minDelay + Date.now();
			const response: Response = await fetch(configUrl, requestOptions);
			checkStatus(response);
			const config: ConfigStateJSON = await response.json();
			dispatch(initConfig(config));

			const fetches: Promise<void>[] = config.wordSources.map((url: string, index: number): Promise<void> => fetchWords(url, index, dispatch));
			fetches.push(fetchStories(config.storySource, dispatch));

			Promise.all(fetches).then(async (): Promise<void> => {
				const now: number = Date.now();
				if (now < activationTime) {
					await sleep(activationTime - now);
				}
				dispatch(reconcileConfig());
			});
		}
		catch (e) {
			console.error(e);
			if (e.response) {
				console.error(e.response.url);
				e.response.text().then((text: string):void => console.error(text));
			}
		}
	};
}

/**
 *	Signal that the UI has completed the landing page presentation.
 */
export function acknowledgeConfigCompletion(delay: number = 0): ReactlibThunkAction {
	return async function(dispatch: Dispatch): Promise<void> {
		await sleep(delay);
		dispatch(startApplication());
	}
}
