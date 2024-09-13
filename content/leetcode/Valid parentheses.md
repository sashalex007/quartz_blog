---
date: 2024-08-23
---
**Link:** https://leetcode.com/problems/valid-parentheses/
#### Solution:

**Topics**: [[stack]]

**Intuition**
Not a particularly difficult stack problem. Simply add open parentheses to the stack and pop them off with closed parentheses. If we reach a closed parentheses (whichever one) and there is nothing to pop off, the parentheses is invalid...or if the stack is not empty at the end of the algorithm. 

Hash map can simplify the implementation here a bit. The key here is to clearly separate the problem into open and closed parentheses, and deal with each case accordingly. 

**Implementation**
```python
def valid_par(s):
	pairs =  {')':'(', ']':'[', '}':'{'}
	stack = []
	for char in s:
		if char in pairs:
			if len(stack) == 0 or (stack and stack[-1] != pairs[char]):
				return False
			stack.pop()
		else:
			stack.append(char)
	return len(stack) == 0
			
#time: o(n)
#memory: o(n)
```


#review 


