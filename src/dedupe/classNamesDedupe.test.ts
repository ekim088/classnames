import classNamesDedupe from './index';

describe('classNamesDedupe', () => {
	it('should handle mixed arguments', () => {
		expect(classNamesDedupe('foo', 'bar')).toBe('foo bar');
		expect(classNamesDedupe('foo', { bar: true })).toBe('foo bar');
		expect(classNamesDedupe({ 'foo-bar': true })).toBe('foo-bar');
		expect(classNamesDedupe({ 'foo-bar': false })).toBe('');
		expect(classNamesDedupe({ foo: true }, { bar: true })).toBe('foo bar');
		expect(classNamesDedupe({ foo: true, bar: true })).toBe('foo bar');
		expect(
			classNamesDedupe('foo', { bar: true, duck: false }, 'baz', {
				quux: true
			})
		).toBe('foo bar baz quux');
		expect(
			classNamesDedupe(
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
		expect(classNamesDedupe('a', arr)).toBe('a b c');
	});

	it('should support computed keys', () => {
		const buttonType = 'primary';
		expect(classNamesDedupe({ [`btn-${buttonType}`]: true })).toBe(
			'btn-primary'
		);
	});

	it('should clean up whitespace within the value', () => {
		expect(classNamesDedupe('foo', ' ', ' bar ')).toBe('foo bar');
		expect(
			classNamesDedupe({
				foo: true,
				' a-b ': 1,
				bar: null,
				1: 2,
				' c-d ': 3
			})
		).toBe('1 foo a-b c-d');
	});

	it('should filter duplicate classes', () => {
		expect(classNamesDedupe('foo', 'foo', 'bar')).toBe('foo bar');
		// expect(classNamesDedupe('foo', { foo: false, bar: true })).toBe('bar');
	});
});
