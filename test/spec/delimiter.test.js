var assert = require('assert');

var prepend = require('../..');

describe('delimiter', function () {
  describe(':', function () {
    var DELIMITER = ':';

    it('prepends - exists at front', function () {
      var envPaths = ['install/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, envPath);
    });

    it('prepends - removes extra', function () {
      var envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('prepends - removes extras', function () {
      var envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path', 'install/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(6, 1);
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('adds missing no entries', function () {
      var envPaths = ['other/path', 'another/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, 'install/path' + DELIMITER + envPaths.join(DELIMITER));
    });

    it('adds missing and removes middle', function () {
      var envPaths = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(2, 1);
      assert.equal(path, 'install/path' + DELIMITER + envPaths.join(DELIMITER));
    });
  });

  describe(';', function () {
    var DELIMITER = ';';

    it('prepends - exists at front', function () {
      var envPaths = ['install/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, envPath);
    });

    it('prepends - removes extra', function () {
      var envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('prepends - removes extras', function () {
      var envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path', 'install/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(6, 1);
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('adds missing no entries', function () {
      var envPaths = ['other/path', 'another/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, 'install/path' + DELIMITER + envPaths.join(DELIMITER));
    });

    it('adds missing and removes middle', function () {
      var envPaths = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      var envPath = envPaths.join(DELIMITER);

      var path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(2, 1);
      assert.equal(path, 'install/path' + DELIMITER + envPaths.join(DELIMITER));
    });
  });
});
