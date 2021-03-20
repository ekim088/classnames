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
		});

		it('should recursively flatten arrays', () => {
			const arr = ['b', { c: true, d: false }];
			expect(classNames('a', arr)).toBe('a b c');
		});

		it('should support computed keys', () => {
			const buttonType = 'primary';
			expect(classNames({ [`btn-${buttonType}`]: true })).toBe(
				'btn-primary'
			);
		});

		it('should clean up whitespace within the value', () => {
			expect(classNames('foo', ' ', ' bar ')).toBe('foo bar');
			expect(
				classNames({
					foo: true,
					' a-b ': 1,
					bar: null,
					1: 2,
					' c-d ': 3
				})
			).toBe('1 foo a-b c-d');
		});
	});

	describe('dedupe', () => {
		it('should filter duplicate classes', () => {
			expect(classNames('foo', 'foo', 'bar')).toBe('foo bar');
		});

		it('should honor the most recent value of a duplicate class name', () => {
			expect(classNames('foo', { foo: false, bar: true })).toBe('bar');
		});
	});
});
