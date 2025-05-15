---
date: "2025-04-27"
---
**Link:** https://leetcode.com/problems/the-skyline-problem/
#### Solution:

**Topics**: [[heap]]

**Intuition**
It was very difficult for me to interpret this problem into something I could understand. I initially thought we could use a stack approach kind of similar to [[Erect the fence]], but this was totally wrong. 

If we look at the examples, the coordinates of the skyline are created by taking the tallest building that intersects at every unique position x! And from here we don't need to think long to realize that we can use a `max_heap` to track the tallest buildings! This problem is quite similar to [[Maximum number of events that can be attended]], and other heap problems in the sense that we will "start" a building when it intersects with x and end it when it no longer intersects! 

![[IMG_399C1067AEE2-1.jpeg]]

The one edge case is that we are not permitted to have same adjacent heights in the result so this must be accounted for

**Implementation**
```python
def skyline(buildings):
	positions = set()
	for x1, x2, _ in buildings:
		positions.add(x1)
		positions.add(x2)
	positions = sorted(list(positions))
	buildings.sort()

	res = []
	max_heap = []
	i = 0
	for x in positions:
		while max_heap and max_heap[0][1] <= x:
			heappop(max_heap)

		while i < len(buildings) and buildings[i][0] <= x < buildings[i][1]:
			_, end, height = buildings[i]
			heappush(max_heap, (-height, end))
			i += 1

		max_h = -max_heap[0][0] if max_heap else 0
		if res and res[-1][1] == max_h:
			continue
		res.append((x, max_h))
		
	return res
			

#time: nlogn
#memory: n
```

I'm tagging this as insane because my thought process totally failed me for this one. 

#review 
#hard 
#insane 
