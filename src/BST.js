const { RED, BLACK, isRed, size } = require("./helpers/redBlack.js");
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
  keys,
  isBST,
  isSizeConsistent,
  isBalanced
} = require("./helpers/bst.js");

class BST {
  /**
   * Initializes an empty symbol table.
   */
  constructor() {
    this.root = null; // root of the BST
  }

  /**
   * Returns the number of key-value pairs in this symbol table.
   * @return the number of key-value pairs in this symbol table
   */
  size() {
    return size(this.root);
  }

  /**
   * Is this symbol table empty?
   * @return {@code true} if this symbol table is empty and {@code false} otherwise
   */
  isEmpty() {
    return this.root === null;
  }

  /** *************************************************************************
   *  Standard BST search.
   ************************************************************************** */

  /**
   * Returns the value associated with the given key.
   * @param key the key
   * @return the value associated with the given key if the key is in the symbol table
   *     and {@code null} if the key is not in the symbol table
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  get(key) {
    if (key === null) throw new Error("argument to get() is null");
    return get(this.root, key);
  }

  /**
   * Does this symbol table contain the given key?
   * @param key the key
   * @return {@code true} if this symbol table contains {@code key} and
   *     {@code false} otherwise
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  contains(key) {
    return get(key) !== null;
  }

  /** *************************************************************************
   *  Red-black tree insertion.
   ************************************************************************** */

  /**
   * Inserts the specified key-value pair into the symbol table, overwriting the old
   * value with the new value if the symbol table already contains the specified key.
   * Deletes the specified key (and its associated value) from this symbol table
   * if the specified value is {@code null}.
   *
   * @param key the key
   * @param val the value
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  put(key, val) {
    if (key === null) throw new Error("first argument to put() is null");
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
   * @throws NoSuchElementException if the symbol table is empty
   */
  deleteMin() {
    if (this.isEmpty()) throw new Error("BST underflow");

    // if both children of root are black, set root to red
    if (!isRed(this.root.left) && !isRed(this.root.right))
      {this.root.color = RED;}

    this.root = deleteMin(this.root);
    if (!this.isEmpty()) this.root.color = BLACK;
    // assert check();
  }

  /**
   * Removes the largest key and associated value from the symbol table.
   * @throws NoSuchElementException if the symbol table is empty
   */
  deleteMax() {
    if (this.isEmpty()) throw new Error("BST underflow");

    // if both children of root are black, set root to red
    if (!isRed(this.root.left) && !isRed(this.root.right))
      {this.root.color = RED;}

    this.root = deleteMax(this.root);
    if (!this.isEmpty()) this.root.color = BLACK;
    // assert check();
  }

  /**
   * Removes the specified key and its associated value from this symbol table
   * (if the key is in this symbol table).
   *
   * @param  key the key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  delete(key) {
    if (key === null) throw new Error("argument to delete() is null");
    if (!this.contains(key)) return;

    // if both children of root are black, set root to red
    if (!isRed(this.root.left) && !isRed(this.root.right))
      {this.root.color = RED;}

    this.root = deleteKey(this.root, key);
    if (!this.isEmpty()) this.root.color = BLACK;
    // assert check();
  }

  /** *************************************************************************
   *  Utility functions.
   ************************************************************************** */

  /**
   * Returns the height of the BST (for debugging).
   * @return the height of the BST (a 1-node tree has height 0)
   */
  height() {
    return height(this.root);
  }

  /** *************************************************************************
   *  Ordered symbol table methods.
   ************************************************************************** */

  /**
   * Returns the smallest key in the symbol table.
   * @return the smallest key in the symbol table
   * @throws NoSuchElementException if the symbol table is empty
   */
  min() {
    if (isEmpty()) throw new Error("calls min() with empty symbol table");
    return min(this.root).key;
  }

  /**
   * Returns the largest key in the symbol table.
   * @return the largest key in the symbol table
   * @throws NoSuchElementException if the symbol table is empty
   */
  max() {
    if (isEmpty()) throw new Error("calls max() with empty symbol table");
    return max(this.root).key;
  }

