import React from 'react';

import { noop } from '../../common';

import styles from './Modal.module.scss';

type ModalCloseEventType = React.BaseSyntheticEvent<null, HTMLElement, HTMLElement>;

interface ModalTransitionEventType extends React.BaseSyntheticEvent<null, HTMLElement, HTMLElement> {
	opening: boolean;
}

abstract class BaseEvent {
	readonly bubbles: boolean = false;
	readonly eventPhase: number = Event.AT_TARGET;
	readonly timeStamp: number = Date.now();

	readonly nativeEvent: never;
	readonly currentTarget: HTMLElement;
	readonly target: HTMLElement;
	readonly isTrusted: boolean;
	readonly cancelable: boolean;
	readonly type: string;

	private _defaultPrevented: boolean = false;
	private propagationStopped: boolean = false;

	constructor(type: string, cancelable: boolean, target: HTMLElement, trusted: boolean) {
		this.type = type;
		this.cancelable = cancelable;
		this.isTrusted = trusted;
		this.currentTarget = this.target = target;
	}

	persist(): void {}

	preventDefault(): void {
		this._defaultPrevented = true;
	}

	get defaultPrevented(): boolean {
		return this._defaultPrevented;
	}

	isDefaultPrevented(): boolean {
		return this._defaultPrevented;
	}

	stopPropagation(): void {
		this.propagationStopped = true;
	}

	isPropagationStopped(): boolean {
		return this.propagationStopped;
	}
}

const MODAL_CLOSE_EVENT_TYPE: string = 'modalClose';
class ModalCloseEvent extends BaseEvent implements ModalCloseEventType {
	constructor(target: HTMLElement, trusted: boolean) {
		super(MODAL_CLOSE_EVENT_TYPE, true, target, trusted);
	}
}

const TRANSITION_EVENT_TYPE: string = 'modalTransition';
class ModalTransitionEvent extends BaseEvent implements ModalTransitionEventType {
	readonly opening: boolean;
	constructor(target: HTMLElement, trusted: boolean, opening: boolean) {
		super(TRANSITION_EVENT_TYPE, false, target, trusted);
		this.opening = opening;
	}
}

interface ModalProps {
	isOpen?: boolean;
	willTransition?: boolean;
	showCloseButton?: boolean;
	transitionListener?: (e: ModalTransitionEvent) => void;
	closeListener?: (e: ModalCloseEvent) => void;
	title?: string
	background?: React.CSSProperties;
	children?: React.ReactNode;
};

export default class Modal extends React.Component<ModalProps> {

	render() {

		const {
			isOpen = true,
			willTransition = false,
			showCloseButton = false,
			transitionListener = noop,
			closeListener = noop,
			title = '',
			background,
			children = null
		} = this.props;

		return (
			<div className={styles.modal} style={ background }>
				<div className={styles.content}>
					ModalHeader title={title} closeListener={closeListener}/
					<div>
						{ children }
					</div>
				</div>
			</div>
		);
	}
}