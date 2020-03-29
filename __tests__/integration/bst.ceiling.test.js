const BST = require('../../src/BST');

describe('comom tests', () => {
  const bst = new BST();

  it('empty case', () => {
    let err;
    try {
      bst.ceiling('5');
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('null case', () => {
    let err;
    try {
      bst.ceiling(null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('one item', () => {
    let err;
    bst.put('2', 1);
    try {
      bst.ceiling('8');
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('one item II', () => {
    bst.put('9', 1);
    expect(bst.ceiling('7')).toEqual('9');
  });

  it('two item', () => {
    bst.put('9', 1);
    bst.put('0', 0);
    expect(bst.ceiling('5')).toEqual('9');
  });

  it('ten items', () => {
    bst.put('1', { valor: 1 });
    bst.put('8', { valor: 8 });
    bst.put('3', { valor: 3 });
    bst.put('0', { valor: 0 });
    bst.put('9', { valor: 9 });
    bst.put('4', { valor: 4 });
    bst.put('2', { valor: 2 });
    bst.put('5', { valor: 5 });
    bst.put('6', { valor: 6 });
    expect(bst.ceiling('7')).toEqual('8');
    expect(bst.ceiling('5')).toEqual('5');
  });

  it('after delete items', () => {
    for (let i = 0; i < 8; ++i) bst.delete(i.toString());
    expect(bst.ceiling('9')).toEqual('9');
  });
});
