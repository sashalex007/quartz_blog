---
date: 2024-09-25
---
**Link:** https://leetcode.com/problems/missing-number/
#### Solution:

**Topics**: [[math]], [[Boyer-Moore voting]], [[Majority element]]

**Intuition**
Cute little problem... perhaps not worth spending time on it but I think it offers some intuition on the [[Boyer-Moore voting]] algorithm. In this problem the missing number "sticks" to the total through subtraction, but in [[Boyer-Moore voting]] the majority element "sticks" as the candidate through counting. 

**Implementation**
```python
def missing_num(nums):
	total = 0
	for i in range(1, len(nums)+1):
		total += i
		total -= nums[i-1]
	return total

#time: o(n)
#memory: o(1)
```

#review 


