---
date: 2024-05-22
---
**Link:** https://leetcode.com/problems/validate-binary-tree-nodes/
#### Solution:

**Topics**: [[BFS]], [[set]]

**Intuition**
I struggled with this problem a little bit, but when I started thinking about it in terms of what constitutes a valid binary tree, the approach became clear. A binary tree MUST have a root and if we traverse from the root, there must be no cycles. 

So with these two axioms, the solution almost writes itself. First we find the root (only node with no parent), then we traverse the tree starting at the root and if we detect a cycle, return the tree is invalid. We can traverse either with DFS or BFS... it functionally makes no difference so choose BFS for efficiency. 

The notable edge case is where there are no cycles but there are unvisited nodes...which would indicate multiple trees/components (also invalid). 

**Implementation**
```python
def validate_nodes(n, leftChild, rightChild):
	root = {node for node in range(n)}
	root = root ^ set(leftChild)
	root = root ^ set(rightChild)
	if len(root) != 1:
		return False
		
	seen = set()
	queue = deque([root.pop()])
	while queue:
		node = queue.popleft()
		if node == -1:
			continue
		if node in seen:
			return False
		seen.add(node)
		queue.append(leftChild[node])
		queue.append(rightChild[node])
	return len(seen) == n
		
#time: o(n)
#memory: o(n)
```

**Visual** 

![[IMG_A73DB65C3C7B-1.jpeg]]


#review 
#hard 

