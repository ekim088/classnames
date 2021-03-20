import { ClassListArray, ClassValue } from '../classNames';

/**
 * Reduces a list of arguments into a single class attribute value. Filters out
 * duplicate class names.
 *
 * @param classNameArgs A list of arguments to reduce.
 * @returns A class attribute value without duplicates.
 */
export default function classNamesDedupe(
	...classNameArgs: ClassValue[]
): string {
	const classList: ClassListArray = [];
	let dictionary: Map<string, unknown> = new Map();

	/**
	 * Parses and pushes an argument to the class dictionary.
	 *
	 * @param arg The argument to parse.
	 */
	const parseArg = (arg: ClassValue): void => {
		if (!arg) return;

		if (Array.isArray(arg)) {
			if (arg.length > 0) dictionary.set(classNamesDedupe(...arg), true);
		} else if (typeof arg === 'object') {
			dictionary = new Map([
				...dictionary,
				...new Map(Object.entries(arg))
			]);
		} else {
			dictionary.set(`${arg}`, true);
		}
	};

	classNameArgs.forEach(parseArg);
	dictionary.forEach((value, key) => {
		const trimmedKey = key.trim();
		if (value && trimmedKey) classList.push(trimmedKey);
	});
	return classList.join(' ');
}
