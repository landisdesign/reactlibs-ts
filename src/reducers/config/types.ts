/*
 *	These types have been split out to avoid elision by TypeScript. If these
 *	were included in a module that contains concrete types, TypeScript would
 *	strip them before webpack can reconcile them. This results in webpack
 *	complaining that they weren't exported even when they are.
 */

interface WordBaseConfigData {
	readonly id: string;
	readonly title: string;
}

export interface WordListConfigData extends WordBaseConfigData {
	readonly words: string[];
}

export interface WordRefConfigData extends WordBaseConfigData {
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
