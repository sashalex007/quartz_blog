---
date: 2024-08-30
---
**Link:** https://leetcode.com/problems/n-ary-tree-postorder-traversal/
#### Solution:

**Topics**: [[DFS]]

**Intuition**
Trivial little problem. Just do a [[DFS]] and append the parent node value to the result after all children have been visited. Postorder is typically how [[DP]] problems are structured. 

**Implementation**
```python
def post_order(root):
	res = []
	def dfs(node):
		if node is None:
			return
		for child in node.children:
			dfs(child)
		res.append(node.val)
	dfs(root)
	return res

#time: o(n)
#memory: o(n)
```

#review 


