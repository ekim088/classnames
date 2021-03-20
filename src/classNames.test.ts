import classNames from './classNames';

describe('classNames', () => {
	it('should handle mixed arguments', () => {
		expect(classNames('foo', 'bar')).toBe('foo bar');
		expect(classNames('foo', { bar: true })).toBe('foo bar');
		expect(classNames({ 'foo-bar': true })).toBe('foo-bar');
		expect(classNames({ 'foo-bar': false })).toBe('');
		expect(classNames({ foo: true }, { bar: true })).toBe('foo bar');
		expect(classNames({ foo: true, bar: true })).toBe('foo bar');
		expect(
			classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })
		).toBe('foo bar baz quux');
		expect(
			classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')
		).toBe('bar 1');
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
		expect(classNames({ [`btn-${buttonType}`]: true })).toBe('btn-primary');
	});
});
