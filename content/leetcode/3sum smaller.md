---
date: 2024-09-03
---
**Link:** https://leetcode.com/problems/3sum-smaller/
#### Solution:

**Topics**: [[3sum]], [[3sum closest]], [[Two sum II]]

**Intuition**
Tricky little problem in the 3sum pattern, but its a good one. The key is to look for the target with the [[two pointer]] technique, and every time the value is smaller, we increase the result...but by how much? 

The key insight here is understanding that if `nums[i] + nums[l] + nums[r] < target` , then ALL values for `r` between `l (exclusive)` and `r (inclusive)` would also create a triplet smaller than `target`. This is the case because in the 3sum pattern, `nums` is sorted. 

For example:
```
target = 10
nums = [1,2,3,4,5,6]

[1,2,3,4,5,6]
 ^ ^       ^
 i l       r

nums[i] + nums[l] + nums[r] = 9

The total is les than 10, definitely we have found at least one triplet, but look closely at the values between l and r...

[1,2,3,4,5,6]
 ^ ^ - - - ^
 i l       r

If we shift the r pointer anywhere between r and l, the new triplet sum is guaranteed to be smaller than target (because nums is sorted).

So we need to add these newly formed triplets to the result. In this case there are 4 triplets to be added (r = 3,4,5,6)... 

or simply r - l (5-1) = 4
```

**Implementation**
```python
def 3sum_smaller(nums, target):
	nums.sort()
	res = 0
	for i in range(len(nums)-2):
		l = i + 1
		r = len(nums) - 1
		while l < r:
			total = nums[i] + nums[l] + nums[r]
			if total >= target:
				r -= 1
			else:
				res += r - l
				l += 1
	return res

#time: o(n**2)
#memory: o(1)
```

#review 


