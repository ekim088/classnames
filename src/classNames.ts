export type ClassDictionary = Record<string, unknown>;

export type ClassValue =
	| string
	| number
	| boolean
	| undefined
	| null
	| ClassDictionary
	| ClassValue[];

/**
 * Parses a class value from a single mixed-type argument.
 *
 * @param {*} arg The argument to parse.
 * @returns {string} The value to append to the class attribute value.
 * @ignore
 */
const parseClassFromArg = (arg: ClassValue): string => {
	let classToAppend = '';

	if (arg) {
		if (Array.isArray(arg)) {
			if (arg.length) {
				classToAppend = classNames(...arg);
			}
		} else if (typeof arg === 'object') {
			// using `for...in` over `Object.keys()` and string append over
			// template literals for improved performance
			// eslint-disable-next-line no-restricted-syntax
			for (const key in arg) {
				if (
					Object.prototype.hasOwnProperty.call(arg, key) &&
					arg[key]
				) {
					classToAppend += (classToAppend ? ' ' : '') + key;
				}
			}
		} else {
			classToAppend += arg;
		}
	}

	return classToAppend;
};

/**
 * Reduces a list of arguments into a single class attribute value.
 *
 * @param {...*} classNameArgs A list of mixed-type arguments to reduce.
 * @returns {string} A class attribute value.
 */
export default function classNames(...classNameArgs: ClassValue[]): string {
	let classAttr = '';

	for (let i = 0; i < classNameArgs.length; i++) {
		const parsed = parseClassFromArg(classNameArgs[i]);

		if (parsed) {
			classAttr += `${classAttr ? ' ' : ''}${parsed}`;
		}
	}

	return classAttr;
}
