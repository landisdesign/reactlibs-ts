import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';

import { setEntry } from '../../reducers/entries/actions';

import WordRowView from './view';

export type ReduxProps = ConnectedProps<typeof connector>;

export interface ReceivedProps {
	storyIndex: number;
	entryIndex: number;
}

const mapState = (state: ReduxState, props: ReceivedProps) => {
	const {
		storyIndex,
		entryIndex
	} = props;

	const value = state.entries[storyIndex][entryIndex];
	const wordType = state.stories.at(storyIndex).fields[entryIndex];
	const {
		help,
		title,
		words
	} = state.words.find(wordType);

	return {
		help,
		title,
		value,
		words
	};
};

const mapDispatch = (dispatch: Dispatch) => ({
	setEntry: (storyIndex: number, entryIndex: number, value: string) => dispatch(setEntry(storyIndex, entryIndex, value))
});

const connector = connect(mapState, mapDispatch);

export default connector(WordRowView);
