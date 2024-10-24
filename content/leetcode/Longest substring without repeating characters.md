---
date: 2024-08-19
---
**Link:** https://leetcode.com/problems/longest-substring-without-repeating-characters/
#### Solution:

**Topics**: [[sliding window]], [[set]]

**Intuition**
Trivial sliding window problem. The idea here is to shrink the window while the current character exists in the set. After ensuring it's not in the set, add it to the set and the length of the set is the length of the current substring with only unique characters. 

**Implementation**
```python
def longest_unique_sub(s):
	res = 0
	chars = set()
	l = 0
	for r in range(len(s)):
		while s[r] in chars:
			chars.remove(s[l])
			l += 1
		chars.add(s[r])
		res = max(res, len(chars))
	return res

#time: o(n)
#memory: o(n)
```

**Review 1**
Nice problem. Move on. 

#review 


