---
date: 2024-08-10
---
**Link:** https://leetcode.com/problems/group-anagrams/
#### Solution:

**Topics**: [[hash map]]

**Intuition**
Cute little problem. Not much to it though. Just keep a hash map with the frequency as the value (tuple or sorted string).

**Implementation**
```python
def group_ana(strs):
	words = {}
	for word in strs:
		freq = [0] * 26
		for char in word:
			freq[ord(char)-ord('a')] += 1
		freq = tuple(freq)
		if freq not in words:
			words[freq] = []
		words[freq].append(word)
	return words.values()

#time: o(nk) k = max word length
#memory: o(nk)
```

**Review 1**
Sorted string solution is much more elegant and memory efficient...although technically a bit slower in the worst case.

#review 


