---
date: 2024-08-20
---
**Link:** https://leetcode.com/problems/longest-common-prefix/
#### Solution:

**Topics**: [[vertical scan]]

**Intuition**
Cute little problem with a couple interesting edge cases. Simple vertical scan will do.

1. If the length of `strs` is 1, return `strs[0]`.
2. It could be the case that `strs` are all duplicates so don't rely on the exit condition to return the result.

**Implementation**
```python
def longest_pre(strs):
	if len(strs) == 1:
		return strs[0]
	res = ''
		
	for j in range(len(strs[0])):
		for i in range(1, len(strs)):
			if j == len(strs[i]) or strs[0][j] != strs[i][j]:
				return res
		res += strs[0][j]
	return res

#time:
#memory:
```

#review 


