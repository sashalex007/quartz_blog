---
date: 2024-10-02
---
**Link:** https://leetcode.com/problems/basic-calculator/
#### Solution:

**Topics**: [[stack]]

**Intuition**
This problem is riddled with edge cases, but overall it is not that difficult. The basic idea is to use a stack to evaluate the expression. Essentially, whenever a `)` is seen, we can evaluate everything between the closed bracket and the next open bracket on the stack. 

There is one catch however. Addition is associative (agnostic to grouping) and commutative (agnostic to order), but subtraction is neither so we must evaluate the expression from left to right to get the correct result. 

The problem is, if we pop the expression off the stack, and append it to a list for evaluation, this list expression will be in reverse order...so the idea is to either use a queue for efficient front insertions or just reverse the expression before evaluating. 

There are a few more edge cases to consider:
1. `-` can be unary so when it is, append a `0` to the front. 
2. numbers can be greater than 9, so build multi-digit numbers accordingly.
3. handle empty spaces. 

**Implementation**
```python
def calculator(s):
	s = '(' + s + ')'
	ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b}
	
	def evaluate(exp):
		if exp[0] == '-':
			exp.appendleft('0')
			
		res = int(exp.popleft())
		op = None
		while exp:
			token = exp.popleft()
			if token in ops:
				op = token
			else:
				res = ops[op](res, int(token))
		return str(res)

	stack = []
	for char in s:
		if char == ' ':
			continue
			
		if char == ')':
			exp = deque()
			while stack and stack[-1] != '(':
				exp.appendleft(stack.pop())
			stack.pop()
			stack.append(evaluate(exp))
		elif char.isdigit() and stack and stack[-1].isdigit():
			stack[-1] += char
		else:
			stack.append(char)

	return int(stack[0])

#time: o(n)
#memory: o(n)
```

#review 
#hard 


