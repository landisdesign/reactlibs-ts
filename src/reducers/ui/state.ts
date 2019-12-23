export interface UIStateData {
	isRandom?: boolean;
	showStory?: boolean;
	showEMail?: boolean;
	transitionEMail?: boolean;
	storyIndex?: number;
	output?: string;
	willClear?: boolean;
}

export class UIState implements UIStateData {
	readonly isRandom: boolean;
	readonly showStory: boolean;
	readonly showEMail: boolean;
	readonly transitionEMail: boolean;
	readonly storyIndex: number;
	readonly output: string;
	readonly willClear: boolean;

	constructor(...args: UIStateData[]) {

		// TS doesn't permit Object.assign to populate readonly fields.
		this.isRandom = false;
		this.showStory = false;
		this.showEMail = false;
		this.transitionEMail = false;
		this.storyIndex = -1;
		this.output = '';
		this.willClear = false;

		if (args.length) {
			Object.assign(this, ...args);
		}
	}
}
