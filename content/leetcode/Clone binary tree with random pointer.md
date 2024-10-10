---
date: 2024-05-21
---
**Link:** https://leetcode.com/problems/clone-binary-tree-with-random-pointer/
**Almost the same:** https://leetcode.com/problems/copy-list-with-random-pointer/
#### Solution:

**Topics**: [[DFS]], [[hash map]]

**Intuition**
I think the key to this problem is understanding some of the possible edge cases and their consequences. One can conceive of a case where multiple nodes point to a single node (in their random pointers); if we are not careful we could end up creating this node more than once, or get trapped in a cycle.   

Fortunately these tree-nodes are hash able objects, so we can simply maintain a hash map `original_node: copied_node`. If the copy does not exist in our hash map, we create it...otherwise return the previously created node from the hash map. 

We can do this recursively making sure to process child nodes before the parent (we treat random pointer as a child node).

**Implementation**
```python
def clone_tree(root):
	nodes = {}
	def dfs(node):
		if node is None:
			return None
		if node in nodes:
			return nodes[node]
		copy = NodeCopy(node.val)
		nodes[node] = copy
		copy.left = dfs(node.left)
		copy.right = dfs(node.right)
		copy.random = dfs(node.random)
		return copy
	return dfs(root)

#time: o(n) traversal throught tree
#memory: o(n) storing nodes in hashmap
```

**Visual** 

![[IMG_00CA1BA139D1-1.jpeg]]

**Review 1**
Solved this one pretty quickly. Just remember to use `nodeCopy` class instead of `Node` class for creating copies. Also, remember to add copies to the hash map as soon as they are created to prevent cycles (one of the children could have a random pointer that points back to the parent). 

#review 


