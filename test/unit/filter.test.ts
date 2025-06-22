import assert from 'assert';

// @ts-ignore
import prepend, { type PrependResult } from 'path-string-prepend';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const DELIMITER = isWindows ? ';' : ':';

describe('filter', () => {
  it('prepends - exists at front', () => {
    const envPaths = ['install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const changes = prepend(envPath, 'install/path', {
      changes: true,
      filter: (path) => path !== 'other/path',
    }) as PrependResult;
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 1);
    envPaths.splice(1, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });

  it('prepends - removes extra', () => {
    const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const changes = prepend(envPath, 'install/path', {
      changes: true,
      filter: (path) => path !== 'other/path',
    }) as PrependResult;
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 3);
    envPaths.splice(3, 2);
    envPaths.splice(1, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });
});
