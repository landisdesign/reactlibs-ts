import React from 'react';
import { Redirect } from 'react-router-dom';

import { arraysEqual, objectsEqual, shallowPropsChanged } from '../../common';

import { ReduxProps, ReceivedProps } from './index';

export type ApplicationProps = ReduxProps & ReceivedProps;

export default class ApplicationView extends React.Component<ApplicationProps> {

	shouldComponentUpdate(nextProps: ApplicationProps) {

		const shallowPropKeys = ['ready', 'currentIndex', 'savedIndex', 'willClear', 'showStory', 'isRandom'];

		return shallowPropsChanged(this.props, nextProps, shallowPropKeys)
			|| !arraysEqual(this.props.options, nextProps.options, objectsEqual);
	}

	render() {

		const {
			ready,
			currentIndex,
			savedIndex,
			willClear,
			showStory,
			options,
			titles,
			isRandom,
			id,

			setRandom,
			setStoryIndex,
			resetScreen
		} = this.props;

		if (!ready) {
			return null;
		}

		if (id && currentIndex === -1) {
			return <Redirect to='/stories'/>;
		}

		setRandom(isRandom);
		setStoryIndex(currentIndex);
		if (willClear) {
			resetScreen(currentIndex);
		}

		let index = isRandom ? currentIndex : options.length - 1;
		const title = isRandom ? '(Mystery story)' : (index === -1 ? '\xA0' : titles[index]); // \xA0 maintains space for title

		// to be replaced by actual ApplicationView content
		return <dl>
			<dt>id:</dt><dd>{id}</dd>
			<dt>ready:</dt><dd>{ready.toString()}</dd>
			<dt>isRandom:</dt><dd>{isRandom.toString()}</dd>
			<dt>currentIndex:</dt><dd>{currentIndex}</dd>
			<dt>savedIndex:</dt><dd>{savedIndex}</dd>
			<dt>willClear:</dt><dd>{willClear.toString()}</dd>
			<dt>showStory:</dt><dd>{showStory.toString()}</dd>
			<dt>options:</dt><dd><ul>{ options.map(({label, value}) => <li>{label} ({value})</li>) }</ul></dd>
			<dt>titles:</dt><dd><ul>{ titles.map(title => <li>{title}</li>) }</ul></dd>
			<dt>title:</dt><dd>{title}</dd>
			<dt>index:</dt><dd>{index}</dd>
		</dl>;
	}
}
