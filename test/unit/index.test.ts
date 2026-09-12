import assert from 'assert';

import prepend, { type PrependResult } from 'path-string-prepend';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE ?? '');
const DELIMITER = isWindows ? ';' : ':';

describe('raw', () => {
  it('prepends - exists at front', () => {
    const envPaths = ['install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const path = prepend(envPath, 'install/path');
    assert.equal(path, envPath);
  });

  it('prepends - removes extra', () => {
    const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const path = prepend(envPath, 'install/path');
    envPaths.splice(3, 1);
    assert.equal(path, envPaths.join(DELIMITER));
  });

  it('prepends - removes extras', () => {
    const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path', 'install/path'];
    const envPath = envPaths.join(DELIMITER);

    const path = prepend(envPath, 'install/path');
    envPaths.splice(6, 1);
    envPaths.splice(3, 1);
    assert.equal(path, envPaths.join(DELIMITER));
  });

  it('adds missing no entries', () => {
    const envPaths = ['other/path', 'another/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const path = prepend(envPath, 'install/path');
    assert.equal(path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
  });

  it('adds missing and removes middle', () => {
    const envPaths = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const path = prepend(envPath, 'install/path');
    envPaths.splice(2, 1);
    assert.equal(path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
  });
});

describe('changes', () => {
  it('prepends - exists at front', () => {
    const envPaths = ['install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const changes = prepend(envPath, 'install/path', { changes: true }) as PrependResult;
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 0);
    assert.equal(changes.path, envPath);
  });

  it('prepends - removes extra', () => {
    const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const changes = prepend(envPath, 'install/path', { changes: true }) as PrependResult;
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 1);
    envPaths.splice(3, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });

  it('prepends - removes extras', () => {
    const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path', 'install/path'];
    const envPath = envPaths.join(DELIMITER);

    const changes = prepend(envPath, 'install/path', { changes: true }) as PrependResult;
    assert.equal(changes.added.length, 0);
    assert.equal(changes.removed.length, 2);
    envPaths.splice(6, 1);
    envPaths.splice(3, 1);
    assert.equal(changes.path, envPaths.join(DELIMITER));
  });

  it('adds missing no entries', () => {
    const envPaths = ['other/path', 'another/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const changes = prepend(envPath, 'install/path', { changes: true }) as PrependResult;
    assert.equal(changes.added.length, 1);
    assert.equal(changes.removed.length, 0);
    assert.equal(changes.path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
  });

  it('adds missing and removes middle', () => {
    const envPaths = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
    const envPath = envPaths.join(DELIMITER);

    const changes = prepend(envPath, 'install/path', { changes: true }) as PrependResult;
    assert.equal(changes.added.length, 1);
    assert.equal(changes.removed.length, 1);
    envPaths.splice(2, 1);
    assert.equal(changes.path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
  });
});

describe('delimiter', () => {
  describe(':', () => {
    const DELIMITER = ':';

    it('prepends - exists at front', () => {
      const envPaths = ['install/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, envPath);
    });

    it('prepends - removes extra', () => {
      const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('prepends - removes extras', () => {
      const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path', 'install/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(6, 1);
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('adds missing no entries', () => {
      const envPaths = ['other/path', 'another/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
    });

    it('adds missing and removes middle', () => {
      const envPaths = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(2, 1);
      assert.equal(path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
    });
  });

  describe(';', () => {
    const DELIMITER = ';';

    it('prepends - exists at front', () => {
      const envPaths = ['install/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, envPath);
    });

    it('prepends - removes extra', () => {
      const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('prepends - removes extras', () => {
      const envPaths = ['install/path', 'other/path', 'another/path', 'install/path', 'other/path', 'another/path', 'install/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(6, 1);
      envPaths.splice(3, 1);
      assert.equal(path, envPaths.join(DELIMITER));
    });

    it('adds missing no entries', () => {
      const envPaths = ['other/path', 'another/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      assert.equal(path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
    });

    it('adds missing and removes middle', () => {
      const envPaths = ['other/path', 'another/path', 'install/path', 'other/path', 'another/path'];
      const envPath = envPaths.join(DELIMITER);

      const path = prepend(envPath, 'install/path', { delimiter: DELIMITER });
      envPaths.splice(2, 1);
      assert.equal(path, `install/path${DELIMITER}${envPaths.join(DELIMITER)}`);
    });
  });
});

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
