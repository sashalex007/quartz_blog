---
date: 2024-09-16
---
**Link:** https://leetcode.com/problems/implement-queue-using-stacks/
#### Solution:

**Topics**: [[amortized]]

**Intuition**
This is a pretty interesting problem. Took me a minute to grasp this one because I was not familiar with the concept of amortized complexity. 

We know that pushing to the front of a list is `o(n)` so obviously we want to avoid this. The key insight is to use two lists! Append elements to `stack1`. Pop elements from `stack2`. If stack 2 is empty, pop all elements off `stack1` and append them to `stack2`. This will result in the bottom of `stack1` being the top of `stack2`! If `stack2` is not empty, pop of it. 

This is analogous to **pouring out** the contents of `stack2` into `stack2` while preserving the relative order of the contents. 

**Implementation**
```python
class MyQueue:
	def __init__(self):
		self.stack1 = []
		self.stack2 = []
	def push(self, x):
		self.stack1.append(x)
	def pop(self):
		if not self.stack2:
			while self.stack1:
				self.stack2.append(self.stack1.pop())
		return self.stack2.pop()
	def peek(self):
		if not self.stack2:
			return self.stack1[0]
		else:
			return self.stack2[-1]
	def empty(self):
		return not self.stack1 and not self.stack2
	
#time: o(1) amortized
#memory: o(1) 
```

**Mnemonic**
Imagine you have a green cup and a red cup. You fill up the green cup, and drink only from the red cup. If the red cup is empty, fill it up by pour out all the water from the greed cup. 


#review 


