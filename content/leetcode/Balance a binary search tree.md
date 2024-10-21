---
date: 2024-06-22
---
**Link:** https://leetcode.com/problems/balance-a-binary-search-tree/
#### Solution:

**Topics**: [[DFS]], [[binary search]]

**Intuition**
The key idea here is just to gather all the nodes in sorted order and construct a new tree with the middle of the sorted nodes as the parent, and passing the left and right partitions as children respectively (recursively).

Why does this work? Because using the mid as the parent ensures that there are the same number children to the left of the parent and to the right (or not greater than one more which is ok because our depth can be off by one on either side of the tree). And because a BST has no duplicates, we can do this recursively to build a balanced BST.

**Implementation**
```python
def balance_tree(root):
	nodes = []
	def dfs(node):
		if node is None:
			return 
		dfs(node.left)
		nodes.append(node.val)
		dfs(node.right)
	dfs(root)

	def build_tree(l, r):
		if l > r:
			return None
		mid = (l + r) // 2
		parent = TreeNode(nodes[mid])
		parent.left = build_tree(l, mid-1)
		parent.right = build_tree(mid+1, r)
		return parent
		
	return build_tree(0, len(nodes)-1)
	
#time: o(n)
#memory: o(n)
```

**Mnemonic**
You pick up a string at the middle and notice that both hanging ends are the same length. Then do the same for each half until no string remains. 

**Visual** 
![[IMG_7086FD45CBEC-1.jpeg]]

**Review 1**
Classic problem. Solved it really fast. 

#review 


