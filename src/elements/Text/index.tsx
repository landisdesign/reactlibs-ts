import React from 'react';

import styles from './Text.module.scss';

interface TextProps {
	type?: string;
	html?: string;
}

export default class Text extends React.PureComponent<TextProps> {

	render() {
		const {
			html = null,
			type = 'button',
			children
		} = this.props;
		const style = styles[type] ?? styles.default;

		return html ? <div className={style} dangerouslySetInnerHTML={{__html: html}}></div> : <div className={style}>{children}</div>;
	}
}
