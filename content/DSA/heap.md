---
date: 2024-05-13
---

**DSA:** [[sorted order]], [[subarray]]

**Intuition**
Heaps are incredibly useful for problems that have some kind of sorted property, and a subarray is usually the structure of interest. 

**Implementation**
```python
min_heap = []
smallest_seen_at_every_index = []
for num in nums:
	heappush(heap, num)
	smallest_seen_at_every_index.append(heap[0])
return smallest_seen_at_every_index
```

**Visual** 
![[IMG_5B3494DC8C5B-1.jpeg]]

