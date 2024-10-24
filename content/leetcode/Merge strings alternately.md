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

**Review 1**
Not a huge fan of the above implementation. There is no need to treat `word1` so generically. Just iterate over it and add the remainder from `word2` if it exists. 

```python
def merge_strings(word1, word2):
	res = ''
	for i in range(len(word1)):
		res += word1[i]
		if i < len(word2):
			res += word2[i]
	return res + word2[i+1:]
```

#review 


