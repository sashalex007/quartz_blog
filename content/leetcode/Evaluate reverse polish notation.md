---
date: 2024-11-12
---
**Link:** https://leetcode.com/problems/evaluate-reverse-polish-notation/
#### Solution:

**Topics**: [[stack]]

**Intuition**
Fun little stack problem! Too easy though. Remember that `'-1'.isdigit()` returns false, and these numbers can be negative, so either check the counter case or use `try/except`. 

**Implementation**
```python
def eval_polish(tokens):
	ops = {
		'+': lambda b,a:a+b,   #reverse the paramaters so we can pop twice 
		'-': lambda b,a:a-b,
		'*': lambda b,a:a*b,
		'/': lambda b,a:int(a/b),
	}
	stack = []
	for t in tokens:
		if t in ops:
			stack.append(ops[t](stack.pop(), stack.pop()))
		else:
			stack.append(int(t))
	return stack[-1]

#time:
#memory:
```

#review 


