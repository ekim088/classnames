import classNames, { ClassListArray, parseArg } from '../classNames';

const classNamesDedupe: typeof classNames = (...classNameArgs) => {
	const classList: ClassListArray = [];
	classNameArgs.forEach(arg => parseArg(arg, classList));
	return Array.from(new Set(classList)).join(' ');
};

export default classNamesDedupe;
