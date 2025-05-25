// import benchmarking modules
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

// import functions to test
const classNames = require('./lib').default;
const classNamesDedupe = require('./lib/dedupe').default;
const classNamesCached = require('./lib/cached').default;
const classNamesActual = require('classnames');
const classNamesDedupeActual = require('classnames/dedupe');
const testArgs = [
	'foo',
	false,
	{ bar: true, duck: false },
	'baz',
	{ quux: true },
	['foo', false, { bar: true, duck: false }, 'baz', { quux: true }]
];

suite
	// add tests
	.add('@ekim088/classnames', function () {
		classNames(...testArgs);
	})
	.add('classnames', function () {
		classNamesActual(...testArgs);
	})
	.add('@ekim088/classnames/dedupe', function () {
		classNamesDedupe(...testArgs);
	})
	.add('classnames/dedupe', function () {
		classNamesDedupeActual(...testArgs);
	})
	.add('@ekim088/classnames/cached', function () {
		classNamesCached(...testArgs);
	})
	// add listeners
	.on('cycle', function (event) {
		console.log(String(event.target));
	})
	.on('complete', function () {
		console.log(`\nFastest: ${this.filter('fastest').map('name')}`);
	})
	// run async
	.run({ async: true });
