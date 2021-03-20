export type ClassDictionary = Record<string, unknown>;

export type ClassListArray = (string | number | true)[];

export type ClassValue =
	| string
	| number
	| boolean
	| undefined
	| null
	| ClassDictionary
	| ClassValue[];

/**
 * Parses and pushes an argument to the class list.
 *
 * @param arg The argument to parse.
 * @param classList The class list array containing the final set of classes.
 */
export function parseArg(arg: ClassValue, classList: ClassListArray): void {
	if (!arg) return;

	if (Array.isArray(arg)) {
		arg.forEach(arg => parseArg(arg, classList));
	} else if (typeof arg === 'object') {
		Object.keys(arg).forEach(key => arg[key] && classList.push(key.trim()));
	} else if (typeof arg === 'string') {
		if (arg.trim()) classList.push(arg.trim());
	} else {
		classList.push(arg);
	}
}

/**
 * Reduces a list of arguments into a single class attribute value.
 *
 * @param classNameArgs A list of arguments to reduce.
 * @returns A class attribute value.
 */
export default function classNames(...classNameArgs: ClassValue[]): string {
	const classList: ClassListArray = [];
	classNameArgs.forEach(arg => parseArg(arg, classList));
	return classList.join(' ');
}
