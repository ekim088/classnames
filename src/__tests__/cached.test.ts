import classNames from '../cached';
import { runBaseSuite, runCustomBaseSuite } from './suites';

describe('classNames/cached', () => {
	runBaseSuite(classNames, '@ekim088/classnames/cached (base)');
	runCustomBaseSuite(classNames, '@ekim088/classnames/cached (custom)');
});
