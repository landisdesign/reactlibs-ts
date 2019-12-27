import React from 'react';

import styles from './ProgressIndicator.module.scss';

interface ProgressIndicatorProps {
	current: number;
	max: number;
	width?: string;
	backgroundColor?: string;
	fillColor?: string;
}

/**
	A progress bar, showing the percentage completion of a task
 */
export default class ProgressIndicator extends React.PureComponent<ProgressIndicatorProps> {

	private buildBackground(fraction: number, backgroundColor: string, fillColor: string): string {
		if (fraction < .2) {
			return backgroundColor;
		}
		if (fraction > 99.8) {
			return fillColor;
		}
		return `linear-gradient(to right, ${fillColor} ${fraction - 0.1}%, ${backgroundColor} ${fraction + 0.1}%)`;
	}

	render() {

		const {
			current,
			max,
			width = 'calc(100% - 1rem',
			backgroundColor = '#FFF',
			fillColor = '#369'
		} = this.props;

		const fraction = Math.round(1000 * current / max) / 10;
		const background = this.buildBackground(fraction, backgroundColor, fillColor);

		const style = {
			width,
			background
		};

		return <div className={styles.progressIndicator} style={style}/>;
	}

}
