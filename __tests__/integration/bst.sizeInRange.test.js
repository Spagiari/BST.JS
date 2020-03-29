const BST = require('../../src/BST');

describe('comom tests', () => {
  const bst = new BST();

  it('lo null case', () => {
    let err;
    try {
      bst.sizeInRange(null, '9');
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('hi null case', () => {
    let err;
    try {
      bst.sizeInRange('0', null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('lo hi inverse case', () => {
    expect(bst.sizeInRange('5', '0')).toBe(0);
  });

  it('empty case', () => {
    expect(bst.sizeInRange('0', '5')).toBe(0);
  });

  it('one item', () => {
    bst.put('0', { valor: 1 });
    expect(bst.sizeInRange('0', '5')).toEqual(1);
  });

  it('two item', () => {
    bst.put('9', 1);
    bst.put('0', 0);
    expect(bst.sizeInRange('0', '5')).toEqual(1);
  });

  it('ten items', () => {
    bst.put('1', { valor: 1 });
    bst.put('8', { valor: 8 });
    bst.put('3', { valor: 3 });
    bst.put('0', { valor: 0 });
    bst.put('9', { valor: 9 });
    bst.put('4', { valor: 4 });
    bst.put('7', { valor: 4 });
    bst.put('2', { valor: 2 });
    bst.put('5', { valor: 5 });
    bst.put('6', { valor: 6 });
    expect(bst.sizeInRange('3', '7')).toEqual(5);
  });

  it('after delete items', () => {
    for (let i = 0; i < 8; ++i) bst.delete(i.toString());
    expect(bst.sizeInRange('5', '9')).toEqual(2);
  });
});
