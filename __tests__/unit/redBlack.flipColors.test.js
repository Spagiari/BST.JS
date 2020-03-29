const { RED, BLACK, flipColors } = require('../../src/helpers/redBlack');

const root = {
  key: 'E',
  color: BLACK,
  size: 5,
  val: 5,
  left: {
    key: 'A', color: BLACK, size: 1, val: 1, left: null, right: null,
  },
  right: {
    key: 'S',
    color: RED,
    size: 3,
    val: 10,
    left: null,
    right: null,
  },
};

const expected = {
  key: 'E',
  color: !BLACK,
  size: 5,
  val: 5,
  left: {
    key: 'A', color: !BLACK, size: 1, val: 1, left: null, right: null,
  },
  right: {
    key: 'S',
    color: !RED,
    size: 3,
    val: 10,
    left: null,
    right: null,
  },
};

describe('comom tests', () => {
  it('null case', () => {
    flipColors(root);
    expect(root).toEqual(expected);
  });
});
