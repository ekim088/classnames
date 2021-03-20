import classNamesActual from 'classnames';
import classNames from '..';
import { runBaseSuite } from './suites';

describe('classNames', () => {
	runBaseSuite(classNamesActual, 'classnames');
	runBaseSuite(classNames, '@ekim088/classnames');
});
