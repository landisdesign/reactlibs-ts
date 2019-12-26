import {BaseSyntheticEvent} from 'react';

type BaseEventType = React.BaseSyntheticEvent<null, HTMLElement | null, HTMLElement | null>

type ModalCloseEventType = BaseEventType;

interface ModalTransitionEventType extends BaseEventType {
	opening: boolean;
}

abstract class BaseEvent implements BaseEventType {
	readonly bubbles: boolean = false;
	readonly eventPhase: number = Event.AT_TARGET;
	readonly timeStamp: number = Date.now();

	readonly nativeEvent: never;
	readonly currentTarget: HTMLElement | null;
	readonly target: HTMLElement | null;
	readonly isTrusted: boolean;
	readonly cancelable: boolean;
	readonly type: string;

	private _defaultPrevented: boolean = false;
	private propagationStopped: boolean = false;

	constructor(type: string, cancelable: boolean, target: HTMLElement | null, trusted: boolean) {
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

export const MODAL_CLOSE_EVENT_TYPE: string = 'modalClose';

export class ModalCloseEvent extends BaseEvent implements ModalCloseEventType {
	constructor(target: HTMLElement | null, trusted: boolean) {
		super(MODAL_CLOSE_EVENT_TYPE, true, target, trusted);
	}
}

export const TRANSITION_EVENT_TYPE: string = 'modalTransition';

export class ModalTransitionEvent extends BaseEvent implements ModalTransitionEventType {
	readonly opening: boolean;

	constructor(target: HTMLElement | null, trusted: boolean, opening: boolean) {
		super(TRANSITION_EVENT_TYPE, false, target, trusted);
		this.opening = opening;
	}
}
