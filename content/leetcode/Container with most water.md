---
date: 2024-11-07
---
**Link:** https://leetcode.com/problems/container-with-most-water/
#### Solution:

**Topics**: [[two pointer]]

**Intuition**
Simple problem. Took me a minute to reason about the right approach. Two pointer was the final decision because it allows us to greedily "hold on" to the tallest walls.

**Implementation**
```python
def most_water(height):
	res = 0
	l = 0
	r = len(height)-1
	while l < r:
		res = max(res, (r-l)*min(height[l], height[r]))
		if height[l] < height[r]:
			l += 1
		else:
			r -= 1
	return res

#time: o(n)
#memory: o(1)
```

#review 


