---
date: 2024-06-04
---
**Link:** https://leetcode.com/problems/kill-process/
#### Solution:

**Topics**: [[DFS]], [[simulation]]

**Intuition**
This is pretty clearly a tree problem. We just have to traverse every node starting at the `kill` node and put all those nodes in a list. The approach is clear but the tree must be simulated because the edges are in an non-standard form. 

The relationships can be refactored into an adjacency list...then the traversal and collection of killed nodes becomes trivial. 

**Implementation**
```python
def kill_process(pid, ppid, kill):
	adj = {}
	for child_index, parent in enumerate(ppid):
		if parent not in adj:
			adj[parent] = []
		adj[parent].append(pid[child_index])

	killed = []
	def dfs(id):
		killed.append(id)
		if id not in adj:
			return
		for child_id in adj[id]:
			dfs(child_id)
	dfs(kill)
	return killed


#time: o(n) worst case the killed node is the root
#memory: o(n) stack space
```

**Mnemonic**
Your are in an apple orchard feeling very ADJitated. In your agitation, you cut a branch off a tree and the branch dies. You count the withered sub-branches and leaves. 

**Visual** 
![[IMG_4CB90D787157-1.jpeg]]

#review 


