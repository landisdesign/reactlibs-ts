import { ConfigState } from './state';
import {
	INIT_CONFIG, LOAD_STORIES, LOAD_WORD_LIST, RECONCILE_CONFIG, START_APPLICATION,
	InitConfigAction, LoadStoriesAction, LoadWordListAction, ConfigAction
} from './actions';


function configReducer(state: ConfigState = new ConfigState(), action: ConfigAction): ConfigState {

	switch (action.type) {
		case INIT_CONFIG: {
			const initConfigAction: InitConfigAction = action as InitConfigAction;
			return new ConfigState(initConfigAction.payload);
		}
		case LOAD_WORD_LIST: {
			const loadWordListAction: LoadWordListAction = action as LoadWordListAction;
			const { index, wordList } = loadWordListAction.payload;
			return state.loadWordData(wordList, index);
		}
		case LOAD_STORIES: {
			const loadStoriesAction: LoadStoriesAction = action as LoadStoriesAction;
			return state.loadStoryData(loadStoriesAction.payload);
		}
		case RECONCILE_CONFIG:
			return state.loadLoadingState(true, true);
		case START_APPLICATION:
			return state.loadLoadingState(false, true);
		default:
			return state;
	}

}

export { configReducer };