---
date: 2024-09-28
---
**Link:** https://leetcode.com/problems/path-sum-iii/
#### Solution:

**Topics**: [[DFS]], [[back tracking]], [[Path sum II]], [[Subarray sum equals k]]

**Intuition**
This is a great problem that combines the classic path sum problems with the classic [[Subarray sum equals k]]. Basically the idea is to traverse the tree with a [[DFS]] while maintaining a hash map of the sums in the current path. 

Also, instead of maintaining a separate copy of the hash-map for every path, we can simply use backtracking to use a single global hash map. This is possible because in a [[DFS]], after a path has been terminated, it pops itself off in reverse order of the path, so we can just clean the hash map in post-order. 

**Implementation**
```python
def path_sum3(root, targetSum):
	self.count = 0
	self.sums = {0:1}
	self.sum = 0
	def dfs(node):
		if node is None:
			return 
		self.sum += node.val
		if self.sum-targetSum in self.sums:
			self.count += self.sums[self.sum-targetSum]
		self.sums[self.sum] = self.sums.get(self.sum, 0) + 1
		dfs(node.left)
		dfs(node.right)
		self.sums[self.sum] -= 1
		self.sum -= node.val
	dfs(root)
	return self.count
		
#time: o(n)
#memory: o(n)
```

**Visual** 
Same as [[Path sum II]]

#review 


