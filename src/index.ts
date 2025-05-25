const { hasOwnProperty, toString } = Object.prototype;

/**
 * Parses a class value from a single mixed-type argument.
 * @param {*} arg The argument to parse.
 * @returns {string} The value to append to the class attribute value.
 * @ignore
 */
export const parseClassFromArg = (arg: unknown): string => {
	let classToAppend = '';

	if (!arg) {
		return classToAppend;
	}

	if (typeof arg === 'string') {
		return arg;
	}

	if (Array.isArray(arg)) {
		return classNames.apply(null, arg);
	}

	if (typeof arg === 'object') {
		if (toString !== arg.toString && typeof arg.toString === 'function') {
			return arg.toString();
		}

		// using `for...in` over `Object.keys()` and string append over
		// template literals for improved performance
		for (const key in arg) {
			if (hasOwnProperty.call(arg, key) && arg[key as keyof typeof arg]) {
				classToAppend += (classToAppend ? ' ' : '') + key;
			}
		}
	}

	return classToAppend;
};

/**
 * Reduces a list of arguments into a single class attribute value.
 * @param {...*} classNameArgs A list of mixed-type arguments to reduce.
 * @returns {string} A class attribute value.
 */
export default function classNames(...classNameArgs: unknown[]): string;
export default function classNames(): string {
	let classAttr = '';

	for (let i = 0; i < arguments.length; i++) {
		const parsed = parseClassFromArg(arguments[i]);

		if (parsed) {
			classAttr = classAttr ? classAttr + ' ' + parsed : parsed;
		}
	}

	return classAttr;
}
