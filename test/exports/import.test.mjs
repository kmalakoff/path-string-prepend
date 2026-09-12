import assert from 'assert';
import prepend from 'path-string-prepend';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof prepend, 'function');
  });
});
