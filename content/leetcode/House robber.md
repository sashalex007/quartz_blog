---
date: 2024-11-10
---
**Link:** https://leetcode.com/problems/house-robber/
#### Solution:

**Topics**: [[DP]]

**Intuition**
Too easy of a DP problem. Not really worth saying anything about this one. Just be disciplined about the base case because on the `take` branch we are incrementing the index by 2. 

**Implementation**
```python
def house_robber(nums):
	@cache
	def dp(i):
		if i >= len(nums): #greater or equal to because of the +2 branch
			return 0
		take = nums[i] + dp(i+2)
		skip = dp(i+1)
		return max(take, skip)
	return dp(0)

#time: o(n)
#memory: o(n)
```

#review 


