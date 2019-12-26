import React from 'react';
import { Redirect } from 'react-router-dom';

import Select, { ValueType } from 'react-select';

import { shallowPropsChanged } from '../../common';

import { ReduxProps, ReceivedProps, MenuData, RANDOM_ID } from './index';

import Copyright from '../../elements/Copyright';
import Title from '../../elements/Title';

import styles from './Application.module.scss';

export type ApplicationProps = ReduxProps & ReceivedProps;

export default class ApplicationView extends React.Component<ApplicationProps> {

	constructor(props: ApplicationProps) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(selectedOption: ValueType<MenuData>) {
		if (selectedOption) {
			const { value } = selectedOption as MenuData;
			const {
				history,

				setStoryIndex,
				setWillClear
			} = this.props;
			if (value === RANDOM_ID) {
				setStoryIndex(-1);
			}
			history.push('/stories/' + value);
			setWillClear();
		}
	}

	shouldComponentUpdate(nextProps: ApplicationProps) {

		const shallowPropKeys = ['ready', 'currentIndex', 'savedIndex', 'willClear', 'showStory', 'isRandom'];

		return shallowPropsChanged(this.props, nextProps, shallowPropKeys);
	}

	componentDidMount() {
		const {
			ready,
			currentIndex,
			willClear,
			isRandom,

			setRandom,
			setStoryIndex,
			resetScreen
		} = this.props;

		if (ready) {
			setRandom(isRandom);
			setStoryIndex(currentIndex);
			if (willClear) {
				resetScreen(currentIndex);
			}
		}
	}

	componentDidUpdate(prevProps: ApplicationProps) {
		const {
			ready,
			currentIndex,
			willClear,
			isRandom,

			setRandom,
			setStoryIndex,
			resetScreen
		} = this.props;

		if (ready) {
			if (isRandom !== prevProps.isRandom) {
				setRandom(isRandom);
			}
			if (currentIndex !== prevProps.currentIndex) {
				setStoryIndex(currentIndex);
			}
			if (willClear && (willClear !== prevProps.willClear) ) {
				resetScreen(currentIndex);
			}
		}
	}

	render() {

		const {
			ready,
			currentIndex,
			options,
			titles,
			isRandom,
			showStory,
			id
		} = this.props;

		if (!ready) {
			return null;
		}

		if (id && currentIndex === -1) {
			return <Redirect to='/stories'/>;
		}

		const index = isRandom ? options.length - 1 : currentIndex;
		const title = isRandom ? '(Mystery story)' : (index === -1 ? '\xA0' : titles[index]); // \xA0 maintains space for title

		return 	<>
			<div className={styles.application}>
				<Title packed={true}>MadLibs, React style</Title>
				<Select className={styles.selector} options={options} value={options[index]} onChange={this.onChange} isSearchable={false} />
				<Title>{title}</Title>
				MasterDetailLayout masterLabel='Words' detailLabel='Story' highlightDetail={showStory} highlightDetailCallback=showDetail
					MasterPanel highlightDetail={showStory}
						WordsPanel/
					/MasterPanel
					DetailPanel highlightDetail={showStory}
						StoryPanel/
					/DetailPanel
				/MasterDetailLayout
				<Copyright/>
			</div>
			EmailModal/
		</>;
	}
}
