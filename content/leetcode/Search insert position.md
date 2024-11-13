---
date: 2024-11-13
---
**Link:** https://leetcode.com/problems/search-insert-position/
#### Solution:

**Topics**: [[binary search]]

**Intuition**
Cute problem. Simple binary search, but remember to return the **rightmost** index. 

**Implementation**
```python
def search_insert(nums, target):
	l = 0
	r = len(nums)-1
	while l <= r:
		mid = (l + r) // 2
		if nums[mid] == target:
			return mid
		elif nums[mid] < target:
			l = mid + 1
		else:
			r = mid - 1
	return r + 1

#time: o(logn)
#memory: o(1)
```

#review 


