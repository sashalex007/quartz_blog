---
date: 2024-11-13
---
**Link:** https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
#### Solution:

**Topics**: [[DFS]]

**Intuition**
Easy little problem. I initially implement a DFS to create the parent pointers followed by a BFS on the target to find nodes `k` distance from it. I still think this is the most well-rounded approach. You can also just do a DFS on the modified tree while keeping track of distance from the target. This just feels wrong to me, so I will stick with BFS.

**Implementation**
```python
def distance_k(root, target, k):
	self.target = None
	
	def dfs(node, parent, target):
		if node is None:
			return
		node.parent = parent
		if node == target:
			self.target = node
		dfs(node.left, node, target)
		dfs(node.right, node, target)
	dfs(root, None, target)
		
	res = []
	queue = deque([(target, 0)])
	while queue:
		node, level = queue.popleft()
		if node.val == '#':
			continue
		if level == k:
			res.append(node.val)
			continue
		node.val = '#'
		if node.parent:
			queue.append((node.parent, level+1))
		if node.left:
			queue.append((node.left, level+1))
		if node.right:
			queue.append((node.right, level+1))
	return res

#time: o(n)
#memory: o(n)
```

#review 


