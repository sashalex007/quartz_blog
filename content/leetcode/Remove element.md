---
date: 2024-11-13
---
**Link:** https://leetcode.com/problems/remove-element/
#### Solution:

**Topics**: [[in-place]]

**Intuition**
Honestly, this quite tricky to come up with if you are committed to a 1-pass solution. I kept hitting edge cases in 1 pass so I threw in the towel and just ran a second pass to count the elements that were not equal to `val`. 

1-pass solution is kind of subtle but it does make sense. I'm tagging this as hard because of the 1-pass edge cases (two pass is trivial). 

**Implementation**
```python
def remove(nums, val):
	l = 0
	r = len(nums)-1
	while l <= r:
		if nums[l] == val:
			nums[l], nums[r] = nums[r], nums[l]
			r -= 1
		else:
			l += 1
	return l

#timer: o(n)
#memory: o(1)
```

#review 
#hard 


