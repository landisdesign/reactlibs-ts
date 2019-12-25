import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';

import { clearEntries } from '../../reducers/entries/actions';
import { setOutput, setRandom, setShowStory, setStoryIndex, setWillClear } from '../../reducers/ui/actions';

import ApplicationView from './view';

const RANDOM_ID = 'surprise';

export type ReduxProps = ConnectedProps<typeof connector>;

export interface ReceivedProps {
	id?: string;
}

export interface MenuData {
	label: string;
	value: string;
}

const mapState = (state: ReduxState, ownProps: ReceivedProps) => {

	const options: MenuData[] = state.stories.map(({id, title}) => ({value: id, label: title}));
	const titles: string[] = options.map(({label}) => label);
	options.push( {value: RANDOM_ID, label: 'Pick a random story'} );

	const loaded = state.config.loaded;
	const {storyIndex: savedIndex, willClear, showStory} = state.ui;

	const isRandom = ownProps.id === RANDOM_ID;
	let currentIndex = state.stories.indexOf(ownProps.id ?? '') ?? -1;
	if (currentIndex === -1 && isRandom) {
		currentIndex = savedIndex !== -1 ? savedIndex : Math.floor(Math.random() * titles.length);
	}

	return {
		options,
		titles,
		loaded,
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
	}
});

const connector = connect(mapState, mapDispatch);

export default connector(ApplicationView);