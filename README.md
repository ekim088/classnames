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

## Current Node.js Benchmark Results

```
@ekim088/classnames x 6,887,516 ops/sec ±1.51% (89 runs sampled)
classnames x 5,235,022 ops/sec ±1.65% (86 runs sampled)
@ekim088/classnames/dedupe x 3,054,471 ops/sec ±1.17% (87 runs sampled)
classnames/dedupe x 2,106,819 ops/sec ±1.39% (87 runs sampled)
```

Benchmarks run in [Benchmark.js](https://benchmarkjs.com/).
