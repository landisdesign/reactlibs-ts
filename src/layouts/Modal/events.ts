import { BaseEventType, BaseEvent } from '../../common';

type ModalCloseEventType = BaseEventType;

interface ModalTransitionEventType extends BaseEventType {
	opening: boolean;
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
