# classnames

[![npm version](https://img.shields.io/npm/v/@ekim088/classnames)](https://www.npmjs.com/package/@ekim088/classnames)
[![CI](https://github.com/ekim088/classnames/actions/workflows/node.js.yml/badge.svg)](https://github.com/ekim088/classnames/actions/workflows/node.js.yml)

Reduces mixed-type arguments into a single HTML class attribute. A replica of
[classnames](https://www.npmjs.com/package/classnames) made for fun.

## Installation

Install via npm or yarn:

```sh
npm install @ekim088/classnames
# or
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
@ekim088/classnames        x 3,525,180 ops/sec ±3.84% (80 runs sampled)
classnames                 x 4,003,900 ops/sec ±4.69% (84 runs sampled)
@ekim088/classnames/dedupe x 1,675,529 ops/sec ±3.81% (89 runs sampled)
classnames/dedupe          x 1,119,257 ops/sec ±6.08% (76 runs sampled)
@ekim088/classnames/cached x 6,829,533 ops/sec ±5.09% (83 runs sampled)
```

## License

[MIT](./LICENSE)
