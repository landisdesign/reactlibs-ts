export interface Cloneable<T> {
	clone(): T; 
}

export class StringNumberMap {
	[index: string]: number;
}

export class StringMap {
	[index: string]: string;
}