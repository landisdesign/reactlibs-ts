import { Action } from 'redux';

export interface BaseAction extends Action<string> {
	readonly type: string;
	readonly payload?: any;
	readonly meta?: any;
	readonly error?: boolean;
}
