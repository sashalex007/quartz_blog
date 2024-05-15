---
date: 2024-05-15
---
**Link:** https://leetcode.com/problems/arithmetic-slices-ii-subsequence/
#### Solution:

**Topics**: [[subarray]], [[hash map]], [[Arithmetic slices]]

**Intuition**
This is a very tricky problem. The idea is to keep a hash map for each index and keep a count of each difference between the current element and previous elements seen before it. Basically if in the future that difference is seen again, we have formed a valid arithmetic subsequence.  

In principle, the implementation is fairly simple but the intuition to come up with this solution, I would say is very hard. 

**Implementation**
```python
def arithmetic_subs(nums):
	res = 0
	diffs = [{} for _ in range(len(nums))]
	for i in range(1, len(nums)):
		for j in range(i):
			diff = nums[i] - nums[j]
			diffs[i][diff] = diffs[i].get(diff, 0) + 1
			if diff in diffs[j]:
				res += diffs[j][diff]
				diffs[i][diff] += diffs[j][diff]
	return res

#time: o(n**2)
#memory: o(n**2)
```

**Visual** 
![[IMG_4CF455CA3179-1.jpeg]]


#review 
#hard 


