# Red-Black BST
Implementation of [Algs4 Red Black BST](https://algs4.cs.princeton.edu/code/javadoc/edu/princeton/cs/algs4/BST.html) in javascript with no dependencies.

This project is an implementation of red-black binary search for multi purpose. Common uses are: data caching, sort, indexing, etc... 

## Usage

```bash
$ npm i red-black-bst
```

```javascript
const BST = require('red-black-bst');

const bst = new BST();

bst.put('my key', {mydata: 'is this'})

console.log(bst.get('my key'))
```

## API

#### CRUD
Methods for create, read, update and delete nodes in tree.

###### Create or Update
Creating or update node in tree.

```javascript
bst.put('my key', {mydata: 'is this'})
```

###### Read
Get key content in tree.

```javascript
bst.get('my key')
```
###### Delete
```javascript
bst.delete('my key')
```

#### Query
Methods for query in the tree.

###### min
Get min key in the tree.

```javascript
bst.min()
```

###### max
Get max key in the tree.

```javascript
bst.min()
```

###### rank
Get number of keys less than key queried.

```javascript
bst.rank('my key')
```

###### select
Get data in the by rank position.

```javascript
bst.select(10)
```

###### floor
Get key less then or equal key queried.

```javascript
bst.floor('my key')
```

###### ceilling

Get key greater then or equal key queried.

```javascript
bst.ceilling('my key')
```

###### keys in range

Get all keys between interval keys queried.

```javascript
bst.keysInRange('first key', 'last key')
```