const { size } = require('../../src/helpers/redBlack');

describe('comom tests', () => {
  it('null case', () => {
    const result = size(null);
    expect(result).toBe(0);
  });
  it('positive size', () => {
    const result = size({ size: 2 });
    expect(result).toBe(2);
  });
});
