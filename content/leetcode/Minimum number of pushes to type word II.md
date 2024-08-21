---
date: 2024-08-21
---
**Link:** https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/
#### Solution:

**Topics**: [[hash map]], [[math]]

**Intuition**
Quite a simple problem...not much to it. Basically, the key insight is that the words should be prioritized by frequency. So more frequent words deserve higher placement in the mapping. The implementation is somewhat trivial. We can also use heap but there is no point. 

**Implementation**
```python
def min_pushes(word):
	freq = {}
	for char in word:
		freq[char] = freq.get(char, 0) + 1
	priority = sorted([count for count in freq.values()])

	res = 0
	for i, count in enumerate(priority[::-1]):
		res += ((i // 8) + 1) * count
	return res
		

#time: o(n)
#memory: o(n)
```

#review 


