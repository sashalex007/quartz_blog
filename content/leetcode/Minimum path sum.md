---
date: 2024-09-08
---
**Link:** https://leetcode.com/problems/minimum-path-sum/
#### Solution:

**Topics**: [[DP]]

**Intuition**
Pretty trivial DP problem, of course [[Dijkstra's]] also works here but its way overkill. We should immediately understand this as DP because at each node we have to make a decision: go right or go down. Which one do we choose? We don't know, and can't know until we reach the end. 

For example:
```
1 1 1 1
1 2 2 3
1 1 1 1

We see that in the above matrix, going all the way down/right and all the way right/down has the some cost until the right/down path reaches the 3. So it stands to reason that we must consider both options until the termination of each respective path.
```

**Implementation**
```python
def min_path(grid):
	@cache
	def dfs(i, j):
		if i == len(grid) or j == len(grid[0]):
			return float('inf')
		if i == len(grid)-1 and j == len(grid[0])-1:
			return grid[i][j]
		right = grid[i][j] + dfs(i+1, j)
		down = grid[i][j] + dfs(i, j+1)
		return min(right, down)
	return dfs(0, 0)

#time: o(n*m)
#memory: o(n*m)
```

**Visual** 
![[IMG_BDAE6A2FFBC3-1.jpeg]]

#review 


