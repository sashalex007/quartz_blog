---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/
#### Solution:

**Topics**: [[heap]], [[sorted order]], [[greedy]], [[simulation]]

**Intuition**
Extremely tricky problem. The key insight is that we must iterate over all possible days, because conceivably we can attend a different event on each day. Choosing which event is the tricky part. Basically, if an event starts on a particular day, we add it's end day to a min_heap because we want to prioritize events that end sooner, since there is less opportunity to attend them. 

We must sort events by start day and then iterate over days, all the while moving a pointer for events when a start day is reached. 

**Implementation**
```python
def max_attended(events):
	days = max([end for start, end in events])
	events.sort()
	res = 0
	i = 0
	min_heap = []
	
	for day in range(events[0][0], days+1):
		while min_heap and min_heap[0] < day:
			heappop(min_heap)
		while i < events[i][0] == day:
			heappush(min_heap, events[i][1])
			i += 1
		if min_heap:
			heappop(min_heap)
			res += 1
	return res

#time: o(nlogn)
#memory: o(n)
```

**Visual** 
![[IMG_DE3D3A14DF1D-1.jpeg]]


#review 
#hard 

