import { Cloneable } from '../../types';

import { WordListConfigData, WordRefConfigData, WordConfigData, StoryConfigData, ConfigStateJSON, ConfigProgress } from './types';

class ConfigSource implements Cloneable<ConfigSource> {
	readonly loaded: boolean = false;

	constructor(readonly url: string) {}

	clone() {
		return new ConfigSource(this.url);
	}
}

class WordListConfig implements WordListConfigData, Cloneable<WordListConfigData> {
	readonly loaded: boolean = true;
	readonly id: string;
	readonly title: string;
	readonly words: string[];

	constructor({id, title, words}: WordListConfigData) {
		this.id = id;
		this.title = title;
		this.words = [...words];
	}

	clone() {
		return new WordListConfig(this);
	}
}

class WordRefConfig implements WordRefConfigData, Cloneable<WordRefConfigData> {
	readonly loaded: boolean = true;
	readonly id: string;
	readonly title: string;
	readonly ref: string;

	constructor({id, title, ref}: WordRefConfigData) {
		this.id = id;
		this.title = title;
		this.ref = ref;
	}

	clone() {
		return new WordRefConfig(this);
	}
}

type WordSource = ConfigSource | WordListConfig | WordRefConfig;

class StoryConfig implements Cloneable<StoryConfig> {
	readonly loaded: boolean = true;
	readonly stories: StoryConfigData[];

	constructor(stories: StoryConfigData[]) {
		this.stories = stories.map(x => ({...x}));
	}

	clone() {
		return new StoryConfig(this.stories);
	}
}

type StorySource = ConfigSource | StoryConfig;

export interface ConfigStateData {
	loading: boolean;
	loaded: boolean;
	wordSources: WordSource[];
	storySource: StorySource;
}

export class ConfigState implements ConfigStateData, Cloneable<ConfigState> {
	readonly loading: boolean;
	readonly loaded: boolean;
	readonly wordSources: WordSource[];
	readonly storySource: StorySource;

	constructor(o?: ConfigStateJSON);
	constructor(o?: ConfigStateData);
	constructor(o?: any) {
		if (!o) {
			this.loading = false;
			this.loaded = false;
			this.wordSources = [];
			this.storySource = new ConfigSource('');
		}
		else if (!('loading' in o)) { // ConfigStateJSON
			const configJSON = o as ConfigStateJSON;
			this.loading = false;
			this.loaded = false;
			this.wordSources = configJSON.wordSources.map(url => new ConfigSource(url) );
			this.storySource = new ConfigSource(configJSON.storySource);
		}
		else {
			const configState = o as ConfigStateData;
			this.loading = configState.loading;
			this.loaded = configState.loaded;
			this.wordSources = configState.wordSources.map(source => source.clone());
			this.storySource = configState.storySource.clone();
		}
	}

	clone() {
		return new ConfigState(this);
	}

	loadWordData(source: WordConfigData, index: number): ConfigState {
		const data: ConfigStateData = {...this};
		data.wordSources = data.wordSources.map((currentSource, i) => {
			if (i !== index ) {
				return currentSource;
			}
			return ('words' in source) ? new WordListConfig(source) : new WordRefConfig(source);
		});
		return new ConfigState(data);
	}

	loadStoryData(source: StoryConfigData[]): ConfigState {
		const data: ConfigStateData = {...this};
		data.storySource = new StoryConfig(source);
		return new ConfigState(data);
	}

	loadLoadingState(loading: boolean, loaded: boolean): ConfigState {
		const data: ConfigStateData = {...this};
		data.loading = loading;
		data.loaded = loaded;
		return new ConfigState(data);
	}

	getProgress(): ConfigProgress {
		return {
			current: this.wordSources.reduce((c, x) => +x.loaded + c, +this.storySource.loaded),
			total: this.wordSources.length + 1
		};
	}
}
