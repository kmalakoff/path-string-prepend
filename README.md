# path-string-prepend

Prepends a path to a platform-specific delimited path string and removes every later entry whose string contains that path.

## Installation

```sh
npm install path-string-prepend
```

## Usage

```js
var assert = require('assert');
var prepend = require('path-string-prepend');

var delimiter = require('path').delimiter;
var envPath = ['other/path', 'install/path', 'another/path', 'install/path'].join(delimiter);
var result = prepend(envPath, 'install/path');

assert.equal(result, ['install/path', 'other/path', 'another/path'].join(delimiter));
console.log(result);
```

The default delimiter is `:` on POSIX and `;` on Windows. By default, an entry is removed when it contains the prepended path string. Pass `{ delimiter, filter }` to customize filtering, or `{ changes: true }` to receive `added`, `removed`, and `path` fields.

## License

MIT
