---
date: 2024-07-23
---
**Link:** https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/
#### Solution:

**Topics**: [[stack]]

**Intuition**
This is a nice little problem, not because of difficulty but more as an example for the clean implementation of various stack problems. 

The key intuition here is understanding what makes a string invalid. It's one of two conditions:
```
1. if there is nothing to pop off the stack: ))))
2. if the stack is not empty at the end of the algo ((((
```

Armed with these key insights, we can start to understand how to build a result. If condition 1, add to the result. Condition 2 is just the length of the stack at the end of the algorithm...add this to the result. 

The constant space solution is kind of cute so I'll implement it that way. I am essentially simulating a stack with a count. 

**Implementation**
```python
def min_len_par(s):
	res = 0
	count_stack = 0
	for char in s:
		if char == '(':
			count_stack += 1
		else:
			count_stack -= 1
			if count_stack == -1:
				res += 1
				count_stack += 1 #make sure to rebalance the stack
				
	return res + count_stack

#time: o(n)
#memory: o(1)
```

**Mnemonic**
We have a very demanding restaurant owner. The waiters must bring the customer **exactly** as much water as they can drink and **exactly** when they need it. If the cup is ever empty, or if water remains in the cup after the customer has paid their bill, the waiter is fired. 

**Visual** 
![[IMG_9A73C7A8D380-1.jpeg]]

#review 


