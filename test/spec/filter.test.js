var assert = require('assert');

var prepend = require('../..');
var DELIMITER = process.platform === 'win32' ? ';' : ':';

describe('filter', function () {
  it('prepends - exists at front', function () {
    var envPaths = ['install/path', 'other/path', 'another/path'];
    var envPath = envPaths.join(DELIMITER);

    var changes = prepend(envPath, 'install/path', {
      changes: true,
      filter: function (path) {
        return path !== 'other/path';
      },
    });
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 1);
    envPaths.splice(1, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });

  it('prepends - removes extra', function () {
    var envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    var envPath = envPaths.join(DELIMITER);

    var changes = prepend(envPath, 'install/path', {
      changes: true,
      filter: function (path) {
        return path !== 'other/path';
      },
    });
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 3);
    envPaths.splice(3, 2);
    envPaths.splice(1, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });
});
