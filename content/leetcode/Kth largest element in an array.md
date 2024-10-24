---
date: 2024-08-20
---
**Link:** https://leetcode.com/problems/kth-largest-element-in-an-array/
#### Solution:

**Topics**: [[heap]]

**Intuition**
Very simple and classic Kth largest/smallest problem. Simply add every number to a min heap and pop off the top when the size of the heap is greater than `k`. Return the top of the heap at the end of the loop. 

**Implementation**
```python
def kth_largest(nums):
	min_heap = []
	heapify(min_heap)
	for num in nums:
		heappush(min_heap, num)
		if len(min_heap) > k:
			heappop(min_heap)
	return min_heap[0]

#time: o(nlog(k))
#memory: o(k)
```

**Review 1**
Too easy. 

#review 


