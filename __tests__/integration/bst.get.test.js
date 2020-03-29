const BST = require('../../src/BST');

describe('comom tests', () => {
  const bst = new BST();
  bst.put('1', { valor: 1 });

  it('null case', () => {
    let err;
    try {
      bst.get(null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('simple case', () => {
    bst.put('10', { valor: 10 });
    expect(bst.get('10')).toEqual({ valor: 10 });
  });
});
