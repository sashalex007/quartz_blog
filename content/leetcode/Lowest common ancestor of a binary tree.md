---
date: 2024-08-21
---
**Link:** https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
#### Solution:

**Topics**: [[DFS]]

**Intuition**
This is not the most difficult tree problem, but the implementation can become very bloated without the right strategy. The idea is to propagate either `True` or `False` up to the parent node (`True` if the node is either `p` or `q`, `False` otherwise). So if the returned values of left and right branches are both `True`, then this is the parent node. 

A notable edge case is if the current node is itself the lowest common ancestor...in which case we, must account for that. Python supports boolean addition (`False = 0, True = 1`) , which allows for an extremely clean implementation here.

**Implementation**
```python
def lowest_common_anc(self, root, p, q):
	self.res = None
	def dfs(node):
		if node is None:
			return False
		left = dfs(node.left)
		right = dfs(node.right)
		current = (node == p) or (node == q)
		if left + right + current == 2:
			self.res = node
		return current or left or right
	dfs(root)
	return self.res
		
#time: o(n)
#memory: o(n)
```

**Mnemonic**
You are turning on a faucet. You turn on the cold water, and then the hot water. The faucet is the lowest common ancestor for the cold and hot stream. 

**Visual** 
![[IMG_388F9F9ECD46-1.jpeg]]

#review 


