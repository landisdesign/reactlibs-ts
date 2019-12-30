import React from 'react';

import { ReduxProps } from './index';

import WordRow from '../WordRow';
import { ButtonProps } from '../../elements/Button';
import Text from '../../elements/Text';
import FormLayout from '../../layouts/FormLayout';
import Refresh from '../../svg/Refresh';

import styles from './WordsPanel.module.scss';

export default class WordsPanelView extends React.Component<ReduxProps> {

	private defaultButton: ButtonProps;
	private buttons: ButtonProps[];

	constructor(props: ReduxProps) {
		super(props);

		this.defaultButton = {
			content: 'Show story',
			isSubmit: true,
			disabled: !this.props.isComplete,
			onClick: this.buildStory.bind(this)
		};

		this.buttons = [
			{
				content: <Refresh className={styles.refresh}/>,
				title: 'Randomize all words',
				onClick: this.randomizeWords.bind(this)
			},
			{
				content: 'Clear words',
				title: 'Clear words and output',
				onClick: this.clearStory.bind(this)
			}
		];
	}

	private buildStory() {
		const {
			template,
			entries,

			build
		} = this.props;

		build(template, entries);
	}

	private clearStory() {
		const {
			storyIndex,
			clear
		} = this.props;

		clear(storyIndex);
	}

	private randomizeWords() {
		const {
			storyIndex,
			words,

			randomize
		} = this.props;

		randomize(storyIndex, words);
	}

	render() {
		const {
			entries,
			isComplete
		} = this.props;

		this.defaultButton.disabled = !isComplete;

		return entries.length ? (
			<FormLayout scrolling={false} defaultButton={this.defaultButton} buttons={this.buttons}>
				{ entries.map((_, i) => <WordRow key={i} entryIndex={i}/>) }
			</FormLayout>
		) : (
			<Text>
				Welcome to MadLibs, React Style. Pick a story from the choices in the menu above, or choose &ldquo;Pick a random story&rdquo; to choose a story blindly. Enter words for the fields, then click &ldquo;Create&rdquo; to see the results.
			</Text>
		);
	}
}