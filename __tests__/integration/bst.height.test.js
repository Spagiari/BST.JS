const BST = require('../../src/BST');

describe('comom tests', () => {
  const bst = new BST();
  it('empty case', () => {
    expect(bst.height()).toBe(-1);
  });

  it('one item', () => {
    bst.put('1', { valor: 1 });
    expect(bst.height()).toBe(0);
  });

  it('two items', () => {
    bst.put('0', { valor: 0 });
    expect(bst.height()).toBe(1);
  });

  it('three items', () => {
    bst.put('3', { valor: 0 });
    expect(bst.height()).toBe(1);
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
    expect(bst.height()).toBe(3);
  });
});
