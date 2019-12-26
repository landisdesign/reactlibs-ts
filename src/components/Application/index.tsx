import { History } from 'history';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';

import { clearEntries } from '../../reducers/entries/actions';
import { setOutput, setRandom, setShowStory, setStoryIndex, setWillClear } from '../../reducers/ui/actions';

import ApplicationView from './view';

export const RANDOM_ID = 'surprise';

export type ReduxProps = ConnectedProps<typeof connector>;

export interface ReceivedProps {
	history: History;
	id?: string;
}

export interface MenuData {
	label: string;
	value: string;
}

const mapState = (state: ReduxState, ownProps: ReceivedProps) => {

	const options:MenuData[] = state.stories.map(({id, title}) => ({value: id, label: title}));
	const titles: string[] = options.map(({label}:{label:string}) => label);
	options.push( {value: RANDOM_ID, label: 'Pick a random story'} );

	const ready = state.config.loaded && titles.length > 0;
	const {storyIndex: savedIndex, willClear, showStory} = state.ui;

	const isRandom = ownProps.id === RANDOM_ID;
	let currentIndex = state.stories.indexOf(ownProps.id ?? '');
	if (currentIndex === -1 && isRandom && ready) {
		currentIndex = savedIndex !== -1 ? savedIndex : Math.floor(Math.random() * titles.length);
	}

	return {
		options,
		titles,
		ready,
		willClear,
		showStory,
		isRandom,
		currentIndex,
		savedIndex
	};
};

const mapDispatch = (dispatch: Dispatch) => ({
	setRandom: (isRandom: boolean) => dispatch(setRandom(isRandom)),
	setStoryIndex: (index: number) => dispatch(setStoryIndex(index)),
	resetScreen: (index: number) => {
		dispatch(setOutput(''));
		dispatch(setShowStory(false));
		dispatch(clearEntries(index));
		dispatch(setWillClear(false));
	},
	// View will never need to set clear independently. Prevent accidents by removing parameter for view.
	setWillClear: () => dispatch(setWillClear(true))
});

const connector = connect(mapState, mapDispatch);

export default connector(ApplicationView);