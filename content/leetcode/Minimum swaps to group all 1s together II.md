---
date: 2024-08-27
---
**Link:** https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/
#### Solution:

**Topics**: [[sliding window]]

**Intuition**
This is essentially the same problem as [[Minimum swaps to group all 1s together]] except for the fact that the first are last element are adjacent, so the idea here is to employ 2 passes by wrapping around the array, no extra memory is required. 

**Implementation**
```python
def min_swaps(nums):
	window = sum(nums)
	most_ones = 0
	curr_sum = 0
	l = 0
	for r in range(len(nums)*2):
		curr_sum += nums[r % len(nums)]
		if r >= window:
			curr_sum -= nums[l % len(nums)]
			l += 1
		most_ones = max(most_ones, curr_sum)
	return window - most_ones

#time: o(n)
#memory: o(1)
```

#review 


