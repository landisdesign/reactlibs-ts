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
	onBeforeClose?: ModalCloseEventListener;
	title?: string
	background?: React.CSSProperties;
	children?: React.ReactNode;
};

const buildClassNames = (classNames: string[]): string => classNames.map(className => styles[className]).join(' ');

export default class Modal extends React.PureComponent<ModalProps> {

	private contentDiv: React.RefObject<HTMLDivElement>;
	private modalDiv: React.RefObject<HTMLDivElement>;
	private closed: boolean;

	constructor(props: ModalProps) {
		super(props);
		this.contentDiv = React.createRef();
		this.modalDiv = React.createRef();
		this.closed = false;
		this.closeKeyEventListener = this.closeKeyEventListener.bind(this);
		this.closeMouseEventListener = this.closeMouseEventListener.bind(this);
	}

	private async transition(forceClosed: boolean = false) {
		const modalDiv = this.modalDiv.current;
		if (!modalDiv) {
			return;
		}

		const {
			isOpen = true,
			onTransition
		} = this.props;

		const transitionToOpen = isOpen && !forceClosed;

		const transitionClassNames = ['modal', transitionToOpen ? 'opening' : 'closing'];
		const finishedClassNames = [...transitionClassNames];
		if (transitionToOpen) {
			finishedClassNames.push('open');
		}

		modalDiv.className = buildClassNames(transitionClassNames);
		await sleep(1);
		modalDiv.className = buildClassNames(finishedClassNames);

		if (onTransition) {
			await sleep(transitionToOpen ? 650 : 350);
			const transitionEvent = new ModalTransitionEvent(modalDiv, true, isOpen);
			onTransition(transitionEvent);
		}
	}

	private closeKeyEventListener(e: KeyboardEvent) {
		if (e.key === 'Esc' || e.key === 'Escape') {
			this.conditionallyCloseModal();
		}
	}

	private closeMouseEventListener() {
		this.conditionallyCloseModal();
	}

	private conditionallyCloseModal() {
		const modalDiv = this.modalDiv.current;
		if (!modalDiv) {
			return;
		}

		if (!this.props.isOpen || this.closed) {
			return;
		}
		if (this.props.onBeforeClose) {
			const modalCloseEvent = new ModalCloseEvent(modalDiv, true);
			this.props.onBeforeClose(modalCloseEvent);
			if (modalCloseEvent.defaultPrevented) {
				return;
			}
		}

		if (this.props.isTransitioning) {
			this.transition(true);
		}
		else {
			modalDiv.className = styles.modal;
		}
		this.closed = true;
	}

	componentDidMount() {
		if (this.props.isTransitioning) {
			this.transition();
		}
		if (this.props.isOpen) {
			document.addEventListener('keyup', this.closeKeyEventListener);
		}
	}

	componentDidUpdate(prevProps: ModalProps) {
		if (this.props.isOpen !== prevProps.isOpen) {
			if (this.props.isOpen) {
				document.addEventListener('keyup', this.closeKeyEventListener);
			}
			else {
				document.removeEventListener('keyup', this.closeKeyEventListener);
			}
			if (this.props.isTransitioning) {
				this.transition();
			}
		}
	}

	componentWillUnmount() {
		if (this.props.isOpen) {
			document.removeEventListener('keyup', this.closeKeyEventListener);
		}
	}

	private renderHeader(): React.ReactNode | null {
		const {
			title,
			showCloseButton
		} = this.props;

		return (title || showCloseButton)
			?	<h1 className={styles.modalHeader}>
					<span>{title}</span>
					{showCloseButton ? <span className={styles.close} onClick={this.closeMouseEventListener}>Close actionable={true}/</span> : null }
				</h1>
			: null
		;
	}

	render() {
		const {
			isOpen = true,
			isTransitioning = false,
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
					{ this.renderHeader() }
					<div ref={this.contentDiv}>
						{ children }
					</div>
				</div>
			</div>
		);
	}
}