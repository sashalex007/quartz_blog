---
date: 2024-08-21
---
**Link:** https://leetcode.com/problems/merge-strings-alternately/
#### Solution:

**Intuition**
Extremely simple problem. In some ways similar to merging 2 sorted arrays, but without the conditional check. (and only one pointer is needed). 

**Implementation**
```python
def merge_strings(word1, word2):
	merged = ''
	i = 0
	while i < len(word1) and i < len(word2):
		merged += word1[i] + word2[i]
		i += 1
	if i < len(word1):
		merged += word1[i:]
	if i < len(word2):
		merged += word2[i:]
	return merged
	
#time: o(n+m)
#memory: o(1)
```

#review 


