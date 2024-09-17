---
date: 2024-09-17
---
**Link:** https://leetcode.com/problems/01-matrix/
#### Solution:

**Topics**: [[BFS]]

**Intuition**
This is a nice little [[BFS]] problem. Basically this is a multi-node [[BFS]] where we populate the queue with all positions that contain  `0`, and fill in the current level for each node. 

**Implementation**
```python
def zero_one_mat(mat):
	queue = deque()
	for row in range(len(mat)):
		for col in range(len(mat[0])):
			if mat[row][col] == 0:
				queue.append((row, col, 0))
				
	visited = set()
	while queue:
		row, col, dist = queue.popleft()
		if (row, col) in visited:
			continue
		if row == len(mat) or row == -1 or col == len(mat[0]) or col == -1:
			continue
		visited.add((row, col))
		mat[row][col] = dist
		for i, j in ((1,0),(-1,0),(0,1),(0,-1)):
			queue.append((row+i, col+j, dist+1))
	return mat

#time: o(n)
#memory: o(n) visited set
```

**Mnemonic**
Imagine a virus spreading from multiply locations

**Visual** 
![[Screenshot 2024-09-17 at 8.54.43 AM.png]]

#review 


