---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/partition-array-for-maximum-sum/
#### Solution:

**Topics**: [[DP]], [[DFS]], [[skipping]]

**Intuition**
The trickiest thing about this problem in realizing that there is no greedy solution. The constraints hint at this as well. Max in subarray brings monotonic stack to mind, but there is no way to decide how long the subarray should be in the optimal case. 

An optimized DP is the only solution because each index has an optimal solution, and we can cache that. Constructing the DP is a little bit tricky but it comes down to iterating from 0 to K and keeping track of the maximum value and the current sum (which is the maximum value multiplied by whatever iteration we are on). The code is pretty self explanatory. 

**Implementation**
```python
def max_sum_part(arr, k):
	@cache
	def dfs(i):
		if i == len(arr):
			return 0
		max_sum = float('-inf')
		curr_max = float('-inf')
		for j in range(i, min(i+k, len(arr))):
			curr_max = max(curr_max, arr[j])
			curr_sum = curr_max*(j-i+1) + dfs(j+1)
			max_sum = max(max_sum, curr_sum)
		return max_sum
	return dfs(0)
			

#time: o(n*k) #because of the inner looping
#memory: o(n) #solution for every index
```

**Visual** 
![[IMG_97AFCFA4449C-1.jpeg]]

**Review 1**
Great problem. Solved it pretty fast. The key is realizing that this is a subsequence problem. Why? Because all the different contiguous splits are just contiguous subsequences! 

#review 


