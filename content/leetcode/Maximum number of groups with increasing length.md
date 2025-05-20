---
date: "2025-05-19"
---
**Link:** https://leetcode.com/problems/maximum-number-of-groups-with-increasing-length
#### Solution:

**Topics**: [[binary search]], [[triangular matrix]]

**Intuition**
This is a truly insane problem. There is a greedy solution but I'll stick to the binary search version. All my insights here come from this great editorial, so revise it if not clear: https://leetcode.com/problems/maximum-number-of-groups-with-increasing-length/solutions/3807567/o-nlogn-binary-search-find-lower-triangular-matrix-easy-to-understand. 

Basically we have to imagine the usage limits as a triangular matrix in decreasing order. For example:

```
limits = [1,2,3]

...or [3,2,1] in decreasing order

3 2 1
-----
0
0 1
0 1 2

In the above, the usage limits are organized in a lower triangular matrix, with the freqency of each number represented by the vertical count of numbers. 

What's cool here is that the rows are the groups, and guaranteed to be distinct!

This is a very simple case because as it happens, these limits already create a perfect triangular matrix with 3 rows.
```

More complex example:

```
limits = [3, 3, 3, 1]

3 3 3 1
-------
0 1 2
0 1 2
0 1 2 3

Lets say we want to determine if 4 rows can be made. Well, its not possible right because you would need at least 4 zeros right? NO! 

Here we indtroduce the concept of "filling the gaps" in our triangular matrix. Lets dive into how it works:

0 1 2
0 1 2
0 1 2 3
^ Needs 4, has only 3....therefore this is a gap is 4-3. GAP = 1
  ^ Needs 3, has 3....gap is unchanged. GAP = 1
    ^ Needs 2, has 3...so we can CONTRIBUTE a single 2 towards filling the gap!
      Virtually, the triangle now looks as such:      
      
2 -> put the 2 here!  
0 1 
0 1 2
0 1 2 3
	  ^ Needs 1, has 1. 4 groups CAN BE MADE because the gap is 0! 

```

Note that we can only fill the gap backwards to avoid duplicates. Why? Consider this case:

```
limits = [5, 2, 1, 1]
rows = 4

0
0
0 
0 1 
0 1 2 3

^ Needs 4, has 5....so we can contribute 1 to a future gap?
  ^ Needs 3, has 2...so we can use the previous extra to fill in the gap?
    Lets try:


0
0 
0 1 0 -> move a zero here
0 1 2 3

Lets look at this virtual row we just created [0,1,0]. This row is INVALID because it is not distinct!

```


**Implementation**
```python
def max_groups(usageLimits):
	usageLimits.sort(key=lambda x: -x)
	n = len(usageLimits)
	def can_make(groups):
		gap = 0
		for i in range(n):
			if usageLimits[i] < groups:
				gap += groups - usageLimits[i]
			else:
				if gap > 0:
					can_give = usageLimits[i] - groups
					gap = max(gap - can_give, 0)
					
			if groups:
				groups -= 1 
				
		return gap == 0

	l = 1
	r = n
	while l <= r:
		mid = (l + r) // 2
		if can_make(mid):
			l = mid + 1
		else:
			r = mid - 1
	return l - 1

#time: o(nlogn)
#memory: o(1)
```

#review 
#hard 
#insane 
#niche 

