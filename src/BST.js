/**
 * Red-black binary shearch tree.
 * Implementation based on the Algs4 red-black BST.
 * @module BST
 * @author Eduardo Spagiari
 */

const { RED, BLACK, isRed, size } = require('./helpers/redBlack.js');
const {
  compare,
  get,
  put,
  deleteMin,
  deleteMax,
  deleteKey,
  height,
  min,
  max,
  floor,
  ceiling,
  select,
  rank,
  keysInRange,
  isBST,
  isSizeConsistent,
  isBalanced,
} = require('./helpers/bst.js');

/**
 * Class representing a Red-black BST.
 */
class BST {
  /**
   * Create a Red-black BST.
   */
  constructor() {
    this.root = null; // root of the BST
  }

  /** *************************************************************************
   *  Standard BST search.
   ************************************************************************** */

  /**
   * Returns the number of key-value pairs in this symbol table.
   * @return {number} the number of key-value pairs in this symbol table
   */
  size() {
    return size(this.root);
  }

  /**
   * Is this symbol table empty?
   * @return {boolean} true if this symbol table is empty and false otherwise
   */
  isEmpty() {
    return this.root === null;
  }

  /**
   * Returns the value associated with the given key.
   * @param {(string|number)} key - the key
   * @return {(string|number|Object)} the value associated with the given key
   *  if the key is in the symbol table and null if the key is not in the symbol table
   * @throws Error if key is null
   */
  get(key) {
    if (key === null) throw new Error('Argument to get() is null');
    return get(this.root, key);
  }

  /**
   * Does this symbol table contain the given key?
   * @param {(string|number)} key - the key
   * @return {boolean} true if this symbol table contains key and
   *     false otherwise
   * @throws Error if key is null
   */
  contains(key) {
    return this.get(key) !== null;
  }

  /** *************************************************************************
   *  Red-black tree insertion.
   ************************************************************************** */

  /**
   * Inserts the specified key-value pair into the symbol table, overwriting the old
   * value with the new value if the symbol table already contains the specified key.
   * Deletes the specified key (and its associated value) from this symbol table
   * if the specified value is null.
   *
   * @param {(string|number)} key - the key
   * @return {(string|number|Object)} val - the value associated with the given key
   * @throws error if key is null
   */
  put(key, val) {
    if (key === null) throw new Error('first argument to put() is null');
    if (val === null) {
      this.delete(key);
      return;
    }

    this.root = put(this.root, key, val);
    this.root.color = BLACK;
    // assert check();
  }

  /** *************************************************************************
   *  Red-black tree deletion.
   ************************************************************************** */

  /**
   * Removes the smallest key and associated value from the symbol table.
   * @throws error if the symbol table is empty
   */
  deleteMin() {
    if (this.isEmpty()) throw new Error('BST underflow');

    // if both children of root are black, set root to red
    if (!isRed(this.root.left) && !isRed(this.root.right)) {
      this.root.color = RED;
    }

    this.root = deleteMin(this.root);
    if (!this.isEmpty()) this.root.color = BLACK;
    // assert check();
  }

  /**
   * Removes the largest key and associated value from the symbol table.
   * @throws error if the symbol table is empty
   */
  deleteMax() {
    if (this.isEmpty()) throw new Error('BST underflow');

    // if both children of root are black, set root to red
    if (!isRed(this.root.left) && !isRed(this.root.right)) {
      this.root.color = RED;
    }

    this.root = deleteMax(this.root);
    if (!this.isEmpty()) this.root.color = BLACK;
    // assert check();
  }

  /**
   * Removes the specified key and its associated value from this symbol table
   * (if the key is in this symbol table).
   *
   * @param {(string|number)} key - the key
   * @throws error if key is null
   */
  delete(key) {
    if (key === null) throw new Error('argument to delete() is null');
    if (!this.contains(key)) return;

    // if both children of root are black, set root to red
    if (!isRed(this.root.left) && !isRed(this.root.right)) {
      this.root.color = RED;
    }

    this.root = deleteKey(this.root, key);
    if (!this.isEmpty()) this.root.color = BLACK;
    // assert check();
  }

  /** *************************************************************************
   *  Utility functions.
   ************************************************************************** */

  /**
   * Returns the height of the BST (for debugging).
   * @return {number} the height of the BST (a 1-node tree has height 0)
   */
  height() {
    return height(this.root);
  }

  /** *************************************************************************
   *  Ordered symbol table methods.
   ************************************************************************** */

  /**
   * Returns the smallest key in the symbol table.
   * @return {number} the smallest key in the symbol table
   * @throws Error if the symbol table is empty
   */
  min() {
    if (this.isEmpty()) throw new Error('Calls min() with empty symbol table');
    return min(this.root).key;
  }

  /**
   * Returns the largest key in the symbol table.
   * @return {number} the largest key in the symbol table
   * @throws Error if the symbol table is empty
   */
  max() {
    if (this.isEmpty()) throw new Error('Calls max() with empty symbol table');
    return max(this.root).key;
  }

  /**
   * Returns the largest key in the symbol table less than or equal to key.
   * @param {(string|number)} key - the key
   * @return {(string|number|Object)} the largest key in the symbol table
   *  less than or equal to key
   * @throws Error if there is no such key
   * @throws Error if key is null
   */
  floor(key) {
    if (key === null) throw new Error('argument to floor() is null');
    if (this.isEmpty()) {
      throw new Error('calls floor() with empty symbol table');
    }
    const x = floor(this.root, key);
    if (x === null) throw new Error('argument to floor() is too small');
    else return x.key;
  }

