import { ClassValue } from '.';

/**
 * Reduces a list of arguments into a single class attribute value. Filters out
 * duplicate class names.
 *
 * @param {...*} classNameArgs A list of arguments to reduce.
 * @returns {string} A class attribute value without duplicates.
 * @ignore
 */
export default function classNamesDedupe(
	...classNameArgs: ClassValue[]
): string {
	// an array of classes that may end up in the final attribute value;
	// maintains the names' order of first appearance in the argument list
	const classList: string[] = [];

	// a map of class names and their latest truthy/falsey value
	const dictionary: Record<string, unknown> = {};

	/**
	 * Adds a class name to the list and updates its value in the dictionary.
	 *
	 * @param {string | number | boolean} className The name to update.
	 * @param {*} value The truthy/falsey value of the class name.
	 * @ignore
	 */
	const updateClassNames = (
		className: string | number | true,
		value: unknown
	) => {
		const keyStr = '' + className;
		dictionary[keyStr] = value;

		if (classList.indexOf(keyStr) === -1) {
			classList.push(keyStr);
		}
	};

	/**
	 * Parses and pushes an argument to the class list.
	 *
	 * @param {*} arg The argument to parse.
	 * @ignore
	 */
	const parseArg = (arg: ClassValue): void => {
		if (arg) {
			if (Array.isArray(arg)) {
				if (arg.length) {
					arg.forEach(parseArg);
				}
			} else if (typeof arg === 'object') {
				const objPrototype = Object.prototype;

				if (objPrototype.toString !== arg.toString) {
					updateClassNames(arg.toString(), true);
				} else {
					// eslint-disable-next-line no-restricted-syntax
					for (const key in arg) {
						if (objPrototype.hasOwnProperty.call(arg, key)) {
							updateClassNames(key, arg[key]);
						}
					}
				}
			} else {
				updateClassNames(arg, true);
			}
		}
	};

	// parse each argument for truthy/falsey values to build the potential
	// class list and dictionary
	for (let i = 0; i < classNameArgs.length; i++) {
		parseArg(classNameArgs[i]);
	}

	// reduce the class list to the attribute value using only truthy keys
	// from the dictionary
	return classList.reduce<string>(
		(classAttr, name) =>
			classAttr + (dictionary[name] ? (classAttr ? ' ' : '') + name : ''),
		''
	);
}
