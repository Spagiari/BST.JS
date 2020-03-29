class Node {
  constructor(key, val, color, size) {
    this.key = key;
    this.val = val;
    this.color = color;
    this.size = size;
    this.left = null;
    this.right = null;
  }
}

module.exports = Node;
