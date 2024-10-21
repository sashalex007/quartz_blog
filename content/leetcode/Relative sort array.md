---
date: 2024-07-18
---
**Link:** https://leetcode.com/problems/relative-sort-array/
#### Solution:

**Topics**: [[hash map]]

**Intuition**
Cute little problem involving a hash map. I won't go into detail because the solution is trivial if you know how to use a frequency map. 

**Implementation**
```python
def relative_sort(arr1, arr2):
	freq = {num:0 for num in arr2}
	extra = []
	for num in arr1:
		if num in freq:
			freq[num] += 1
		else:
			extra.append(num)
	extra.sort()
	nums = []
	for num in arr2:
		for _ in range(freq[num]):
			nums.append(num)
			
	return nums + extra
	

#time: o(n)
#memory: o(n)
```

**Review 1**
Too easy. 

#review 


