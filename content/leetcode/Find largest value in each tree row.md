---
date: 2024-07-18
---
**Link:** https://leetcode.com/problems/find-largest-value-in-each-tree-row/
#### Solution:

**Topics**: [[DFS]], [[BFS]]

**Intuition**
Pretty trivial problem...either DFS or BFS works here. I'll implement it with a DFS since the implementation is a bit simpler, but at the cost of stack space of course.

**Implementation**
```python
def find_largest(root):
	res = []
	def dfs(node, level):
		if node is None:
			return 
		if len(res) < level + 1:
			res.append(node.val)
		else:
			res[level] = max(res[level], node.val)
		dfs(node.left, level + 1)
		dfs(node.right, level + 1)
	dfs(root, 0)
	return res

#time: o(n)
#memory: o(n)
```

#review 


