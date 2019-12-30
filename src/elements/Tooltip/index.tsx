import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './Tooltip.module.scss';

interface OverridePositionFunction {
	(
		position: { left: number; top: number; },
		currentEvent: Event,
		currentTarget: Element,
		node: any,
		place?: ReactTooltip.Place,
		desiredPlace?: ReactTooltip.Place,
		effect?: ReactTooltip.Effect,
		offset?: ReactTooltip.Offset
	): {
		left: number;
		top: number;
	};
}

interface TooltipProps {
	content: string;
	id: string;
	overridePosition?: OverridePositionFunction;
}

export default class Tooltip extends React.Component<TooltipProps> {

	render() {
		const {
			id,
			content,
			children,
			overridePosition
		} = this.props;

		return (<>
			<span data-tip data-for={id}>{children}</span>
			<ReactTooltip className={styles.content} id={id} type='info' effect='solid' html={true} overridePosition={overridePosition}>{content}</ReactTooltip>
		</>);
	}
}
