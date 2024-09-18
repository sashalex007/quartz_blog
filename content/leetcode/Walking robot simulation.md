---
date: 2024-09-18
---
**Link:** https://leetcode.com/problems/walking-robot-simulation/
#### Solution:

**Topics**: [[simulation]]

**Intuition**
This is not a very difficult problem, but it has some edge cases that must be considered. My first solution was a very bloated implementation, so If anything it's a clean implementation challenge. 

**Implementation**
```python
def walking_robot(commands, obstacles):
	obstacles = set([tuple(obs) for obs in obstacles])
	dirs = ((0, 1), (1, 0), (0, -1), (-1, 0))
	max_dist = 0
	curr_dir = 0
	x, y = 0, 0
	for c in commands:
		if c == -1:
			curr_dir += 1
			curr_dir %= 4
		elif c == -2:
			curr_dir -= 1
			curr_dir %= 4
		else:
			a, b = dirs[curr_dir]
			for _ in range(c):
				if (x+a, y+b) in obstacles:
					break
				x += a
				y += b
			max_dist = max(max_dist, x*x + y*y)
	return max_dist

#time: o(9n)
#memory: o(len(obstacles))
```


#review 


