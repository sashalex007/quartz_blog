---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/largest-number/
#### Solution:

**Topics**: [[compare]], [[cmp_to_key]]

**Intuition**
Annoying but somewhat interesting problem! Basically it comes down to writing a custom compare function. If `int(a + b) > int(b + a)`, then `a` should come first; otherwise `b`. It's that simple. Just sort and join. 

Note that in python we have to provide a multi-argument compare function as so: `key=cmp_to_key(my_compare_function)`. Return -1 if `a` comes first, otherwise 1.

**Implementation**
```python
def largest_num(nums):
	compare = lambda a, b: -1 if int(a+b) > int(b+a) else 1
	nums = sorted([str(num) for num in nums], key=cmp_to_key(compare))
	return ''.join(nums) if nums[0] != '0' else '0'

#time: o(nlogn)
#memory: o(n)
```

#review 
#niche 


