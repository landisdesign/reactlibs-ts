import React from 'react';

import { StringMap } from '../types';

interface BinaryPredicate<T> {
	(a: T, b: T): boolean;
}

interface UnaryFunction<T> {
	(a: T): void;
}

interface VoidFunction {
	(): void;
}

export function arraysEqual<T> (a: T[], b: T[], entryValidator: BinaryPredicate<T> = ((aField, bField) => aField === bField)): boolean {
	if (a === null || b === null) {
		return a === b;
	}
	if (a.length !== b.length) {
		return false;
	}
	return a.every((aField, index) => entryValidator(aField, b[index]));
};

const buildClassName = (styles: StringMap):UnaryFunction<string> => name => styles[name];

const buildClassNames = (styles: StringMap, classNames: string[]):string => classNames.map(buildClassName(styles)).join(' ');

const cancelEvent = (e: Event) => {
	e.preventDefault();
	e.stopPropagation();
};

const chooseList = (condition: boolean, trueList: string[], falseList: string[], additionalList: string[]): string[] => {
	const list = condition ? trueList : falseList;
	return additionalList ? list.concat(additionalList) : list;
};

function maskObject<T>(object: T, mask: Partial<T>): Partial<T> {
	const maskKeys: (keyof T)[] = Object.keys(mask) as (keyof T)[];
	return maskKeys.reduce((acc: Partial<T>, key: keyof T): Partial<T> => {
		if (key in object)
			acc[key] = object[key];
		return acc;
	}, {} as Partial<T>);
}

export const noop = ():void =>{};

export function objectsEqual<T>(a: T, b: T) {
	if (a === null || b === null) {
		return a === b;
	}
	const aKeys: (keyof T)[] = Object.keys(a) as (keyof T)[];
	return aKeys.length === Object.keys(b).length && aKeys.every(k => a[k] === b[k]);
};

export function shallowPropsChanged<T>(priorProps: T, nextProps: T, keys: string[]): boolean {
	const matchedKeys: (keyof T)[] = keys as (keyof T)[];
	return matchedKeys.some(k => priorProps[k] !== nextProps[k]);
}

export function nodesEqual(a: React.ReactNode, b: React.ReactNode): boolean {
	if (a === b) return true;

	const aAny: any = a as any;
	const bAny: any = b as any;
	if ('displayName' in aAny) { // react component
		if (aAny.displayName !== bAny.displayName) return false;
		if (('key' in aAny) && aAny.key === bAny.key) return true;
	}
	else if ('type' in aAny) { // html element
		if ('displayName' in bAny) return false;
		if ('type' in bAny) {
			if (aAny.type !== bAny.type) return false;
			const aNodeList = React.Children.toArray(aAny);
			const bNodeList = React.Children.toArray(aAny);
			return arraysEqual(aNodeList, bNodeList, nodesEqual);
		}
	}
	return !(('displayName' in bAny) || ('type' in bAny)); // b is not a primitve
}

export function childrenChanged(priorChildrenNodes: React.ReactNode = null, nextChildrenNodes: React.ReactNode = null): boolean {
	if (priorChildrenNodes === null || nextChildrenNodes === null) {
		return priorChildrenNodes !== nextChildrenNodes;
	}
	const priorChildren = React.Children.map(priorChildrenNodes, node => node);
	const nextChildren = React.Children.map(nextChildrenNodes, node => node);
	return !arraysEqual(priorChildren, nextChildren, nodesEqual);
}

export const sleep = (ms: number): Promise<void> => new Promise<void>( (resolve: VoidFunction) => setTimeout(resolve, ms));
