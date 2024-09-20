---
date: 2024-09-20
---
**Link:** https://leetcode.com/problems/longest-repeating-substring/
#### Solution:

**Topics**: [[rabin-karp]], [[binary search]], [[Longest duplicate substring]]

**Intuition**
This is essentially the same problem as [[Longest duplicate substring]], but the constraints are not as extreme and we only need to return the length of the string, not the repeating string itself. 

There is also a [[DP]] solution but it's [[Bottom-up DP]] (which I despise) with no obvious top down implementation. 

The key idea here is that if the longest substring `s` is repeating, then `s[:-1]` is also repeating, and `s[:-2]` is also repeating and so on. This sorted order should immediately bring our attention to [[binary search]]. 

Basically, we search for a substring length in the range `1-(len(s)-1)`, and use the [[rabin-karp]] rolling hash to compare slices in `o(1)` time. 

Python has a very nice native [[rabin-karp]] implementation: 
```python
s_data = memoryview(s.encode())
```

**Implementation**
```python
def repeating_sub(s):
	def repeating(length):
		has = set()
		l = 0
		for r in range(length, len(s_data)+1):
			sub = s_data[l:r]
			if sub in has:
				return True
			else:
				has.add(sub)
			l += 1
		return False

	s_data = memoryview(s.encode())
	res = 0
	l = 0
	r = len(s)-1
	while l <= r:
		mid = (l + r) // 2
		if repeating(mid):
			l = mid + 1
			res = mid
		else:
			r = mid - 1
	return res

#time: o(nlogn)
#memory: o(n)
```

#review 


