import { UIAction, SET_RANDOM, SET_SHOW_STORY, SET_SHOW_EMAIL, SET_STORY_INDEX, SET_WILL_CLEAR, SET_OUTPUT } from './actions';
import { UIState } from './state';

export function uiReducer(state: UIState = new UIState(), action: UIAction): UIState {
	switch (action.type) {
		case SET_RANDOM:
		case SET_SHOW_STORY:
		case SET_SHOW_EMAIL:
		case SET_STORY_INDEX:
		case SET_WILL_CLEAR:
		case SET_OUTPUT:
			{
				const data = {...action.payload};
				return new UIState(state, data);
			}
		default:
			return state;
	}
}