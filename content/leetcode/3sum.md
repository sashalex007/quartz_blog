---
date: 2024-08-07
---
**Link:** https://leetcode.com/problems/3sum/
#### Solution:

**Topics**: [[two pointer]], [[Two sum II]], [[two sum]]

**Intuition**
This is an interesting problem, I had not done [[Two sum II]] previously so I initially solved it with the hash map solution which is very memory intensive and difficult to avoid duplicates. The [[two pointer]] solution is the perfect algorithm here. Note that the brute force solution is to generate all possible triplets which is `n**3`, so `n**2` should be the goal...I spent a bit of time debating if there is a linear solution without first considering if `n**2` is the best we can achieve.

The key here is to use the same technique as [[Two sum II]], but for each element as the possible starting point (hence `n**2`). We can eliminate duplicates by either eliminating all the duplicates in the array beforehand, or shifting pointers in our algorithm until a new value has been reached (the array must first be sorted of course). 

**Implementation**
```python
def three_sum(nums):
	nums.sort()
	res = []
	start = 0
	while start < len(nums)-2:
		l = start+1
		r = len(nums)-1
		while l < r:
			total = nums[start] + nums[l] + nums[r]
			if total == 0:
				res.append((nums[start], nums[l], nums[r]))
				r -= 1
				l += 1
				while l < r and nums[l] == nums[l-1]:
					l += 1 
			elif total > 0:
				r -= 1
			else:
				l += 1
				
		start += 1
		while start < len(nums)-2 and nums[start] == nums[start-1]:
			start += 1
	return res
		
#time: o(n**2)
#memory: o(1)
```

**Mnemonic**
Same as [[Two sum II]] but imagine that we have a third person and the target is the average of all 3 laser lines. 

**Review 1**
Great problem. Remember two things:
1. Use while loops
2. while `nums[i] == nums[i+1]` increment `i`. Remember to increment once more after the loop! 

#review 
#hard 


