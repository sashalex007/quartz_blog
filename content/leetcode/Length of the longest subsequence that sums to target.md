---
date: 2024-09-01
---
**Link:** https://leetcode.com/problems/length-of-the-longest-subsequence-that-sums-to-target/
#### Solution:

**Topics**: [[DP]]

**Intuition**
This is a very simple 2d DP problem...classic take/skip pattern. For some reason leetcode is punishing the cached python top down solution with MLE, so we will just pre-define the memo as an array. 

**Implementation**
```python
def longest_sub(nums, target):
	dp = [[-1 for _ in range(1, target + 1)] for _ in range(len(nums))]
	def dfs(i, curr_sum):
		if curr_sum == target:
			return 0
		if curr_sum > target or i == len(nums):
			return float('-inf')
		if dp[i][curr_sum] != -1:
			return dp[i][curr_sum]
			
		take = 1 + dfs(i+1, curr_sum + nums[i])
		skip = dfs(i+1, curr_sum)
		dp[i][curr_sum] = max(take, skip)
		return dp[i][curr_sum]
	return max(dfs(0, 0), -1)
	
#time: o(n*m) n = len(nums) m = target
#memory: o(n*m)
```

#review 


