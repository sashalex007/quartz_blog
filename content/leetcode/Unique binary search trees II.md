---
date: 2024-06-27
---
**Link:** https://leetcode.com/problems/unique-binary-search-trees-ii/
#### Solution:

**Topics**: [[DFS]], [[DP]], [[recursion]], [[catalan number]]

**Intuition**
This is quite an interesting problem, and in some ways the core insight is not dissimilar to [[Balance a binary search tree]]. If we look at the constraints and nature of the problem, it's pretty clear that this is a backtracking problem... so how is it similar to [[Balance a binary search tree]]?

In [[Balance a binary search tree]], we sort the nodes (or perform an in-order traversal) and then find the parent recursively by choosing the mid in the current partition. For this problem, we must exhaust every possible option for the parent, not just the parent that guarantees a balanced tree! And of course we must do this recursively. 

An easy way to think about this is realizing that somewhere in our list of trees there MUST be at least `n-1` trees where the root (parent) is `1-n`. And this is true recursively, so when we chose a parent, the left child can be any value between `1, parent-1` and the right child can be any value between `parent+1, n`. So we can set up the recursion to return a list of left and right children for the current node!

The last step is to duplicate the parent for each combination of left and right child, because this represents all possible trees. Caching ([[DP]]) is also a useful optimization because we will have large branches in our trees (relative to each other) that are duplicated so It makes sense to store the subtrees in a memo instead of backtracking for each tree. 

**Implementation**
```python
def generate_trees(n):
	@cache
	def dfs(l, r):
		if l > r:
			return [None]
		trees = []
		for parent_val in range(l, r+1):
			left_children = dfs(1, parent_val-1)
			right_children = dfs(parent_val+1, n)
			for l_child in left_children:
				for r_child in right_children:
					parent = TreeNode(parent_val)
					parent.left = l_child
					parent.right = r_child
					trees.append(parent)
		return trees
	return dfs(1, n)

#time: o(n*catalan(n)) 
#there are (4**n)/n**1.5 unique trees with n nodes... this is the catalan number
#each unique tree takes o(n) time to build. 


#memory: o(catalan(r-l+1) + catalan(r-l+1) ...)

#the space complexity is dominated by the cache, so what is in the cache?

#the cache contains every pair (l,r), and stores every possible tree in that range

#how many unique trees are in the range (l,r)?

#its simply the catalan number with respect to k, where k equals the number of nodes in the range (l,r)...which is simply r-l+1. 
```

**Mnemonic**
Same as [[Balance a binary search tree]], but instead of picking up the string in the middle, we pick it up in every possible spot (recursively). For time/space complexity, remember a chess knight (catalan opening). 

**Visual** 
![[IMG_B941BACB21B9-1.jpeg]]

#review 
#hard 

