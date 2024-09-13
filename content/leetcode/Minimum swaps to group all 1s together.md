---
date: 2024-08-27
---
**Link:** https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together/
#### Solution:

**Topics**: [[sliding window]]

**Intuition**
This is a cute little problem. Lets make the observation that the length of the partition which connects all 1's is exactly `sum(data)`. So the idea is to check every subarray in `data` of length `sum(data)` to determine the most amount of 1's that exists in any single partition of that length. The partition with the most amount of 1's will require the least amount of swaps! We can implement this logic with a running sum.

**Implementation**
```python
def min_swaps(data):
	window = sum(data)
	most_ones = 0
	curr_sum = 0
	l = 0
	for r in range(len(data)):
		curr_sum += data[r]
		if r >= window:
			curr_sum -= data[l]
			l += 1
		most_ones = max(most_ones, curr_sum)
		
	return window - most_ones

#time: o(n)
#memory: o(1)
```

#review 


