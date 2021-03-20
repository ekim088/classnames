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
 * Reduces a list of arguments into a single class attribute value.
 *
 * @param {...*} classNameArgs A list of arguments to reduce.
 * @returns {string} A class attribute value.
 */
export default function classNames(...classNameArgs: ClassValue[]): string {
	const classList: ClassListArray = [];

	/**
	 * Parses and pushes an argument to the class list.
	 *
	 * @param {*} arg The argument to parse.
	 * @ignore
	 */
	const parseArg = (arg: ClassValue): void => {
		if (!arg) return;

		if (Array.isArray(arg)) {
			if (arg.length > 0) classList.push(classNames(...arg));
		} else if (typeof arg === 'object') {
			Object.keys(arg).forEach(
				key => arg[key] && classList.push(key.trim())
			);
		} else if (typeof arg === 'string') {
			const trimmed = arg.trim();
			if (trimmed) classList.push(trimmed);
		} else {
			classList.push(arg);
		}
	};

	classNameArgs.forEach(parseArg);
	return classList.join(' ');
}
