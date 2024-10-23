---
date: 2024-08-15
---
**Link:** https://leetcode.com/problems/merge-intervals/
#### Solution:

**Topics**: [[intervals]]

**Intuition**
Not much to this problem, besides some somewhat annoying implementation. First sort the intervals (like in most interval problems).  Basically there are three cases. 

1. The interval is disjoint from the previous interval `[1,2],[3,4]`
2. The interval is overlapping the previous interval `[1,3],[2,6]`
3. The interval is contained within the previous interval `[1,5],[2,4]`

In the first case, add the disjoint interval to the merged list, in the second case, swap the previous `end` with the `new_end`, in the third case do nothing. 

**Implementation**
```python
def merge_intervals(intervals):
	intervals.sort()
	merged = [intervals[0]]
	for i in range(1, len(intervals)):
		prev_start, prev_end = merged[-1]
		start, end = intervals[i]
		if start > prev_end:
			merged.append([start, end])
		elif start <= prev_end and end > prev_end:
			merged[-1][1] = end
	return merged
	
#time: o(n)
#memory: o(1)
```

**Mnemonic**
You are the first person in a very strange line. The line is set up in such a way that boxes are drawn on the ground indicating where you have to stand. You MUST stand within the boundaries of a box or come to an agreement with others around you to connect your boxes together and share the space. 

The rules of the line are such: If a person comes along who is too big for their box, you allow them to connect their box to yours and share the space. If a person comes along who is small enough to fit in the space that you have in your box, we allow them to be in our box. If someone comes along who is too big for the space in your box,  yet would fit in their own, they occupy a new box. 

**Visual** 
![[IMG_C3C504003A45-1.jpeg]]

**Review 1**
Don't forget about the following edge-case:

```
[1,5],[2,3]

2,3 is contained within 1,5 so do nothing. 
```

#review 


