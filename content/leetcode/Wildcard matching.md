---
date: 2024-09-05
---
**Link:** https://leetcode.com/problems/wildcard-matching/
#### Solution:

**Topics**: [[DP]]

**Intuition**
This is a great, but quite tricky DP problem. Initially, I understood "sequence" to mean a subarray that is homogenous...for example `aaaa or bbb`, but the correct meaning is ANY sequence...which greatly simplifies the problem. 

The key to this problem is understanding that the exact sequence consumed by a star is unknown, and cannot be selected greedily...which means all possibilities must be considered. 

This problem can be interpreted in terms of subsequences...namely we are looking for the subsequence of characters consumed by stars that allow for a match.

The recursion is structured as follows:

1. If we encounter an english character in `p`, it MUST match with the current character in `s`
2. If we encounter a `?` in p, we MUST match it with the current character in `s` (any). 
3. If we encounter a `*` in p, we can use it or not use it, or continue using it. 
4. If we reach the end of `s` and the end of `p` (or if remaining chars in p are stars), we return true. 

**Implementation**
```python
def wildcard(s, p):
	@cache
	def dfs(i, j):
		if i == len(s):
			for k in range(j, len(p)):
				if p[k] != '*':
					return False
			return True
		if j == len(p):
			return False
		if p[j] != '*' and p[j] != '?' and p[j] != s[i]:
			return False

		if p[j] == '?' or p[j] == s[i]: #match
			if dfs(i+1, j+1):
				return True

		if p[j] == '*':
			if dfs(i, j+1): #dont take
				return True 
			if dfs(i+1, j): #take
				return True
				
	return dfs(0, 0)

#time: o(n*m)
#memory: o(n*m)
```

#review 


