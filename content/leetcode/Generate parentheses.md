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

**Review 1**
The implementation above is not really backtracking....although it could be. In the leetcode editorial they actually do implement backtracking but their way of doing it is super weird. There is actually no point in doing the "pop" part of the backtracking for this problem, but I'll add it for rigour. 

```python
def gen_par(n):
	state = [None]*(n*2)
	res = []
	def dfs(open, closed, i):
		if i == n*2:
			res.append(''.join(state))
			return
		if open < closed:
			state[i] = ')'
			dfs(open, closed-1, i+1)
			state[i] = None #this is spurious
		if open > 0:
			state[i] = '('
			dfs(open-1, closed, i+1)
			state[i] = None
	dfs(n, n, 0)
	return res
```

#review 


