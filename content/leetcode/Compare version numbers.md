---
date: 2024-09-11
---
**Link:** https://leetcode.com/problems/compare-version-numbers/
#### Solution:

**Topics**: [[two pointer]]

**Intuition**
Pretty trivial problem. One thing to note: `int(x)` in python removes leading zeros, so its the perfect function for this problem.

**Implementation**
```python
def version_nums(version1, version2):
	v1 = version1.split('.')
	v2 = version2.split('.')
	
	for i in range(max(len(v1), len(v2))):
		first = int(v1[i]) if i < len(v1) else 0
		second = int(v2[i]) if i < len(v2) else 0
		if first < second:
			return -1
		if first > second:
			return 1
	return 0

#time: o(n)
#memory: o(n)
```


#review 


