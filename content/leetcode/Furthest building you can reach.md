---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/furthest-building-you-can-reach/
#### Solution:

**Topics**: [[heap]], [[greedy]]

**Intuition**
This is a very nice heap problem. The idea is to keep the K largest deltas in a min_heap where K is equal to the number of ladders. I initially solved this with binary search but that approach is less optimal.

The intuition here is to only use ladders on the largest deltas seen so far! If the size of the heap exceeds K, we pop off the min_heap and subtract the popped delta from bricks. When bricks is smaller than zero, we can't make the next jump. 

This is a pretty cool application of heap because the optimal strategy is of course to use ladders on the largest deltas, and the heap allows us to keep the largest deltas seen at any moment. In a way, the strategy dynamic and self-adjusting because we can envision cases where getting to building X requires a different application of ladders (and in different order) than getting to building Y.

**Implementation**
```python
def furthest_building(heights, ladders, bricks):
	min_heap = []
	for i in range(1, len(heights)):
		delta = heights[i] - heights[i-1]
		if delta <= 0:
			continue
		heappush(min_heap, delta)
		if len(min_heap) > ladders:
			bricks -= heappop(min_heap)
		if bricks < 0:
			return i - 1
	return len(heights)-1


#time: o(nlogn)
#memory: o(n)
```

**Visual** 
![[IMG_9324E728FFCE-1.jpeg]]

#review 
#hard


