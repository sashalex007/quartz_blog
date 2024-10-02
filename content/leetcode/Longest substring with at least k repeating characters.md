---
date: 2024-10-02
---
**Link:** https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/
#### Solution:

**Topics**: [[divide and conquer]]

**Intuition**
This is really a fantastic problem, and I really enjoyed solving it. Initially I thought it could be solved similar to [[Find the longest substring containing vowels in even counts]] (just a variation on [[Subarray sum equals k]] and [[Contiguous array]]), but what changes everything is the "at least k" part of the problem statement!

Lets think about how you would solve this if it were simply a true/false problem. Basically, you would construct a frequency map of the characters and if one of the counts were less than `k`, we would return false, otherwise true. How does this help us?

Imagine that we have a string `s` whose frequency map has a character of a count that is less than `k`. What does this tell us? It tells us that the final substring (if it exists) is **guaranteed** not to contain the offending character. So can we just split `s` by the offending character and return the largest substring in that array? No!

If we split by the offending character, we have created a bunch of new strings with their own frequency counts, and the act of splitting could have created more offending characters that were previously not offending! 

For example:
```
s = aabaa k=3

counts = a:4, b:1

the character 'b' is offending, split by b. 

splits = [aa, aa]
           ^   ^   now 'a' is offending in both substrings. 
```

It should be clear at this point that we can use a [[divide and conquer]] strategy with recursion! The base case will be if `len(s) < k` because that precludes a result and the second base case will be if all counts are greater than `k`! If we make it past the base case, then we just split by offending characters and recurse on the substrings!

**Implementation**
```python
def longest_sub(s, k):
	self.res = 0
	def dfs(s):
		if len(s) < k:
			return 
		freq = {}
		for char in s:
			freq[char] = freq.get(char, 0) + 1
		split_by = set(['#'])
		for char, count in freq.items():
			if count < k:
				split_by.add(char)
		if len(split_by) == 1:
			self.res = max(self.res, len(s))
			return

		curr = ''
		for char in (s + '#'):
			if char in split_by:
				if len(curr):
					dfs(curr)
				curr = ''
			else:
				curr += char
	dfs(s)
	return self.res

#time: o(n*n) 
#memory: o(n)
```


#review 
#hard 


