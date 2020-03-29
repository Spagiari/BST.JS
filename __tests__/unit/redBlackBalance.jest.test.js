const { RED, BLACK, balance } = require('../../src/helpers/redBlack');

describe('rotate left', () => {
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
  it('simple case', () => {
    const result = balance(root);
    expect(result).toEqual(expected);
  });
});

describe('rotate right', () => {
  const root = {
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
        color: RED,
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

  const expected = {
    key: 'E',
    color: RED,
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
      color: BLACK,
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
  it('simple case', () => {
    const result = balance(root);
    expect(result).toEqual(expected);
  });
});
