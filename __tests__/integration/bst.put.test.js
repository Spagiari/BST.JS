const BST = require('../../src/BST');

describe('comom tests', () => {
  const bst = new BST();
  it('null case', () => {
    let err;
    try {
      bst.put(null, 10);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('simple case', () => {
    bst.put('10', { valor: 10 });
    expect(bst.get('10')).toEqual({ valor: 10 });
  });

  it('case one', () => {
    bst.put('1', { valor: 1 });
    bst.put('8', { valor: 8 });
    bst.put('3', { valor: 3 });
    bst.put('0', { valor: 0 });
    bst.put('7', { valor: 7 });
    bst.put('9', { valor: 9 });
    bst.put('4', { valor: 4 });
    bst.put('2', { valor: 2 });
    bst.put('5', { valor: 5 });
    bst.put('6', { valor: 6 });
    expect(bst.get('0')).toEqual({ valor: 0 });
    expect(bst.get('9')).toEqual({ valor: 9 });
    expect(bst.get('5')).toEqual({ valor: 5 });
  });

  it('case one', () => {
    bst.put('4', { valor: 40 });
    expect(bst.get('1')).toEqual({ valor: 1 });
    expect(bst.get('2')).toEqual({ valor: 2 });
    expect(bst.get('4')).toEqual({ valor: 40 });
  });

  it('delete item', () => {
    bst.put('1', null);
    expect(bst.contains(1)).toBe(false);
  });
});
