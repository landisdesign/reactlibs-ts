import React from 'react';
import { Redirect } from 'react-router-dom';

import { ReduxProps, ReceivedProps } from './index';

export type ApplicationProps = ReduxProps & ReceivedProps;
export type ApplicationPropKeys = keyof ApplicationProps;

export default class ApplicationView extends React.Component<ApplicationProps> {

	shouldComponentUpdate(nextProps: ApplicationProps) {

		const simpleKeys: ApplicationPropKeys[] = ['loaded', 'currentIndex', 'savedIndex', 'willClear', 'showStory', 'isRandom'];
		const nextOptions = nextProps.options;

		return simpleKeys.some(key => this.props[key] !== nextProps[key])
			|| this.props.options.some(({label, value}, i) => (label !== nextOptions[i].label) || (value !== nextOptions[i].value))
	}

	render() {

		const {
			loaded,
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

		setRandom(isRandom);
		setStoryIndex(currentIndex);

		if (!loaded) {
			return null;
		}
		else if (id && currentIndex === -1) {
			return <Redirect to='/stories'/>;
		}
		else {
			if (willClear) {
				resetScreen(currentIndex);
			}
			let index = isRandom ? currentIndex : options.length - 1;
			const title = isRandom ? '(Mystery story)' : (index === -1 ? '\xA0' : titles[index]); // \xA0 maintains space for title

			// to be replaced by actual ApplicationView content
			return <dl>
				<dt>id:</dt><dd>{id}</dd>
				<dt>loaded:</dt><dd>{loaded.toString()}</dd>
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
}
