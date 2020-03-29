const { RED, BLACK, isRed } = require('../../src/helpers/redBlack');

describe('comom tests', () => {
  it('null case', () => {
    const result = isRed(null);
    expect(result).toBe(false);
  });
  it('RED case', () => {
    const result = isRed({ color: RED });
    expect(result).toBe(true);
  });
  it('BLACK case', () => {
    const result = isRed({ color: BLACK });
    expect(result).toBe(false);
  });
});
