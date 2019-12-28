import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { ReduxState } from '../../reducers/';

import { clearEntries, setEntries } from '../../reducers/entries/actions';
import { setOutput, setShowStory } from '../../reducers/ui/actions';

import WordsPanelView from './view';

export type ReduxProps = ConnectedProps<typeof connector>;

const mapState = (state: ReduxState) => {
	const storyIndex = state.ui.storyIndex;
	if (storyIndex === -1) {
		return {
			entries: [],
			isComplete: false,
			storyIndex,
			template: '',
			words: []
		};
	}

	const {fields, template} = state.stories.at(storyIndex);
	const entries = [...state.entries[storyIndex]];
	return {
		entries,
		isComplete: entries.every(value => value.length),
		storyIndex,
		template,
		words: fields.map(type => state.words.find(type)?.words ?? [''])
	};
};

const mapDispatch = (dispatch: Dispatch) => ({
	build: (template: string, entries: string[]): void => {
		const output = template.replace(/\{\{(\d+)\}\}/g, (match, index) => {
			return entries[+index - 1].replace(/</g, '&lt;');
		});
		dispatch(setOutput(output));
		dispatch(setShowStory(true));
	},
	clear: (storyIndex: number): void => {
		dispatch(clearEntries(storyIndex));
		dispatch(setOutput(''));
	},
	randomize: (storyIndex: number, words: string[][]): void => {
		dispatch(setEntries(
			storyIndex,
			words.map(wordList => wordList[Math.floor(Math.random() * wordList.length)])
		));
	}
});

const connector = connect(mapState, mapDispatch);

export default connector(WordsPanelView);