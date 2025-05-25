/**
 * A cache of objects to their derived class attribute values.
 */
const classCache = new WeakMap<object, string>();
const { hasOwnProperty, toString } = Object.prototype;

/**
 * Parses a class value from a single mixed-type argument.
 * @param {*} arg The argument to parse.
 * @returns {string} The value to append to the class attribute value.
 * @ignore
 */
const parseClassFromArg = (arg: unknown): string => {
	if (!arg) {
		return '';
	}

	if (typeof arg === 'string') {
		return arg;
	}

	let classToAppend: string = classCache.get(arg) || '';
	const isArray = Array.isArray(arg);
	const isObject = typeof arg === 'object';

	if (isArray || isObject) {
		if (classToAppend) {
			return classToAppend;
		}

		if (isArray) {
			classToAppend = classNames.apply(null, arg);
		} else if (isObject) {
			if (
				toString !== arg.toString &&
				typeof arg.toString === 'function'
			) {
				classToAppend = arg.toString();
			} else {
				for (const key in arg) {
					if (
						hasOwnProperty.call(arg, key) &&
						arg[key as keyof typeof arg]
					) {
						classToAppend += (classToAppend ? ' ' : '') + key;
					}
				}
			}
		}

		if (classToAppend) {
			classCache.set(arg, classToAppend);
		}
	}

	return classToAppend;
};

/**
 * Reduces a list of arguments into a single class attribute value. Classes
 * derived from objects will be cached by reference for improved performance.
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
