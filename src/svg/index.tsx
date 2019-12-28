import React from 'react';

import styles from './svg.module.scss';

export interface SVGProps {
	viewBox?: string;
	className?: string;
	actionable?: boolean;
}

export function injectSVGProps<P extends SVGProps>(SvgComponent: React.ComponentType<P>) {
	return class SVG extends React.Component<P> {

		displayName: string = `SVG(${SvgComponent.displayName})`;

		render() {
			const {
				viewBox = '0 0 32 32',
				actionable = false,
				className = styles.icon
			} = this.props;

			const classes = [className];
			if (actionable) {
				classes.push(styles.actionable);
			}

			const svgProps = {
				...this.props,
				viewBox,
				className: classes.join(' ')
			};

			return <SvgComponent {...svgProps}/>;
		}
	};
}