---
date: 2024-08-26
---
**Link:** https://leetcode.com/problems/meeting-rooms-ii/
#### Solution:

**Topics**: [[heap]]

**Intuition**
Very classic heap problem. The key idea here is to sort the meetings by start time and then add end times to a min_heap. If the top of the heap is smaller or equal to the current start time, this means that the event has ended, so we pop off the heap. 

Thus, the heap essentially simulates the number of active meetings, and the length represents the number of rooms that would be needed at that point in time. The max size of the min_heap at any point in time is in fact the minimum number of rooms required to host all the meetings. 

**Implementation**
```python
def meeting_rooms2(intervals):
	rooms = 0
	intervals.sort()
	min_heap = []
	for start, end in intervals:
		while min_heap and start >= min_heap[0]:
			heappop(min_heap)
		heappush(min_heap, end)
		rooms = max(rooms, len(min_heap))
	return rooms

#time: o(nlogn)
#memory: o(n)
```

#review 


