---
date: 2024-08-15
---
**Link:** https://leetcode.com/problems/number-of-islands/
#### Solution:

**Topics**: [[DFS]], [[BFS]]

**Intuition**
Very easy graph problem. My approach was just to iterate over each cell and if the value was `1`, increment the result and the do a [[DFS]] on that cell to find all its neighbouring ones and set them to zeros so that we don't consider them again. So basically in [[in-place]] transformation of the grid to avoid using a `visited` set. 

Pretty much a classic [[connected component]] problem. 

**Implementation**
```python
def num_islands(grid):
	def dfs(row, col):
		if row == -1 or row == len(grid):
			return
		if col == -1 or col == len(grid[0]):
			return
		if grid[row][col] == '0':
			return
		grid[row][col] == '0'
		deltas = ((1,0),(0,1),(-1,0),(0,-1))
		for i, j in deltas:
			dfs(row+i, col+j)
			
	res = 0
	for row in range(len(grid)):
		for col in range(len(grid[0])):
			if grid[row][col] == '1':
				res += 1
				dfs(row, col)
	return res

#time: o(n)
#memory: o(1)
```

**Review 1**
Don't forget about in-place transformation instead of using a visited set. 

#review 


