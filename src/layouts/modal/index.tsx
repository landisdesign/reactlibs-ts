import React from 'react';

import { shallowPropsChanged } from '../../common';

interface ModalProps {
	isOpen?: boolean;
	willTransition?: boolean;
	onTransitionComplete?: () => void;
	showCloseButton?: boolean;
	title?: string
	backgroundColor?: string;
	children?: React.ReactNode;
};

export default class Modal extends React.Component<ModalProps> {

	shouldComponentUpdate(nextProps: ModalProps) {
		const shallowKeys = ['isOpen', 'willTransition', 'onTransitionComplete', 'showCloseButton', 'title', 'backgroundColor'];
		return shallowPropsChanged(this.props, nextProps, shallowKeys)
			|| childrenChanged(this.props.children, nextProps.children);
	}

	render() {
		return this.props.children;
	}
}