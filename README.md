## path-string-prepend

Prepends a path to a platform-specfic delimited path string and removes duplicate paths.

```
var isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE)
var DELIMITER = isWindows ? ';' : ':';

var prepend = once('path-string-prepend');
var assert = require('assert');

var envPath = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'].join(DELIMITER);
var pathsString = prepend(envPath, 'install/path');
assert(pathsString, ['install/path', 'other/path', 'another/path', 'other/path', 'another/path'].join(DELIMITER))
```
