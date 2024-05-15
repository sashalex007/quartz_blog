---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/diameter-of-binary-tree/
#### Solution:

**Topics**: [[DFS]]

**Intuition**
The key insight for this problem is understanding that we should alway bubble up the longest path, but before doing that we maximize the longest path from the right + the longest path from the left! This ensures that our diameter can pass through any node. 

Note: This is a bit different from most recursive problems in the sense that we can't pass the diameter up the call-stack, we can only evaluate it momentarily at each node. 

**Implementation**
```python
def diameter(root)
	diameter = 0
	def dfs(node):
		if node is None:
			return 0
		left = dfs(node.left)
		right = dfs(node.right)

		nonlocal diameter
		diameter = max(diameter, left+right)
		return max(left, right) + 1
		
	dfs(root)
	return diameter

#time: o(n)
#memory: o(n)
```

**Visual** 
![[IMG_06B1346803DB-1.jpeg]]

#review 


