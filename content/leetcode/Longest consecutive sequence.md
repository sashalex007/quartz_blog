---
date: 2024-11-07
---
**Link:** https://leetcode.com/problems/longest-consecutive-sequence/
#### Solution:

**Topics**: [[hash map]]

**Intuition**
Cute little problem! Had fun solving this one. The code almost writes itself. There is one key edge case though: in the second path iterate over the elements in the set to avoid duplicates...we don't want to be rechecking the same starting point...this alone can cause the algorithm to run in `o(n*n)`!

**Implementation**
```python
def longest_cons_seq(nums):
	res = 0
	has = set(nums) #first pass
	for num in has:
		if num-1 not in has:
			length = 1
			curr = num
			while curr+1 in has:
				length += 1
				curr = curr + 1
			res = max(res, length)
	return res

#time:
#memory:
```

#review 


