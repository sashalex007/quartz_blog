---
date: 2024-08-22
---
**Link:** https://leetcode.com/problems/longest-palindromic-substring/
#### Solution:

**Topics**: [[grow]]

**Intuition**
This is actually a pretty easy problem with a somewhat annoying implementation. Basically, at every index we try to created the longest possible palindrome. The only way to do that is to assume the index is at the centre, and then expand in both left and right directions. 

This will work for palindromes of odd length, however we must also check palindromes of even length where the centre is two elements! 

A notable optimization here is to keep the longest palindrome as a tuple `(l, r)` because slicing is a `o(n)` operation. This way, we will only have to slice once when we return the result. 

**Implementation**
```python
def longest_palin(s):
	def grow(l, r):
		if l != r and s[l] != s[r]:
			return (l, l)
		rang = (l, r)
		while l > -1 and r < len(s) and s[l] == s[r]:
			rang = (l, r)
			l -= 1
			r += 1
		return rang

	compare = lambda x: x[1]-x[0]
	longest = (0, 0)
	for i in range(len(s)-1):
		longest = max(longest, grow(i, i), grow(i, i+1), key=compare)
	return s[longest[0]:longest[1]+1]

#time: o(n**2)
#memory: o(1)
```

#review 


