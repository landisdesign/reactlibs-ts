import { StoryConfigData } from '../config/types';

export class Story implements StoryConfigData {
	readonly id: string;
	readonly title: string;
	readonly fields: string[];
	readonly template: string;

	constructor(source: StoryConfigData) {
		this.id = source.id;
		this.title = source.title;
		this.fields = [...source.fields];
		this.template = source.template;
	}
}

class StringNumberMap {
	[index: string]: number;
}

export class StoryState {
	private readonly stories: Story[];
	private readonly indices: StringNumberMap = new StringNumberMap();

	constructor(stories: StoryConfigData[] = []) {
		this.stories = stories.map(story => new Story(story));
		this.stories.forEach((story, index) => {this.indices[story.id] = index});
	}

	at(index: number): Story {
		return this.stories[index];
	}

	find(id: string): number {
		return this.indices[id];
	}
}