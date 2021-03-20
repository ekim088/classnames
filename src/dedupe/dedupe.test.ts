import classNamesActual from 'classnames/dedupe';
import classNames from './index';

describe('classNames/dedupe', () => {
	describe('base tests', () => {
		it('should handle mixed arguments', () => {
			expect(classNames('foo', 'bar')).toBe('foo bar');
			expect(classNames('foo', { bar: true })).toBe('foo bar');
			expect(classNames({ 'foo-bar': true })).toBe('foo-bar');
			expect(classNames({ 'foo-bar': false })).toBe('');
			expect(classNames({ foo: true }, { bar: true })).toBe('foo bar');
			expect(classNames({ foo: true, bar: true })).toBe('foo bar');
			expect(
				classNames('foo', { bar: true, duck: false }, 'baz', {
					quux: true
				})
			).toBe('foo bar baz quux');
			expect(
				classNames(
					null,
					false,
					'bar',
					undefined,
					0,
					1,
					{ baz: null },
					''
				)
			).toBe('bar 1');
			expect(
				classNames(
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
			expect(classNames('a', ['b', { c: true, d: false }])).toBe('a b c');
			expect(
				classNames('a', [
					'b',
					{ c: true, d: false },
					['e', { f: true, g: false }, ['h']]
				])
			).toBe('a b c e f h');
		});

		it('should support computed keys', () => {
			const buttonType = 'primary';
			expect(classNames({ [`btn-${buttonType}`]: true })).toBe(
				'btn-primary'
			);
		});
	});

	describe('dedupe', () => {
		it('should filter duplicate classes', () => {
			expect(classNames('foo', 'foo', 'bar')).toBe('foo bar');
		});

		it('should honor the most recent value of a duplicate class name', () => {
			expect(classNames('foo', { foo: false, bar: true })).toBe('bar');
		});

		it('should maintain the original order of the class names based on first appearance', () => {
			expect(
				classNamesActual(
					'foo',
					'bar',
					'foo',
					{ foo: false },
					'bar',
					'foo'
				)
			).toBe('foo bar');
			expect(
				classNames('foo', 'bar', 'foo', { foo: false }, 'bar', 'foo')
			).toBe('foo bar');
		});
	});
});
