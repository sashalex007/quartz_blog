---
date: 2024-11-11
---
**Link:** https://leetcode.com/problems/reverse-integer/
#### Solution:

**Topics**: [[bit mask]]

**Intuition**
Great exercise in modulus and integer division! Very similar to [[Integer to english words]]. Some edge cases to consider, but overall not very challenging. I will mark it as hard because I tripped over a couple edge cases when testing the code.

**Implementation**
```python
def reverse(x):
	neg = -1 if x < 0 else 1
	x *= neg
	while x:
		res *= 10
		res += x % 10
		x //= 10
	res *= neg
	return res if -2**31 < res < 2**31-1 else 0
	#if this was c++ we would do the bounds check in the loop

#time: o(logn)
#memory: o(1)
```

#hard 
#review 


