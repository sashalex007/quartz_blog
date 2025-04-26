---
date: "2025-04-26"
---
**Link:** https://leetcode.com/problems/palindrome-partitioning/
#### Solution:

**Topics**: [[back tracking]]

**Intuition**
Nice problem, super easy though. Took me like 3 minutes. The code explains itself.

**Implementation**
```python
def palin_part(s):
	res = []
	part = []

	def is_palin(s):
		l = 0
		r = len(s) - 1
		while l < r:
			if s[l] != s[r]:
				return False
			l += 1
			r -= 1
		return True

	def dfs(i):
		if i == len(s):
			res.append(tuple(part))
			return

		curr = ''
		for j in range(i, len(s)):
			curr += s[j]
			if is_palin(curr):
				part.append(curr)
				dfs(j+1)
				part.pop()
		return

	dfs(0)
	return res

#time: o(n*2^n) because in the worst case there are 2^n nodes and checking if a string is a palindrome takes n time

#memory: o(n) stack space
```

#review 


