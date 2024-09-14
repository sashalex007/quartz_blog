---
date: 2024-09-14
---
**Link:** https://leetcode.com/problems/majority-element-ii/
#### Solution:

**Topics**: [[Boyer-Moore voting]]

**Intuition**
This is a very tricky twist on the classic [[Majority element]] problem. Basically the twist is now which elements appear at more than `n/3` times. The key insight is understanding that there can be at most 2 elements that appear more than `n/3` times. Why?

Because in the best case that `n` is divisible by 3, you would have 3 partitions of exactly `n/3` length. For an element to appear more than `n/3` times, it would have to eat into at least one partition. So in the best case, you could have two homogenous partitions that can both eat into the third partition to reach `n/3` elements. 

But how do we modify the [[Majority element]] algorithm to work with `n/3`? The idea is to use two candidates and two counts, but the key here is in disallowing them to overwrite one another or take the same value. 

**Implementation**
```python
def maj_elementII(nums):
	cand1, cand2 = None, None
	count1, count2 = 0, 0
	
	for num in nums:       
		if num == cand1:     #fold all the logic into a single conditional
			count1 += 1      #to ensure no interference between the pairs
		elif num == cand2:   #of variables
			count2 += 1
		elif count1 == 0:
			cand1 = num
			count1 = 1
		elif count2 == 0:
			cand2 = num
			count2 = 1
		else:
			count1 -= 1
			count2 -= 1

	res = []                         #validate the candidates
	for cand in (cand1, cand2):
		if cand is not None:
			count = 0
			for num in nums:
				if num == cand:
					count += 1
			if count > len(nums) // 3:
				res.append(cand)
	return res
		
#time: o(n)
#memory: o(1)
```

#review 
#hard 