  /**
   * Returns the smallest key in the symbol table greater than or equal to key.
   * @param {(string|number)} key - the key
   * @return {(string|number|Object)} the smallest key in the symbol table greater
   *  than or equal to key
   * @throws Error if there is no such key
   * @throws Error if key is null
   */
  ceiling(key) {
    if (key === null) throw new Error('argument to ceiling() is null');
    if (this.isEmpty()) {
      throw new Error('calls ceiling() with empty symbol table');
    }
    const x = ceiling(this.root, key);
    if (x === null) throw new Error('argument to ceiling() is too small');
    else return x.key;
  }

  /**
   * Return the key in the symbol table of a given rank.
   * This key has the property that there are rank keys in
   * the symbol table that are smaller. In other words, this key is the
   * (rank+1)st smallest key in the symbol table.
   *
   * @param {number} rank - the order statistic
   * @return {(string|number|Object)} the key in the symbol table of given rank
   * @throws Error unless rank is between 0 and n–1
   */
  select(_rank) {
    if (
      _rank < 0 ||
      _rank >= this.size() ||
      typeof _rank !== 'number' ||
      !Number.isInteger(_rank)
    ) {
      throw new Error(`argument to select() is invalid: ${_rank}`);
    }
    return select(this.root, _rank);
  }

  /**
   * Return the number of keys in the symbol table strictly less than key.
   * @param {(string|number)} key - the key
   * @return {number} the number of keys in the symbol table strictly less than key
   * @throws Error if key is null
   */
  rank(key) {
    if (key === null) throw new Error('argument to rank() is null');
    return rank(key, this.root);
  }

  /** *************************************************************************
   *  Range count and range search.
   ************************************************************************** */

  /**
   * Returns all keys in the symbol table as an Iterable.
   * To iterate over all of the keys in the symbol table named st,
   * use the foreach notation: for (Key key : st.keys()).
   * @return {Array} all keys in the symbol table as an Iterable
   */
  keys() {
    if (this.isEmpty()) return [];
    return this.keysInRange(this.min(), this.max());
  }

  /**
   * Returns all keys in the symbol table in the given range,
   * as an Iterable.
   *
   * @param {(string|number)} lo - minimum endpoint
   * @param {(string|number)} hi - maximum endpoint
   * @return {Array} all keys in the symbol table between lo
   *    (inclusive) and hi (inclusive) as an Iterable
   * @throws Error if either lo or hi is null
   */
  keysInRange(lo, hi) {
    if (lo == null) throw new Error('first argument to keys() is null');
    if (hi == null) throw new Error('second argument to keys() is null');

    const queue = [];
    // if (isEmpty() || lo.compareTo(hi) > 0) return queue;
    keysInRange(this.root, queue, lo, hi);
    return queue;
  }

  /**
   * Returns the number of keys in the symbol table in the given range.
   *
   * @param {(string|number)} lo - minimum endpoint
   * @param {(string|number)} hi - maximum endpoint
   * @return {number} the number of keys in the symbol table between lo
   *    (inclusive) and hi (inclusive)
   * @throws Error if either lo or hi null
   */
  sizeInRange(lo, hi) {
    if (lo == null) throw new Error('first argument to sizeInRange() is null');
    if (hi == null) throw new Error('second argument to sizeInRange() is null');

    if (compare(lo, hi) > 0) return 0;
    if (this.contains(hi)) return this.rank(hi) - this.rank(lo) + 1;
    return this.rank(hi) - this.rank(lo);
  }

  /** *************************************************************************
   *  Check integrity of red-black tree data structure.
   *
   * @return {bollean} true if red-black tree data structure is integrate
   ************************************************************************** */
  check() {
    if (!this.isBST()) console.log('Not in symmetric order');
    if (!this.isSizeConsistent()) console.log('Subtree counts not consistent');
    if (!this.isRankConsistent()) console.log('Ranks not consistent');
    if (!this.is23()) console.log('Not a 2-3 tree');
    if (!this.isBalanced()) console.log('Not balanced');
    return (
      this.isBST() &&
      this.isSizeConsistent() &&
      this.isRankConsistent() &&
      this.is23() &&
      this.isBalanced()
    );
  }

  // does this binary tree satisfy symmetric order?
  // Note: this test also ensures that data structure is a binary tree since order is strict
  isBST() {
    return isBST(this.root, null, null);
  }

  isSizeConsistent() {
    return isSizeConsistent(this.root);
  }

  // check that ranks are consistent
  isRankConsistent() {
    for (let i = 0; i < this.size(); i++) {
      if (i !== this.rank(this.select(i))) return false;
    }

    return this.keys()
      .map(_key => compare(_key, this.select(this.rank(_key))) === 0)
      .reduce((acc, curr) => acc && curr, true);
  }

  // Does the tree have no red right links, and at most one (left)
  // red links in a row on any path?
  is23x(x) {
    if (x === null) return true;
    if (isRed(x.right)) return false;
    if (x !== this.root && isRed(x) && isRed(x.left)) return false;
    return this.is23x(x.left) && this.is23x(x.right);
  }

  is23() {
    return this.is23x(this.root);
  }

  // do all paths from root to leaf have same number of black edges?
  isBalanced() {
    let black = 0; // number of black links on path from root to min
    let x = this.root;
    while (x !== null) {
      if (!isRed(x)) black++;
      x = x.left;
    }
    return isBalanced(this.root, black);
  }
}

module.exports = BST;
