const BST = require('../../src/BST');

describe('comom tests', () => {
  const bst = new BST();

  it('empty case', () => {
    let err;
    try {
      bst.select(1);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('null case', () => {
    let err;
    try {
      bst.select(null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('not integer case', () => {
    let err;
    bst.put('8', 0);
    bst.put('3', 0);
    bst.put('1', 0);
    try {
      bst.select(1.5);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('one item', () => {
    let err;
    bst.put('8', 0);
    try {
      bst.select(3);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('one item II', () => {
    expect(bst.select(0)).toEqual('1');
  });

  it('two item', () => {
    bst.put('9', 1);
    bst.put('0', 0);
    expect(bst.select(2)).toEqual('3');
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
    expect(bst.select(7)).toEqual('7');
    expect(bst.select(5)).toEqual('5');
  });

  it('after delete items', () => {
    for (let i = 0; i < 8; ++i) bst.delete(i.toString());
    expect(bst.select(0)).toEqual('8');
  });
});
