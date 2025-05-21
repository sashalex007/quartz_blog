---
date: "2025-05-21"
---
**Link:** https://leetcode.com/problems/allocate-mailboxes/
#### Solution:

**Topics**: [[DP]]

**Intuition**
Very difficult [[DP]] problem, and it's the first one in a while that I actually struggled with. The key insight is important, but the code itself took me a while to formalize. 

Essentially, if we only have one mailbox to distribute (`k=1`), then the the optimal location will always be the **median** of the houses! 

So what if `k > 1?` Well in this case, we have to partition the array into `k` partitions every possible way, and compute the sum of the median for each! Use DP to minimize. 

This threw my brain for a loop...how do you partition an array into exactly `k` parts in every possible way? Then I remembered the technique used in [[Combination sum II]]. Not that common in [[DP]] problems but we can use the same inner loop to force `k` partitions! We just have to remember to decrement `k` every time we branch off into a new partition. 

**Implementation**
```python
def allocate(houses, k):
	houses.sort()
	@cache
	def dfs(i, mailboxes):
		if i == len(houses) and mailboxes == 0:
			return 0
		if i == len(houses):
			return float('inf')

		min_dist = float('inf')
		for j in range(i, len(houses)):
			mid = (j + i) // 2 
			res = 0
			for x in range(i, j+1):
				res += abs(houses[x]-houses[mid])
			min_dist = min(min_dist, res + dfs(j+1, mailboxes - 1))
		return min_dist
		
	return dfs(0, k)
		

#time: o(n*n*n*k)
#memory: o(n*k)
```

#hard 
#insane 
#review 


