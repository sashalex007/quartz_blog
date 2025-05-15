---
date: "2025-05-15"
---
**Link:** https://leetcode.com/problems/count-the-number-of-fair-pairs/
#### Solution:

**Topics**: [[two pointer]]

**Intuition**
Very interesting problem, and not a pattern that I'm very familiar with. Basically there is no way to count the pairs directly (with any efficiency), so we find the result through process of elimination. How?

Well, basically we can easily compute how many pairs satisfy `nums[i]+nums[j] <= upper` with a two pointer algorithm, but this is not the question. There will be many more pairs counted if we just satisfy `nums[i]+nums[j] <= upper` because the there is a lower bound `lower` as well. So the strategy is to find the number of pairs that satisfy `nums[i]+nums[j] <= upper` and then subtract that count by the number of pairs that DO NOT satisfy `nums[i]+nums[j] >= lower`...or in reverse we can say, DO satisfy `nums[i]+nums[j] <= lower`! 

Also, it may not be clear why a two pointer solution allows us to count all the pairs. So here is the rationale: 
```
nums = [1,2,3,4,5]  target = 6


[1,2,3,4,5]
 *       *   1+5 = 6 
notice that (1,5) is a valid pair but so is 1 combined with every value in       between! (1,2),(1,3),(1,4)....so there are 4 valid pairs here! Or simply R - L: 0 - 4! 


```

**Implementation**
```python
def countgood(nums, upper, lower):
	def count(target):
		res = 0
		l = 0
		r = len(nums)-1
		while l < r:
			total = nums[l] + nums[r]
			if total < target:
				res += r - l
				l += 1
			else:
				r -= 1
		return res
		
	nums.sort()
	return count(upper+1) - count(lower)
	
#its upper+1 because the constaint keeps us to <= upper, so to make the    function generic we add the 1. Two while loops would also be fine to use, although less clean...sum <= upper and sum < lower...basically we add the 1 to upper in the above implementation to avoid this. 

#time: nlogn
#memory: o(1)
```

#review 


