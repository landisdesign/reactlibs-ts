import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { State } from './index';

export interface BaseAction extends Action<string> {
	readonly type: string;
	readonly payload?: any;
	readonly meta?: any;
	readonly error?: boolean;
}

export type ReactlibThunkAction<ReturnType = void> = ThunkAction<ReturnType, State, null, BaseAction>;
