import React from 'react';

import { sleep } from '../../common';

import styles from './Modal.module.scss';

import { ModalCloseEvent, ModalTransitionEvent } from './events';

export interface ModalTransitionEventListener {
	(e: ModalTransitionEvent): void;
}

export interface ModalCloseEventListener {
	(e: ModalCloseEvent): void;
}

interface ModalProps {
	isOpen?: boolean;
	isTransitioning?: boolean;
	showCloseButton?: boolean;
	onTransition?: ModalTransitionEventListener;
	onClose?: ModalCloseEventListener;
	title?: string
	background?: React.CSSProperties;
	children?: React.ReactNode;
};

const buildClassNames = (classNames: string[]): string => classNames.map(className => styles[className]).join(' ');

export default class Modal extends React.PureComponent<ModalProps> {

	contentDiv: React.RefObject<HTMLDivElement>;
	modalDiv: React.RefObject<HTMLDivElement>;

	constructor(props: ModalProps) {
		super(props);
		this.contentDiv = React.createRef();
		this.modalDiv = React.createRef();
	}

	async transition() {
		const modalDiv = this.modalDiv.current;
		if (!modalDiv) {
			return;
		}

		const {
			isOpen = true,
			onTransition
		} = this.props;

		const transitionClassNames = ['modal', isOpen ? 'opening' : 'closing'];
		const finishedClassNames = [...transitionClassNames];
		if (isOpen) {
			finishedClassNames.push('open');
		}

		modalDiv.className = buildClassNames(transitionClassNames);
		await sleep(1);
		modalDiv.className = buildClassNames(finishedClassNames);

		if (onTransition) {
			await sleep(isOpen ? 650 : 350);
			const transitionEvent = new ModalTransitionEvent(modalDiv, true, isOpen);
			onTransition(transitionEvent);
		}
	}

	componentDidMount() {
		if (this.props.isTransitioning) {
			this.transition();
		}
	}

	componentDidUpdate(prevProps: ModalProps) {
		if ( (this.props.isOpen !== prevProps.isOpen) && this.props.isTransitioning) {
			this.transition();
		}
	}

	render() {

		const {
			isOpen = true,
			isTransitioning = false,
			showCloseButton = false,
			onClose = null,
			title = '',
			background,
			children = null
		} = this.props;

		const containerClassNames = ['modal'];
		if (!isTransitioning) {
			containerClassNames.push(isOpen ? 'open' : 'closed');
		}
		else if (!isOpen) {
			containerClassNames.push('open');
		}

		return (
			<div className={buildClassNames(containerClassNames)} style={ background } ref={this.modalDiv}>
				<div className={styles.content}>
					ModalHeader title={title} onClose={onClose} showCloseButton={showCloseButton}/
					<div ref={this.contentDiv}>
						{ children }
					</div>
				</div>
			</div>
		);
	}
}