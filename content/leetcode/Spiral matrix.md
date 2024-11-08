---
date: 2024-11-08
---
**Link:** https://leetcode.com/problems/spiral-matrix/
#### Solution:

**Topics**: [[simulation]]

**Intuition**
Fun little traversal problem! I remember doing this problem years ago and the code being incredibly long and bloated! But this time, having done many [[simulation]] problems like [[Walking robot simulation]], I instantly knew how to implement this correctly. Also, most of the time I try to do cycle prevention [[in-place]], rather than use a dedicated data structure. This came in handy here. 

**Implementation**
```python
def spiral_array(matrix):
	m = len(matrix)
	n = len(matrix[0])
	spiral = []
	dirs = [(0, 1),(1, 0),(0, -1),(-1, 0)]
	curr_dir = 0
	pos = (0, 0)
	for _ in range(m*n):
		x, y = pos
		spiral.append(matrix[x][y])
		matrix[x][y] = '#'
		i, j = dirs[curr_dir]
		if x+i == -1 or x+i == m or y+j == -1 or y+j == n or matrix[x+i][y+j] == '#':
			curr_dir += 1
			curr_dir %= 4
			i, j = dirs[curr_dir]
		pos = (x+i, y+j)
	return spiral

#time: o(n)
#memory: o(1)
```

#review 


