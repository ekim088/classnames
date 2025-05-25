# classnames

Reduces mixed-type arguments into a single HTML class attribute.

Actually just a replica of [classnames](https://www.npmjs.com/package/classnames) made for fun.

## Installation

Install via [npm](https://www.npmjs.com/package/@ekim088/classnames):

```
npm i @ekim088/classnames --save
```

## Usage

Usage is similar to [classnames](https://www.npmjs.com/package/classnames), though only available as a module.

### `classNames(...args)`

Reduces a list of arguments into a single class attribute value.

**Returns**: `string` - A class attribute value.

| Param   | Type   | Description                               |
| ------- | ------ | ----------------------------------------- |
| ...args | `...*` | A list of mixed-type arguments to reduce. |

```
import classNames from '@ekim088/classnames';

classNames('foo', { bar: true }); // 'foo bar'
```

A less performant _dedupe_ version can also be imported from `@ekim088/classnames/dedupe`.
There is also a _cached_ variant that will cache derived class names by object reference from `@ekim088/classnames/cached`.

## Current Node.js Benchmark Results

```
@ekim088/classnames x 3,525,180 ops/sec ±3.84% (80 runs sampled)
classnames x 4,003,900 ops/sec ±4.69% (84 runs sampled)
@ekim088/classnames/dedupe x 1,675,529 ops/sec ±3.81% (89 runs sampled)
classnames/dedupe x 1,119,257 ops/sec ±6.08% (76 runs sampled)
@ekim088/classnames/cached x 6,829,533 ops/sec ±5.09% (83 runs sampled)
```

Benchmarks run in [Benchmark.js](https://benchmarkjs.com/).
