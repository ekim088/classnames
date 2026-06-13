# classnames

[![npm version](https://img.shields.io/npm/v/@ekim088/classnames)](https://www.npmjs.com/package/@ekim088/classnames)
[![CI](https://github.com/ekim088/classnames/actions/workflows/node.js.yml/badge.svg)](https://github.com/ekim088/classnames/actions/workflows/node.js.yml)

Reduces mixed-type arguments into a single HTML class attribute. A replica of
[classnames](https://www.npmjs.com/package/classnames) made for fun.

## Installation

Install via npm:

```sh
npm install @ekim088/classnames
```

or yarn:

```sh
yarn add @ekim088/classnames
```

This package ships both ESM and CommonJS builds.

## Usage

### `classNames(...args)`

Reduces a list of mixed-type arguments into a single class attribute value.

```js
import classNames from '@ekim088/classnames';

classNames('foo', { bar: true }); // 'foo bar'
```

Two variants are available as subpath imports:

- `@ekim088/classnames/dedupe` - removes duplicate class names (less performant).
- `@ekim088/classnames/cached` - caches derived class names by object reference.

## Benchmarks

Run with [Benchmark.js](https://benchmarkjs.com/):

```
@ekim088/classnames        x 4,101,263 ops/sec ±2.61% (91 runs sampled)
classnames                 x 4,234,935 ops/sec ±2.70% (88 runs sampled)
@ekim088/classnames/dedupe x 1,490,623 ops/sec ±2.90% (79 runs sampled)
classnames/dedupe          x 1,292,126 ops/sec ±3.80% (87 runs sampled)
@ekim088/classnames/cached x 7,323,099 ops/sec ±1.35% (89 runs sampled)
```

## License

[MIT](./LICENSE)
