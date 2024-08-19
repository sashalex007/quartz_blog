---
date: 2024-08-19
---
**Link:** https://leetcode.com/problems/top-k-frequent-elements/
#### Solution:

**Topics**: [[heap]]

**Intuition**
Most **top k** problems will be related to heap. This one is very simple. The idea is to just push a tuple `(count, num)` onto a heap a pop off the heap k times and store the result. Using heap, we bring down the complexity to `o(klogn)` compared to `o(nlogn)` using sort. 

**Implementation**
```python
def top_k(nums):
	freq = {}
	for num in nums:
		freq[num] = freq.get(num, 0) + 1
	max_heap = [(-count, num) for num, count in freq.items()]
	heapify(max_heap)
	return [heappop(max_heap)[1] for _ in range(k)]

#time: o(klogn)
#memory: o(n)
```

#review 


