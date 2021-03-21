import classNamesActual from 'classnames/dedupe';
import classNames from '../dedupe';
import { runBaseSuite, runCustomBaseSuite, runDedupeSuite } from './suites';

describe('classNames/dedupe', () => {
	runBaseSuite(classNames, '@ekim088/classnames/dedupe (base)');
	runCustomBaseSuite(classNames, '@ekim088/classnames/dedupe (custom)');
	runDedupeSuite(classNamesActual, 'classnames/dedupe');
	runDedupeSuite(classNames, '@ekim088/classnames/dedupe');
});
