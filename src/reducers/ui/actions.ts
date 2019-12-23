import { BaseAction } from '../types';
import { UIStateData } from './state';

export const SET_RANDOM = 'SET_RANDOM';
export const SET_STORY_INDEX = 'SET_STORY_INDEX';
export const SET_SHOW_EMAIL = 'SET_SHOW_EMAIL';
export const SET_SHOW_STORY = 'SET_SHOW_STORY';
export const SET_WILL_CLEAR = 'SET_WILL_CLEAR';
export const SET_OUTPUT = 'SET_OUTPUT';

export interface UIAction extends BaseAction {
	payload: UIStateData;
}

export const setRandom = (isRandom: boolean): UIAction => ({
	type: SET_RANDOM,
	payload: {
		isRandom
	}
});

export const setStoryIndex = (storyIndex: number): UIAction => ({
	type: SET_STORY_INDEX,
	payload: {
		storyIndex
	}
});

export const setShowStory = (showStory: boolean): UIAction => ({
	type: SET_SHOW_STORY,
	payload: {
		showStory
	}
});

export const setOutput = (output: string): UIAction => ({
	type: SET_OUTPUT,
	payload: {
		output
	}
});

export const setShowEMail = (showEMail: boolean, transitionEMail: boolean): UIAction => ({
	type: SET_SHOW_EMAIL,
	payload: {
		showEMail,
		transitionEMail
	}
});

export const setWillClear = (willClear: boolean): UIAction => ({
	type: SET_WILL_CLEAR,
	payload: {
		willClear
	}
});
