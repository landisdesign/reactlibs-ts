import React from 'react';

import { buildClasses, sleep } from '../../common';

import styles from './Modal.module.scss';

import Close from '../../svg/Close';

import { BaseEvent } from '../../common';

export const MODAL_CLOSE_EVENT_TYPE: string = 'modalClose';

export class ModalCloseEvent extends BaseEvent {
	constructor(target: HTMLElement | null, trusted: boolean) {
		super(MODAL_CLOSE_EVENT_TYPE, true, target, trusted);
	}
}

export const TRANSITION_EVENT_TYPE: string = 'modalTransition';

export class ModalTransitionEvent extends BaseEvent {
	readonly opening: boolean;

	constructor(target: HTMLElement | null, trusted: boolean, opening: boolean) {
		super(TRANSITION_EVENT_TYPE, false, target, trusted);
		this.opening = opening;
	}
}

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
};

interface ModalState {
	wasClosed: boolean;
}

const buildClassNames = buildClasses(styles);

export default class Modal extends React.PureComponent<ModalProps, ModalState> {

	private contentDiv: React.RefObject<HTMLDivElement>;
	private modalDiv: React.RefObject<HTMLDivElement>;

	constructor(props: ModalProps) {
		super(props);
		this.state = {
			wasClosed: true
		};
		this.contentDiv = React.createRef();
		this.modalDiv = React.createRef();
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
			const transitionEvent = new ModalTransitionEvent(modalDiv, true, transitionToOpen);
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

		if (!this.props.isOpen || this.state.wasClosed) {
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
		this.setState({
			wasClosed: true
		});
	}

	static getDerivedStateFromProps(props: ModalProps, state: ModalState) {
		// Closed is only used to handle closing the modal internally.
		state.wasClosed = false;
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
					{showCloseButton ? <span className={styles.close} onClick={this.closeMouseEventListener}><Close actionable={true}/></span> : null }
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