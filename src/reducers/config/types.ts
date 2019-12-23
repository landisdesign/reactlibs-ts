interface WordConfigBaseData {
	readonly id: string;
	readonly title: string;
}

export interface WordListConfigData extends WordConfigBaseData {
	readonly words: string[];
}

export interface WordRefConfigData extends WordConfigBaseData {
	readonly ref: string;
}

export type WordConfigData = WordListConfigData | WordRefConfigData;

export interface StoryConfigData {
	readonly id: string;
	readonly title: string;
	readonly fields: string[];
	readonly template: string;
}

export interface ConfigProgress {
	readonly current: number;
	readonly total: number;
}

export interface ConfigStateJSON {
	readonly wordSources: string[];
	readonly storySource: string;
}
