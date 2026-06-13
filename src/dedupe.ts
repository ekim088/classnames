const { hasOwnProperty, toString } = Object.prototype;

/**
 * Reduces a list of arguments into a single class attribute value. Filters out
 * duplicate class names.
 * @param classNameArgs A list of arguments to reduce.
 * @returns A class attribute value without duplicates.
 * @ignore
 */
export default function classNamesDedupe(...classNameArgs: unknown[]): string;
export default function classNamesDedupe(): string {
	// an array of classes that may end up in the final attribute value;
	// maintains the names' order of first appearance in the argument list
	const classList: string[] = [];

	// a map of class names to their latest truthy/falsey value
	const dictionary: Record<string, unknown> = {};

	/**
	 * Adds a class name to the list and updates its value in the dictionary.
	 * @param className The name to update.
	 * @param value The truthy/falsey value of the class name.
	 * @ignore
	 */
	const updateClassNames = (className: string | true, value: unknown) => {
		const keyStr =
			typeof className === 'string' ? className : '' + className;

		if (!hasOwnProperty.call(dictionary, keyStr)) {
			classList.push(keyStr);
		}

		dictionary[keyStr] = value;
	};

	/**
	 * Parses and pushes an argument to the class list.
	 * @param arg The argument to parse.
	 * @ignore
	 */
	const parseArg = (arg: unknown): void => {
		if (!arg) {
			return;
		}

		if (typeof arg === 'string') {
			updateClassNames(arg, true);
		} else if (Array.isArray(arg)) {
			arg.forEach(parseArg);
		} else if (typeof arg === 'object') {
			if (
				toString !== arg.toString &&
				typeof arg.toString === 'function'
			) {
				updateClassNames(arg.toString(), true);
			} else {
				for (const key in arg) {
					if (hasOwnProperty.call(arg, key)) {
						updateClassNames(key, arg[key as keyof typeof arg]);
					}
				}
			}
		}
	};

	// parse each argument for truthy/falsey values to build the potential
	// class list and dictionary
	for (let i = 0; i < arguments.length; i++) {
		parseArg(arguments[i]);
	}

	// build the attribute value from the class names whose latest value is
	// truthy, in their order of first appearance
	let classAttr = '';

	for (let i = 0; i < classList.length; i++) {
		const name = classList[i];

		if (dictionary[name]) {
			classAttr += (classAttr ? ' ' : '') + name;
		}
	}

	return classAttr;
}
