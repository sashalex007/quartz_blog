---
date: 2024-06-01
---
**Link:** https://leetcode.com/problems/distribute-candies-among-children-i/
#### Solution:

**Topics**: [[permutation]]

**Intuition**
This problem seems more tricky than it really is, but the key is to look at the constraints. There can never be more than 3 children, and the limit of candies for each child can never be more than 50.

So with this information, we can compute that there are no more than `50^3` possible triplets. Thats not a whole lot, so pure brute force actually works here. Only a subset of these triplets can be valid since we must distribute ALL candies, therefore the sum of the triplet must equal the number of candies (`n`).

We can actually make a simple optimization to bring the complexity down from `n^3` to `n^2` by computing the last element in the triplet directly. If the sum of the triplet must by equal to `n`, then `k = n - (i + j)`. If `k` is greater than limit or smaller than 0, the triplet is invalid.

My first solution to this problem was an optimized DFS, but the nested for loop here is way more elegant and memory efficient.

**Implementation**
```python
def distribute_candies(n, limit):
	ways = 0
	for i in range(limit+1):
		for j in range(limit+1):
			k = n - (i + j)
			if k >= 0 and k <= limit:
				ways += 1
	return ways

#time: o(n**2)
#memory: o(1)
```

**Visual** 
![[IMG_413CF61B7ECA-1.jpeg]]

**Mnemonic:**
Triplets of children in queue entering candy store

#review 


