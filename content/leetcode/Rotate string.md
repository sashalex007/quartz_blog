---
date: 2024-09-17
---
**Link:** https://leetcode.com/problems/rotate-string/
#### Solution:

**Topics**: [[string]]

**Intuition**
Funny little problem. Seems extremely easy but the optimal solution actually escaped me for some reason! Initially I solved this in `o(n*n)` time by wrapping over the string with a modulus operation, which is actually fine because the constraint is `n < 100`. I missed that you can simply verify if `goal` is a substring of `s + s`...and if `len(goal) == len(s)`! Yes, its extra memory but I think this is the best solution. 

There are some more complicated ways to solve this like the [[rabin-karp]] algorithm which can check substrings in `o(1)` time, but I won't get into it for this problem. I think doubling the string is sufficient here especially given the constraints. 

**Implementation**
```python
def rotate_string(s, goal):
	return len(goal) == len(s) and goal in s + s

#time: o(n)
#memory: o(n)
```

#review 


