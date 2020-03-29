const {RED, BLACK, rotateLeft} = require('../../src/helpers/redBlack');

const root = {
  key: 'E',
  color: BLACK,
  size: 5,
  val: 5,
  left: {
    key: 'A',
    color: BLACK,
    size: 1,
    val: 1,
    left: null,
    right: null,
  },
  right: {
    key: 'S',
    color: RED,
    size: 3,
    val: 10,
    left: {
      key: 'F',
      color: BLACK,
      size: 1,
      val: 6,
      left: null,
      right: null,
    },
    right: {
      key: 'T',
      color: BLACK,
      size: 1,
      val: 11,
      left: null,
      right: null,
    },
  },
};

const expected = {
  key: 'S',
  color: BLACK,
  size: 5,
  val: 10,
  left: {
    key: 'E',
    color: RED,
    size: 3,
    val: 5,
    left: {
      key: 'A',
      color: BLACK,
      size: 1,
      val: 1,
      left: null,
      right: null,
    },
    right: {
      key: 'F',
      color: BLACK,
      size: 1,
      val: 6,
      left: null,
      right: null,
    },
  },
  right: {
    key: 'T',
    color: BLACK,
    size: 1,
    val: 11,
    left: null,
    right: null,
  },
};

describe('comom tests', () => {
  it('simple case', () => {
    const result = rotateLeft(root);
    expect(result).toEqual(expected);
  });
});
