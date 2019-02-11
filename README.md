# Decorator Memoize One

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Simple decorator for caching the result of a function based on the most recent arguments.

## Installation

```sh
npm install decorator-memoize-one --save
```

## Usage

```js
import { memoizeOne } from "decorator-memoize-one";
import { pool } from "./db";

class User {
  @memoizeOne
  friends(pool) {
    return pool.execute("SELECT * FROM users WHERE ...");
  }
}

const user = new User();
const friends = await user.friends(pool);
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/decorator-memoize-one.svg?style=flat
[npm-url]: https://npmjs.org/package/decorator-memoize-one
[downloads-image]: https://img.shields.io/npm/dm/decorator-memoize-one.svg?style=flat
[downloads-url]: https://npmjs.org/package/decorator-memoize-one
[travis-image]: https://img.shields.io/travis/blakeembrey/decorator-memoize-one.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/decorator-memoize-one
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/decorator-memoize-one.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/decorator-memoize-one?branch=master
