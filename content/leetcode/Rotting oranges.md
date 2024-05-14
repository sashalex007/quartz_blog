
**Link:** https://leetcode.com/problems/rotting-oranges/
#### Solution:

**Topics**: [[BFS]]

**Intuition**
Not much to this problem other than being mindful of some edge cases introduced by the problem statement. 

Some considerations:
1. if there is an isolated component of fresh oranges, its impossible for them to become rotten.
2. if all oranges are already rotten, then zero time is required for all to become rotten.

Other than these considerations, the problem is a basic BFS with cycle prevention. We can use the grid itself for cycle prevention instead of creating more memory for a visited set.

**Implementation**
```python
def rotting_oranges(grid):
	queue = deque()
	for row in range(len(grid)):
		for col in range(len(grid[0])):
			if grid[row][col] == 2:
				queue.append((row, col, 0))
	res = 0
	while queue:
		row, col, time = queue.popleft()
		if row == -1 or row == len(grid):
			continue
		if col == -1 or col == len(grid[0]):
			continue
		if grid[row][col] == 0 or grid[row][col] == 3:
			continue
		res = time
		grid[row][col] = 3
		delta = [(1, 0), (0, 1), (-1, 0), (0, -1)]
		for i, j in delta:
			queue.append((row+i, col+j, time + 1))
	
	for row in range(len(grid)):
		for col in range(len(grid[0])):
			if grid[row][col] == 1:
				return -1
	return res

#time: o(n)
#memory: o(n) because worst case every orange is rotten therefore all nodes
#             would be added to the queue
```

**Visual** 
![[IMG_6749BA78E11B-1.jpeg]]

#review 


