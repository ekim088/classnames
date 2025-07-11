/* eslint import/prefer-default-export: "off", jest/no-export: "off" */
import classNamesActual from 'classnames';
import classNames from '../index';

type TestFunction = typeof classNames | typeof classNamesActual;

/**
 * Executes all default tests for `className`.
 * @param {Function} fxn The function to test.
 * @param {string} [name] The name of the test block.
 */
export const runBaseSuite = (fxn: TestFunction, name = 'base tests'): void => {
	describe(`${name}`, () => {
		it('should handle mixed arguments', () => {
			expect(fxn('foo', 'bar')).toBe('foo bar');
			expect(fxn('foo', { bar: true })).toBe('foo bar');
			expect(fxn({ 'foo-bar': true })).toBe('foo-bar');
			expect(fxn({ 'foo-bar': false })).toBe('');
			expect(fxn({ foo: true }, { bar: true })).toBe('foo bar');
			expect(fxn({ foo: true, bar: true })).toBe('foo bar');
			expect(
				fxn('foo', { bar: true, duck: false }, 'baz', {
					quux: true
				})
			).toBe('foo bar baz quux');
			expect(
				fxn(null, false, 'bar', undefined, 0, { baz: null }, '')
			).toBe('bar');
			expect(
				fxn(
					'foo',
					null,
					'',
					{
						'a-b': 'asdf',
						'c-d--e': 0,
						'f__g-h': 1
					},
					'bar'
				)
			).toBe('foo a-b f__g-h bar');
		});

		it('should recursively flatten arrays', () => {
			expect(fxn('a', ['b', { c: true, d: false }])).toBe('a b c');
			expect(
				fxn('a', [
					'b',
					{ c: true, d: false },
					['e', { f: true, g: false }, ['h']]
				])
			).toBe('a b c e f h');
		});

		it('should support computed keys', () => {
			const buttonType = 'primary';
			expect(fxn({ [`btn-${buttonType}`]: true })).toBe('btn-primary');
		});
	});
};

/**
 * Executes all default tests for `className` that are specific to the
 * `ekim088/classnames` package.
 * @param {Function} fxn The function to test.
 * @param {string} [name] The name of the test block.
 */
export const runCustomBaseSuite = (
	fxn: TestFunction,
	name = 'custom base tests'
): void => {
	describe(`${name}`, () => {
		it('should support objects with a custom toString method', () => {
			class MockObj {
				val: string;

				constructor(val: string) {
					this.val = val;
				}

				toString() {
					return `mockToString ${this.val}`;
				}
			}

			expect(fxn('foo', new MockObj('baz'), { bar: true })).toBe(
				'foo mockToString baz bar'
			);
		});

		it('should only call the toString property if it is a function', () => {
			expect(
				fxn(
					'foo',
					{ toString: null },
					{ toString: true },
					{ bar: true }
				)
			).toBe('foo toString bar');
		});

		it('should ignore number types', () => {
			// object keys converted to strings
			expect(fxn(0, 1, [2, 3], { 4: true, 5: true }, Infinity, NaN)).toBe(
				'4 5'
			);
		});
	});
};

/**
 * Executes all dedupe tests for `className`.
 * @param {Function} fxn The function to test.
 * @param {string} [name] The name of the test block.
 */
export const runDedupeSuite = (
	fxn: TestFunction,
	name = 'dedupe tests'
): void => {
	describe(`${name}`, () => {
		it('should filter duplicate classes', () => {
			expect(fxn('foo', 'foo', 'bar')).toBe('foo bar');
		});

		it('should honor the most recent value of a duplicate class name', () => {
			expect(fxn('foo', { foo: false, bar: true })).toBe('bar');
		});

		it('should maintain the original order of the class names based on first appearance', () => {
			expect(fxn('foo', 'bar', 'foo', { foo: false }, 'bar', 'foo')).toBe(
				'foo bar'
			);
		});
	});
};
