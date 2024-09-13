---
date: 2024-07-22
---
**Link:** https://leetcode.com/problems/longest-valid-parentheses/
#### Solution:

**Topics**: [[Valid parentheses]], [[stack]]

**Intuition**
This is an interesting twist on the [[Valid parentheses]] problem. I didn't know the nicest implementation for that problem when solving this one, so I ended up using a bit more memory than needed on my first try. Just o(n) more, so its no biggie but the proper solution is way cleaner...although maybe slightly harder to understand if one is not familiar with the cleanest implementation of [[Valid parentheses]]. 

The idea is to add only open parentheses to the stack, and pop off on closed. If there is nothing to pop of or if the stack is not empty at the end of the algorithm, the string is invalid. This is the idea for [[Valid parentheses]], but we can modify this algorithm to **keep looking** for a valid substring even if an invalid one has been found. 

We can do this by pushing **indices** to the stack rather than `(` or `)`. This was basically my idea in the first implementation, but I was storing a tuple `(char, i)`. Storing `char` on the stack, however, is spurious because in the 'correct' implementation of [[Valid parentheses]], only open parentheses get pushed to the stack anyway, so what exactly is on the stack is irrelevant...what matters is **if something is there**. In fact in the constant space solution of [[Valid parentheses]] the stack can be simulated with a count. 

So in our index stack, done the 'correct' way, the last element will always represent the index **before** the start of our valid substring. This is the case because a valid substring is perfectly balanced and thus has no elements on the stack! If we initialize our stack as `[-1]`, the current length of the valid substring can be computed with `i - stack[-1]`. 

If our substring reaches the invalid condition (if the stack is empty), we simply reinitialize (or append) the current index to the stack as the new potential start_index-1.

**Implementation**
```python
def longest_par(s):
	res = 0
	stack = [-1]
	for i, char in enumerate(s):
		if char == '(':
			stack.append(i)
		else:
			stack.pop()
			if not stack:
				stack.append(i)
			res = max(res, i - stack[-1])
	return res

#time: o(n)
#memory: o(n)
```

**Mnemonic**
See [[Longest valid parentheses]].

**Visual** 
See [[Longest valid parentheses]].

#review 