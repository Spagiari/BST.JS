const BST = require('../../src/BST');

describe('comom tests', () => {
  const bst = new BST();

  it('empty case', () => {
    expect(bst.isEmpty()).toBe(true);
  });

  it('one item', () => {
    bst.put('1', { valor: 10 });
    expect(bst.isEmpty()).toBe(false);
  });

  it('after delete item', () => {
    bst.put('1', null);
    expect(bst.isEmpty()).toBe(true);
  });
});
