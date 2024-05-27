---
date: 2024-05-22
---
**Link:** https://leetcode.com/problems/binary-tree-vertical-order-traversal/
#### Solution:

**Topics**: [[BFS]], [[hash map]]

**Intuition**
This is a very nice problem that recruits a nice property of binary trees. The left child of the parent is shifted one column to the left and the right child is shifted one column to the right. We can use this property to determine the vertical column of every node. 

For example
```
      0           start at 0 column for the root
  -1      1       0-1, 0+1 for leftchild/right child columns 
-2  0   0   2     ...and so on
```

If we start at column zero for the root node like in the above example, the leftmost columns will be the most negative. We can't really use a 2d-array here to insert node values because we don't know in advance how wide the tree is. We could of course traverse twice to normalize the width, but this is wasteful. DFS or BFS is suitable for traversal (choose BFS for efficiency)

A more elegant solution is to store node values in a hashmap with the key being both negative and positive columns. After all nodes are stored, we can convert the hashmap into a 2d array and sort by the key. Then just slice out the key and return the result.


**Implementation**
```python
def vertical_order(root):
	cols = {}
	queue = deque([(root, 0)])
	while queue:
		node, col = queue.popleft()
		if node is None:
			continue
		if col not in cols:
			cols[col] = []
		cols[col].append(node.val)
		queue.append((node.left, col-1))
		queue.append((node.right, col+1))
	cols = [(col, nodes) for col, nodes in cols.items()]
	cols.sort()
	return [nodes for _, nodes in cols]

#time: o(nlogn)
#memory: o(n)
```

**Visual** 

![[IMG_5864713FDE63-1.jpeg]]
#review 

