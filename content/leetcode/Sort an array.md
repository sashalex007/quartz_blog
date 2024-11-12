---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/sort-an-array/
#### Solution:

**Topics**: [[mergesort]]

**Intuition**
Simple little problem. I prefer [[mergesort]] because I understand it very well. This is a good one to do every once in a while. 

**Implementation**
```python
def sort_array(nums):
	def mergesort(curr):
		if len(curr) < 2:
			return curr
		mid = len(curr)//2
		left = mergesort(curr[:mid])
		right = mergesort(curr[mid:])
		merged = []
		i, j = 0, 0
		for _ in range(len(left)+len(right)):
			num1 = left[i] if i < len(left) else float('inf')
			num2 = right[j] if j < len(right) else float('inf')
			if num1 < num2:
				merged.append(num1)
				i += 1
			else:
				merged.append(num2)
				j += 1
		return merged
	return mergesort(nums)

#time: o(nlogn)
#memory: o(n)
```

#review 


