const {isRed, size} = require('node');
const {
  RED,
  rotateLeft,
  rotateRight,
  flipColors,
  moveRedLeft,
  moveRedRight,
  balance,
} = require('./helpers/redBlack.js');

function compare(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

// value associated with the given key in subtree rooted at x; null if no such key
function get(node, key) {
  while (node != null) {
    const cmp = compareTo(key, node.key);
    if (cmp < 0) x = node.left;
    else if (cmp > 0) x = node.right;
    else return node.val;
  }
  return null;
}

// insert the key-value pair in the subtree rooted at h
function put(h, key, val) {
  if (h === null) return new Node(key, val, RED, 1);

  const cmp = compareTo(key, h.key);
  if (cmp < 0) h.left = put(h.left, key, val);
  else if (cmp > 0) h.right = put(h.right, key, val);
  else h.val = val;

  // fix-up any right-leaning links
  if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);
  if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
  if (isRed(h.left) && isRed(h.right)) flipColors(h);
  h.size = size(h.left) + size(h.right) + 1;

  return h;
}

// delete the key-value pair with the minimum key rooted at h
function deleteMin(h) {
  if (h.left === null) return null;

  if (!isRed(h.left) && !isRed(h.left.left)) h = moveRedLeft(h);

  h.left = deleteMin(h.left);
  return balance(h);
}

// delete the key-value pair with the maximum key rooted at h
function deleteMax(h) {
  if (isRed(h.left)) h = rotateRight(h);

  if (h.right === null) return null;

  if (!isRed(h.right) && !isRed(h.right.left)) h = moveRedRight(h);

  h.right = deleteMax(h.right);

  return balance(h);
}

// delete the key-value pair with the given key rooted at h
function deleteKey(h, key) {
  // assert get(h, key) != null;

  if (compare(key, h.key) < 0) {
    if (!isRed(h.left) && !isRed(h.left.left)) h = moveRedLeft(h);
    h.left = deleteKey(h.left, key);
  } else {
    if (isRed(h.left)) h = rotateRight(h);
    if (compare(key, h.key) === 0 && h.right === null) return null;
    if (!isRed(h.right) && !isRed(h.right.left)) h = moveRedRight(h);
    if (compare(key, h.key) === 0) {
      const x = min(h.right);
      h.key = x.key;
      h.val = x.val;
      // h.val = get(h.right, min(h.right).key);
      // h.key = min(h.right).key;
      h.right = deleteMin(h.right);
    } else h.right = deleteKey(h.right, key);
  }
  return balance(h);
}

function height(x) {
  if (x === null) return -1;
  return 1 + Math.max(height(x.left), height(x.right));
}

// the smallest key in subtree rooted at x; null if no such key
function min(x) {
  // assert x != null;
  if (x.left === null) return x;
  return min(x.left);
}

// the largest key in the subtree rooted at x; null if no such key
function max(x) {
  // assert x != null;
  if (x.right === null) return x;
  return max(x.right);
}

// the largest key in the subtree rooted at x less than or equal to the given key
function floor(x, key) {
  if (x === null) return null;
  const cmp = compare(key, x.key);
  if (cmp === 0) return x;
  if (cmp < 0) return floor(x.left, key);
  const t = floor(x.right, key);
  if (t !== null) return t;
  return x;
}

// the smallest key in the subtree rooted at x greater than or equal to the given key
function ceiling(x, key) {
  if (x === null) return null;
  const cmp = compare(key, x.key);
  if (cmp === 0) return x;
  if (cmp > 0) return ceiling(x.right, key);
  const t = ceiling(x.left, key);
  if (t != null) return t;
  return x;
}

// Return key in BST rooted at x of given rank.
// Precondition: rank is in legal range.
function select(x, rank) {
  if (x === null) return null;
  const leftSize = size(x.left);
  if (leftSize > rank) return select(x.left, rank);
  if (leftSize < rank) return select(x.right, rank - leftSize - 1);
  return x.key;
}

// number of keys less than key in the subtree rooted at x
function rank(key, x) {
  if (x == null) return 0;
  const cmp = compare(key, x.key);
  if (cmp < 0) return rank(key, x.left);
  if (cmp > 0) return 1 + size(x.left) + rank(key, x.right);
  return size(x.left);
}

// add the keys between lo and hi in the subtree rooted at x
// to the queue
function keys(x, queue, lo, hi) {
  if (x === null) return;
  const cmplo = compare(lo, x.key);
  const cmphi = compare(hi, x.key);
  if (cmplo < 0) keys(x.left, queue, lo, hi);
  if (cmplo <= 0 && cmphi >= 0) queue.push(x.key);
  if (cmphi > 0) keys(x.right, queue, lo, hi);
}

// is the tree rooted at x a BST with all keys strictly between min and max
// (if min or max is null, treat as empty constraint)
// Credit: Bob Dondero's elegant solution
function isBST(x, min, max) {
  if (x === null) return true;
  if (min !== null && compare(x.key, min) <= 0) return false;
  if (max !== null && compare(x.key, max) >= 0) return false;
  return isBST(x.left, min, x.key) && isBST(x.right, x.key, max);
}

// are the size fields correct?
function isSizeConsistent(x) {
  if (x === null) return true;
  if (x.size !== size(x.left) + size(x.right) + 1) return false;
  return isSizeConsistent(x.left) && isSizeConsistent(x.right);
}

// does every path from the root to a leaf have the given number of black links?
function isBalanced(x, black) {
  if (x === null) return black === 0;
  if (!isRed(x)) black--;
  return isBalanced(x.left, black) && isBalanced(x.right, black);
}

module.exports = {
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
  isBalanced,
};
