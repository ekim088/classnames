import classNamesActual from 'classnames';
import classNames from '..';
import { runBaseSuite, runCustomBaseSuite } from './suites';

describe('classNames', () => {
	runBaseSuite(classNamesActual, 'classnames');
	runBaseSuite(classNames, '@ekim088/classnames');
	runCustomBaseSuite(classNames, '@ekim088/classnames (custom)');
});
