import { STORIES_LOAD, LoadStoriesAction, StoriesAction } from './actions';
import { StoryState } from './state';

export function storiesReducer(state: StoryState = new StoryState(), action: StoriesAction): StoryState {
	switch (action.type) {
		case STORIES_LOAD: {
			const loadStoriesAction = action as LoadStoriesAction;
			const storyConfig = loadStoriesAction.payload;
			return new StoryState(storyConfig);
		}
		default:
			return state;
	}
}
