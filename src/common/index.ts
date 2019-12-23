interface EqualityFunction<T> {
	(a: T, b: T): boolean;
}

interface IteratorFunction<T> {
	(a: T): void;
}

interface VoidFunction {
	(): void;
}

interface ClassMap {
	[index: string]: string;
}

function arrayEquals<T> (a: T[], b: T[], entryValidator: EqualityFunction<T> = ((aField, bField) => aField === bField)): boolean {
	if (!referenceEquals(a, b)) {
		return false;
	}
	if (a.length !== b.length) {
		return false;
	}
	return a.every((aField, index) => entryValidator(aField, b[index]));
};

const buildClassName = (styles: ClassMap):IteratorFunction<string> => name => styles[name];

const buildClassNames = (styles: ClassMap, classNames: string[]):string => classNames.map(buildClassName(styles)).join(' ');

const cancelEvent = (e: Event) => {
	e.preventDefault();
	e.stopPropagation();
};

const chooseList = (condition: boolean, trueList: string[], falseList: string[], additionalList: string[]): string[] => {
	const list = condition ? trueList : falseList;
	return additionalList ? list.concat(additionalList) : list;
};

const maskObject = (object: any, mask: any): any => Object.keys(mask).reduce((acc: any, key: string): any => {
	if (key in object)
		acc[key] = object[key];
	return acc;
}, {});

const noop = ():void =>{};

const objectEquals = (a: any, b: any) => {
	if (!referenceEquals(a, b)) {
		return false;
	}
	if (a === null) {
		return true;
	}
	const aEntries: [string, any][] = Object.entries(a);
	return aEntries.length === Object.keys(b).length && aEntries.every( ([key, value]: [string, any]): boolean => (b[key] === value) );
};

/*
 *	Only use for objects or arrays.
 */
const referenceEquals = (a: any, b: any) => {
	if (a === b) {
		return true;
	}
	return !(!a || !b); // one null but the other isn't
};

const sleep = (ms: number): Promise<void> => new Promise<void>( (resolve: VoidFunction) => setTimeout(resolve, ms));

export {
	arrayEquals,
	buildClassName,
	buildClassNames,
	cancelEvent,
	chooseList,
	maskObject,
	noop,
	objectEquals,
	sleep
};