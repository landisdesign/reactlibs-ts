import React from 'react';

import styles from './Title.module.scss';

interface TitleProps {
	packed?: boolean;
}

export default class Title extends React.PureComponent<TitleProps> {

	render() {
		const {
			packed = false,
			children
		} = this.props;

		const className = packed ? styles.packed : styles.title;

		return <h1 className={className}>{children}</h1>;
	}

}
