const assert = require('assert');
const prepend = require('path-string-prepend');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof prepend, 'function');
  });
});
