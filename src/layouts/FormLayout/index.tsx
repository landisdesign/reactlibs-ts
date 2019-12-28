import React from 'react';

import Button, { ButtonProps } from '../../elements/Button';

import styles from './FormLayout.module.scss';

interface FormLayoutProps {
	scrolling?: boolean;
	onSubmit?: React.FormEventHandler<HTMLFormElement>,
	defaultButton?: ButtonProps,
	buttons?: ButtonProps[]
}

/**
 *	A scrollable form. If buttons are provided, they will be presented at the bottom
 *	of the form. If the form is supposed to scroll, It should be in a container whose
 *	size can be known beforehand in some way, otherwise it will collapse.
 */
export default class FormLayout extends React.Component<FormLayoutProps> {

	render() {
		const {
			defaultButton = null,
			buttons = [],
			scrolling = false,
			onSubmit = (e: React.FormEvent) => e.preventDefault(),
			children
		} = this.props;

		const allButtons = [...buttons];
		if (defaultButton) {
			allButtons.unshift({...defaultButton, isDefault: true});
		}

		const className = styles[scrolling ? 'containerScrolling' : 'container'];

		const buttonPanel = allButtons.length ? (
			<div className={styles.buttons}>
				{ allButtons.map((button, index) => <span key={'button-' + index}><Button {...button}/></span>) }
			</div>
		) : null;

		const formData = scrolling ? <div className={styles.scroller}>{children}</div> : children;

		return (
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={className}>
					<div className={styles.fields}>
						{formData}
					</div>
					{buttonPanel}
				</div>
			</form>
		);
	}

}
