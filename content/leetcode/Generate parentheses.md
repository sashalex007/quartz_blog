---
date: 2024-08-19
---
**Link:** https://leetcode.com/problems/generate-parentheses/
#### Solution:

**Topics**: [[DFS]], [[back tracking]]

**Intuition**

The idea here is to build out all possible parentheses using two very simple rules. 
1. If we have not used up `n` open parentheses, add an open parentheses.
2. If there are more open parentheses than closed, add a closed parentheses. 

Each of these conditions is a branch in our tree. 

**Implementation**
```python
def gen_par(n):
	res = []
	def dfs(open, closed, par):
		if open == n and closed == n:
			res.append(par)
			return

		if open < n:
			dfs(open+1, closed, par + '(')
		if open > closed:
			dfs(open, closed+1, par + ')')
			
	dfs(1, 0, '(')
	return res

#time: o(2**2n) Think binary...each position has 2 options and there are 2n bits
#memory: o(n)
```

#review 


