import { BaseAction } from '../types';

import { StoryConfigData } from '../config/types';

export const STORIES_LOAD = 'STORIES_LOAD';

export interface LoadStoriesAction extends BaseAction {
	payload: StoryConfigData[]
}

export type StoriesAction = LoadStoriesAction; // maintaining pattern for future actions in this reducer

export const loadStories = (stories: StoryConfigData[]): LoadStoriesAction => ({
	type: STORIES_LOAD,
	payload: stories
});
