/** *************************************************************************
 *  Red-black tree helper functions.
 ************************************************************************** */
const RED = true;
const BLACK = false;

// is node x red; false if x is null ?
function isRed(node) {
  if (node === null) return false;
  return node.color === RED;
}

// number of node in subtree rooted at x; 0 if x is null
function size(node) {
  if (node === null) return 0;
  return node.size;
}

// make a left-leaning link lean to the right
function rotateRight(h) {
  // assert (h != null) && isRed(h.left);
  const x = h.left;
  h.left = x.right;
  x.right = h;
  x.color = x.right.color;
  x.right.color = RED;
  x.size = h.size;
  h.size = size(h.left) + size(h.right) + 1;
  return x;
}

// make a right-leaning link lean to the left
function rotateLeft(h) {
  // assert (h != null) && isRed(h.right);
  const x = h.right;
  h.right = x.left;
  x.left = h;
  x.color = x.left.color;
  x.left.color = RED;
  x.size = h.size;
  h.size = size(h.left) + size(h.right) + 1;
  return x;
}

// flip the colors of a node and its two children
function flipColors(h) {
  // h must have opposite color of its two children
  // assert (h != null) && (h.left != null) && (h.right != null);
  // assert (!isRed(h) &&  isRed(h.left) &&  isRed(h.right))
  //    || (isRed(h)  && !isRed(h.left) && !isRed(h.right));
  h.color = !h.color;
  h.left.color = !h.left.color;
  h.right.color = !h.right.color;
}

// Assuming that h is red and both h.left and h.left.left
// are black, make h.left or one of its children red.
function moveRedLeft(_h) {
  // assert (h != null);
  // assert isRed(h) && !isRed(h.left) && !isRed(h.left.left);
  let h = _h;

  flipColors(h);
  if (isRed(h.right.left)) {
    h.right = rotateRight(h.right);
    h = rotateLeft(h);
    flipColors(h);
  }
  return h;
}

// Assuming that h is red and both h.right and h.right.left
// are black, make h.right or one of its children red.
function moveRedRight(_h) {
  // assert (h != null);
  // assert isRed(h) && !isRed(h.right) && !isRed(h.right.left);
  let h = _h;

  flipColors(h);
  if (isRed(h.left.left)) {
    h = rotateRight(h);
    flipColors(h);
  }
  return h;
}

// restore red-black tree invariant
function balance(_h) {
  // assert (h != null);
  let h = _h;

  if (isRed(h.right)) h = rotateLeft(h);
  if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
  if (isRed(h.left) && isRed(h.right)) flipColors(h);

  h.size = size(h.left) + size(h.right) + 1;
  return h;
}

module.exports = {
  RED,
  BLACK,
  isRed,
  size,
  rotateLeft,
  rotateRight,
  flipColors,
  moveRedLeft,
  moveRedRight,
  balance,
};
