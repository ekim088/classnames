import classNamesActual from 'classnames/dedupe';
import classNames from '../dedupe';
import { runBaseSuite, runDedupeSuite } from './suites';

describe('classNames/dedupe', () => {
	runBaseSuite(classNames, '@ekim088/classnames');
	runDedupeSuite(classNamesActual, 'classnames/dedupe');
	runDedupeSuite(classNames, '@ekim088/classnames/dedupe');
});
