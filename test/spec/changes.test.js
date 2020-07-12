var assert = require('assert');

var prepend = require('../..');
var DELIMITER = process.platform === 'win32' ? ';' : ':';

describe('changes', function () {
  it('prepends - exists at front', function () {
    var envPaths = ['install/path', 'other/path', 'another/path'];
    var envPath = envPaths.join(DELIMITER);

    var changes = prepend(envPath, 'install/path', { changes: true });
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 0);
    assert.equal(changes.path, envPath);
  });

  it('prepends - removes extra', function () {
    var envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    var envPath = envPaths.join(DELIMITER);

    var changes = prepend(envPath, 'install/path', { changes: true });
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 1);
    envPaths.splice(3, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });

  it('prepends - removes extras', function () {
    var envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path', 'install/path'];
    var envPath = envPaths.join(DELIMITER);

    var changes = prepend(envPath, 'install/path', { changes: true });
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 2);
    envPaths.splice(6, 1);
    envPaths.splice(3, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });

  it('adds missing no entries', function () {
    var envPaths = ['other/path', 'another/path', 'other/path', 'another/path'];
    var envPath = envPaths.join(DELIMITER);

    var changes = prepend(envPath, 'install/path', { changes: true });
    assert.equal(changes.added.length, 1);
    assert.equal(changes.removed.length, 0);
    assert.equal(changes.path, 'install/path' + DELIMITER + envPaths.join(DELIMITER));
  });

  it('adds missing and removes middle', function () {
    var envPaths = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    var envPath = envPaths.join(DELIMITER);

    var changes = prepend(envPath, 'install/path', { changes: true });
    assert.equal(changes.added.length, 1);
    assert.equal(changes.removed.length, 1);
    envPaths.splice(2, 1);
    assert.equal(changes.path, 'install/path' + DELIMITER + envPaths.join(DELIMITER));
  });
});
