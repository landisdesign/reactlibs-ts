import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';

import { setEntry } from '../../reducers/entries/actions';

import WordRowView from './view';

export type ReduxProps = ConnectedProps<typeof connector>;

export interface ReceivedProps {
	entryIndex: number;
}

const mapState = (state: ReduxState, props: ReceivedProps) => {
	const {
		entryIndex
	} = props;

	const storyIndex = state.ui.storyIndex;
	const value = state.entries[storyIndex][entryIndex];
	const wordType = state.stories.at(storyIndex).fields[entryIndex];
	const {
		help,
		title,
		words
	} = state.words.find(wordType);

	return {
		storyIndex,
		help,
		title,
		value,
		words
	};
};

const mapDispatch = {
	setEntry
};

const connector = connect(mapState, mapDispatch);

export default connector(WordRowView);
