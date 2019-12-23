import { WordConfigData, WordListConfigData, WordRefConfigData } from '../config/types';

export class Word implements WordListConfigData {
	readonly id: string;
	readonly title: string;
	readonly words: string[];

	constructor({id, title, words}: {id: string, title: string, words: string[]}) {
		this.id = id;
		this.title = title;
		this.words = [...words];
	}
}

class WordMap {
	[index: string]: Word
}

interface ConfigAccumulator {
	wordMap: WordMap,
	referrers: WordRefConfigData[]
}

export class WordState {
	private readonly wordMap: WordMap;

	constructor(wordList?: WordConfigData[]) {
		if (!wordList) {
			this.wordMap = new WordMap();
			return;
		}

		const {wordMap, referrers}: ConfigAccumulator = wordList.reduce(
			(acc: ConfigAccumulator, wordConfig: WordConfigData): ConfigAccumulator => {
				if ('ref' in wordConfig) {
					acc.referrers.push(wordConfig as WordRefConfigData);
				}
				else {
					acc.wordMap[wordConfig.id] = new Word(wordConfig);
				}
				return acc;
			},
			{wordMap: new WordMap(), referrers: []} as ConfigAccumulator
		);

		referrers.forEach((refConfig: WordRefConfigData):void => {
			const words: string[] = wordMap[refConfig.ref].words;
			const listConfig: WordListConfigData = {
				id: refConfig.id,
				title: refConfig.title,
				words
			};
			wordMap[listConfig.id] = new Word(listConfig);
		});

		this.wordMap = wordMap;
	}

	find(id: string): Word {
		return this.wordMap[id];
	}
}
