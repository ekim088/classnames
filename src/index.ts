export type ClassDictionary = Record<string, unknown>;

export type ClassValue =
	| string
	| number
	| boolean
	| undefined
	| null
	| { toString?: () => string }
	| ClassDictionary
	| ClassValue[];

/**
 * Parses a class value from a single mixed-type argument.
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
			const objPrototype = Object.prototype;

			if (
				objPrototype.toString !== arg.toString &&
				typeof arg.toString === 'function'
			) {
				classToAppend = arg.toString();
			} else {
				// using `for...in` over `Object.keys()` and string append over
				// template literals for improved performance
				// eslint-disable-next-line no-restricted-syntax
				for (const key in arg) {
					if (
						objPrototype.hasOwnProperty.call(arg, key) &&
						arg[key as keyof typeof arg]
					) {
						classToAppend += (classToAppend ? ' ' : '') + key;
					}
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
 * @param {...*} classNameArgs A list of mixed-type arguments to reduce.
 * @returns {string} A class attribute value.
 */
export default function classNames(...classNameArgs: ClassValue[]): string {
	return classNameArgs.reduce<string>((classAttr, arg) => {
		const parsed = parseClassFromArg(arg);
		return classAttr + (parsed ? (classAttr ? ' ' : '') + parsed : '');
	}, '');
}
