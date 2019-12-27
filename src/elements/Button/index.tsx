import React from 'react';

import { maskObject } from '../../common';

import styles from './Button.module.scss';

const objectMask = {
	name: true,
	onClick: true,
	style: true,
	title: true,
	value: true,
	disabled: true
};

export interface ButtonProps {
	className?: string;
	isSubmit?: boolean;
	isDefault?: boolean;
	disabled?: boolean;
	name?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	style?: React.CSSProperties;
	title?: string;
	value?: string;
	content?: React.ReactNode;
}

type ValidButtonTypes = 'submit' | 'button';
export default class Button extends React.PureComponent<ButtonProps> {

	render() {

		const {
			isDefault = false,
			isSubmit = false,
			className = '',
			content = '',
			children = <>{content}</>
		} = this.props;

		const type: ValidButtonTypes = isSubmit ? 'submit' : 'button';
		const buttonClasses = [isDefault ? styles.default : styles.button];
		if (className) {
			buttonClasses.push(className);
		}

		const buttonProps = {
			className: buttonClasses.join(' '),
			type,
			...maskObject(this.props, objectMask)
		};

		return <button {...buttonProps}>{children}</button>;
	}
}
