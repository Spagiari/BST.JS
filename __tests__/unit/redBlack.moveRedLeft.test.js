const { RED, BLACK, moveRedLeft } = require('../../src/helpers/redBlack');

const root = {
  key: 'O',
  color: RED,
  size: 7,
  val: 20,
  left: {
    key: 'E',
    color: BLACK,
    size: 1,
    val: 10,
    left: null,
    right: null,
  },
  right: {
    key: 'U',
    color: BLACK,
    size: 5,
    val: 30,
    left: {
      key: 'Q',
      color: RED,
      size: 3,
      val: 25,
      left: {
        key: 'P',
        color: BLACK,
        size: 1,
        val: 21,
        left: null,
        right: null,
      },
      right: {
        key: 'R',
        color: BLACK,
        size: 1,
        val: 26,
        left: null,
        right: null,
      },
    },
    right: {
      key: 'V',
      color: BLACK,
      size: 1,
      val: 40,
      left: null,
      right: null,
    },
  },
};

const expected = {
  key: 'Q',
  color: RED,
  size: 7,
  val: 25,
  left: {
    key: 'O',
    color: BLACK,
    size: 3,
    val: 20,
    left: {
      key: 'E',
      color: RED,
      size: 1,
      val: 10,
      left: null,
      right: null,
    },
    right: {
      key: 'P',
      color: BLACK,
      size: 1,
      val: 21,
      left: null,
      right: null,
    },
  },
  right: {
    key: 'U',
    color: BLACK,
    size: 3,
    val: 30,
    left: {
      key: 'R',
      color: BLACK,
      size: 1,
      val: 26,
      left: null,
      right: null,
    },
    right: {
      key: 'V',
      color: BLACK,
      size: 1,
      val: 40,
      left: null,
      right: null,
    },
  },
};

describe('comom tests', () => {
  it('null case', () => {
    const result = moveRedLeft(root);
    expect(result).toEqual(expected);
  });
});