  /**
   * Returns the largest key in the symbol table less than or equal to {@code key}.
   * @param key the key
   * @return the largest key in the symbol table less than or equal to {@code key}
   * @throws NoSuchElementException if there is no such key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  floor(key) {
    if (key === null) throw new Error("argument to floor() is null");
    if (this.isEmpty())
      {throw new Error("calls floor() with empty symbol table");}
    const x = floor(this.root, key);
    if (x === null) throw new Error("argument to floor() is too small");
    else return x.key;
  }

  /**
   * Returns the smallest key in the symbol table greater than or equal to {@code key}.
   * @param key the key
   * @return the smallest key in the symbol table greater than or equal to {@code key}
   * @throws NoSuchElementException if there is no such key
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  ceiling(key) {
    if (key === null) throw new Error("argument to ceiling() is null");
    if (this.isEmpty())
      {throw new Error("calls ceiling() with empty symbol table");}
    const x = ceiling(this.root, key);
    if (x === null) throw new Error("argument to ceiling() is too small");
    else return x.key;
  }

  /**
   * Return the key in the symbol table of a given {@code rank}.
   * This key has the property that there are {@code rank} keys in
   * the symbol table that are smaller. In other words, this key is the
   * ({@code rank}+1)st smallest key in the symbol table.
   *
   * @param  rank the order statistic
   * @return the key in the symbol table of given {@code rank}
   * @throws IllegalArgumentException unless {@code rank} is between 0 and
   *        <em>n</em>–1
   */
  select(rank) {
    if (rank < 0 || rank >= this.size()) {
      throw new Error(`argument to select() is invalid: ${  rank}`);
    }
    return select(this.root, rank);
  }

  /**
   * Return the number of keys in the symbol table strictly less than {@code key}.
   * @param key the key
   * @return the number of keys in the symbol table strictly less than {@code key}
   * @throws IllegalArgumentException if {@code key} is {@code null}
   */
  rank(key) {
    if (key === null) throw new Error("argument to rank() is null");
    return rank(key, this.root);
  }

  /** *************************************************************************
   *  Range count and range search.
   ************************************************************************** */

  /**
   * Returns all keys in the symbol table as an {@code Iterable}.
   * To iterate over all of the keys in the symbol table named {@code st},
   * use the foreach notation: {@code for (Key key : st.keys())}.
   * @return all keys in the symbol table as an {@code Iterable}
   */
  keys() {
    if (this.isEmpty()) return [];
    return this.keys(min(), max());
  }

  /**
   * Returns all keys in the symbol table in the given range,
   * as an {@code Iterable}.
   *
   * @param  lo minimum endpoint
   * @param  hi maximum endpoint
   * @return all keys in the symbol table between {@code lo}
   *    (inclusive) and {@code hi} (inclusive) as an {@code Iterable}
   * @throws IllegalArgumentException if either {@code lo} or {@code hi}
   *    is {@code null}
   */
  keys(lo, hi) {
    if (lo == null) throw new Error("first argument to keys() is null");
    if (hi == null) throw new Error("second argument to keys() is null");

    const queue = [];
    // if (isEmpty() || lo.compareTo(hi) > 0) return queue;
    keys(this.root, queue, lo, hi);
    return queue;
  }

  /**
   * Returns the number of keys in the symbol table in the given range.
   *
   * @param  lo minimum endpoint
   * @param  hi maximum endpoint
   * @return the number of keys in the symbol table between {@code lo}
   *    (inclusive) and {@code hi} (inclusive)
   * @throws IllegalArgumentException if either {@code lo} or {@code hi}
   *    is {@code null}
   */
  size(lo, hi) {
    if (lo == null) throw new Error("first argument to size() is null");
    if (hi == null) throw new Error("second argument to size() is null");

    if (compare(lo, hi) > 0) return 0;
    if (this.contains(hi)) return this.rank(hi) - this.rank(lo) + 1;
    return this.rank(hi) - this.rank(lo);
  }

  /** *************************************************************************
   *  Check integrity of red-black tree data structure.
   ************************************************************************** */
  check() {
    if (!isBST()) console.log("Not in symmetric order");
    if (!isSizeConsistent()) console.log("Subtree counts not consistent");
    if (!isRankConsistent()) console.log("Ranks not consistent");
    if (!is23()) console.log("Not a 2-3 tree");
    if (!isBalanced()) console.log("Not balanced");
    return (
      isBST() &&
      isSizeConsistent() &&
      isRankConsistent() &&
      is23() &&
      isBalanced()
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
    for (let i = 0; i < this.size(); i++)
      {if (i !== this.rank(this.select(i))) return false;}
    keys().forEach(key => {
      if (compare(key, select(rank(key))) != 0) return false;
    });
    return true;
  }

  // Does the tree have no red right links, and at most one (left)
  // red links in a row on any path?
  is23() {
    return this._is23(this.root);
  }
  _is23(x) {
    if (x === null) return true;
    if (isRed(x.right)) return false;
    if (x !== this.root && isRed(x) && isRed(x.left)) return false;
    return this._is23(x.left) && this._is23(x.right);
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
