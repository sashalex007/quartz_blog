---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/path-crossing/
#### Solution:

**Topics**: [[graph]], [[set]]

**Intuition**
Very simple graph problem. The idea is to traverse the coordinates and keep them in a set. If a new coordinate is in the set, return True.

**Implementation**
```python
def path_crossing(path):
	curr = [0, 0]
	seen = set([tuple(curr)])
	for direction in path:
		if direction == 'N':
			curr[0] += 1
		if direction == 'E':
			curr[1] += 1
		if direction == 'S':
			curr[0] -= 1
		if direction == 'W':
			curr[1] -= 1

		if tuple(curr) in seen:
			return True
		else:
			seen.add(tuple(curr))
	return False

#time: o(n)
#memory: o(n)
```

**Visual** 
![[IMG_4E2C673D9ECD-1.jpeg]]

**Review 1**
Easy problem, but the implementation above is kind of ugly and does not translate well to other problems of this type such as [[Walking robot simulation]]. Do this instead:

**Implementation (generic)**
```python
def path_cross(path)
	visited = set([(0, 0)])
	x, y = 0, 0
	dirs = {'N':(0,1),'S':(0,-1),'E':(1,0),'W':(-1,0)}
	for d in path:
		i, j = dirs[d]
		if (x+i, y+j) in visited:
			return True
		x, y = x+i, y+j
		visited.add((x, y))
	return False
```

#review 

