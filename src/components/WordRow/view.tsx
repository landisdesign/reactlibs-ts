import React from 'react';

import Tooltip from '../../elements/Tooltip';
import Button from '../../elements/Button'

import Info from '../../svg/Info';
import Refresh from '../../svg/Refresh';


import { ReceivedProps, ReduxProps } from './index';
import styles from './WordRow.module.scss';

type WordRowViewProps = ReceivedProps & ReduxProps;

export default class WordRowView extends React.Component<WordRowViewProps> {

	private tooltipFixed: boolean = false;

	constructor(props: WordRowViewProps) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.randomize = this.randomize.bind(this);
		this.fixTooltipWidth = this.fixTooltipWidth.bind(this);
	}

	private changeWord(value: string) {
		this.props.setEntry(this.props.storyIndex, this.props.entryIndex, value);
	}

	private onChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.changeWord(e.target.value);
	}

	private randomize() {
		const words = this.props.words;
		this.changeWord(words[Math.floor(Math.random() * words.length)]);
	}

	private fixTooltipWidth({top, left}: {top: number, left: number}, currentEvent: any, currentTarget: any) {
		if (this.tooltipFixed) return {top, left};

		currentTarget.style.maxWidth = '50%';
		this.tooltipFixed = true;

		return { top, left };
	}

	render() {

		const {
			entryIndex,
			help,
			title,
			value
		} = this.props;

		const fieldName = 'field-' + entryIndex;
		const tooltipId = 'tooltip-' + entryIndex;

		return (
			<div className={styles.wordRow}>
				<div className={styles.labelRow}>
					<label className={styles.label} htmlFor={fieldName}>{title}</label>
					{ help && <Tooltip id={tooltipId} content={help} overridePosition={this.fixTooltipWidth}><Info className={styles.tooltip}/></Tooltip>}
				</div>
				<div>
					<input type='text' className={styles.input} name={fieldName} id={fieldName} value={value} onChange={this.onChange}/>
					<Button className={styles.button} onClick={this.randomize} title='Randomize this word'><Refresh className={styles.refresh}/></Button>
				</div>
			</div>
		);
	}
}
