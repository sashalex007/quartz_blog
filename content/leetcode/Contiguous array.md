---
date: 2024-07-20
---
**Link:** https://leetcode.com/problems/contiguous-array/
#### Solution:

**Topics**: [[hash map]], [[Subarray sum equals k]]

**Intuition**
This problem is an interesting twist on the classic [[Subarray sum equals k]] problem. The technique used is essentially the same, but we need to transform it a little bit. We can conceptually transform the problem by imagining that the zero's have are -1's....if we do this then we have reframed the problem into "longest subarray with a sum of 0". 

In [[Subarray sum equals k]] we keep track of the frequency of sums but in this problem we simply need the longest subarray of sum `k=0`. Using the technique from [[Subarray sum equals k]], we can at least know **when** there is is a subarray of sum zero if the current sum has been encountered before (because `0 = curr_sum - curr_sum`). The last bit of the problem to solve is **what to store in our hash map** such that we can compute the length of the 0 sum partition! 

We can store the index of course but which one? We must store the first index of `curr_sum` that we see because it guarantees that the computed length will be the longest!

The notable edge case is if the sum of the entire array is 0...in which case we should initialize our hash map with `0: -1` because `length = i - sums[curr_sum]`. In the case that we take the whole array, `i == len(nums)-1` the length formula computes the correctly. 

**Implementation**
```python
def contiguous_array(nums): 
	res = 0
	sums = {0:-1}
	curr_sum = 0
	for i, num in enumerate(nums):
		curr_sum += 1 if num == 0 else -1
		if curr_sum in sums:
			length = i - sums[curr_sum]
			res = max(res, length)
		else:
			sums[curr_sum] = i
	return res
			
#time: o(n)
#memory: o(n)
```

**Mnemonic**
Same as [[Subarray sum equals k]], but remember to store index instead of frequency.

**Visual** 
Same as [[Subarray sum equals k]].

**Review 1**
Slightly harder than [[Subarray sum equals k]], but still not very challenging. Remember to convert `0` to `-1` to maintain the balance. 

#review 


