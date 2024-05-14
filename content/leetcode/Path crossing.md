
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

#review 


