import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ReduxState } from './index';

export interface BaseAction extends Action<string> {
	readonly type: string;
	readonly payload?: any;
	readonly meta?: any;
	readonly error?: boolean;
}

export type ReactlibThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, null, BaseAction>;

export type ReactlibThunkDispatch = ThunkDispatch<ReduxState, null, BaseAction>;